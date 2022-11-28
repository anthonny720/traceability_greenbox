import uuid
from datetime import date

from django.db import models
from django.db.models.signals import post_delete, pre_save, post_save
from django.dispatch import receiver
from simple_history.models import HistoricalRecords

from apps.business_partners.models import Client
from apps.process_line.models import ProcessLineReleased


class LotPT(models.Model):
    lot = models.CharField(max_length=50)
    quantity = models.PositiveSmallIntegerField(default=0)
    stock = models.PositiveSmallIntegerField(default=0)
    expirationDate = models.DateField(verbose_name='Fecha de Vencimiento', blank=True, null=True)
    description = models.CharField(max_length=50, blank=True, null=True)
    container = models.CharField(max_length=50, default='', blank=True, null=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.lot

    class Meta:
        verbose_name = 'Lote'
        verbose_name_plural = 'Lote'
        ordering = ['-id']
        unique_together = ('lot', 'container',)


# Create your models here.

class Reception(models.Model):
    client = models.ManyToManyField(Client, related_name='receptions', verbose_name='Cliente')
    method = models.CharField(choices=(('PEPS', 'PEPS'), ('UEPS', 'UEPS'),), max_length=4, default='PEPS',
                              verbose_name='Método')
    type = models.CharField(choices=(('FCL', 'FCL'), ('LCL', 'LCL'),), max_length=3, default='FCL', verbose_name='Tipo')
    date = models.DateField(verbose_name='Fecha')
    number = models.PositiveSmallIntegerField(verbose_name='Número')
    denomination = models.CharField(max_length=50, verbose_name='Denominación', default=' ', blank=True)
    slug = models.SlugField(max_length=255, default=uuid.uuid4, blank=True, null=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.full_name()

    def full_clients(self):
        client = ", ".join(str(c.name) for c in self.client.all())
        return client

    def full_name(self):
        return self.type + " " + str(self.number) + " " + self.full_clients() + " " + self.denomination

    class Meta:
        verbose_name = 'Programa de recepción'
        verbose_name_plural = 'Programas de recepción'
        ordering = ['-date']


@receiver(post_save, sender=Reception)
def set_packing(sender, instance, **kwargs):
    try:
        PackingList.objects.create(reception=instance, slug=instance.slug)
    except:
        pass


class IReception(models.Model):
    program = models.ForeignKey(Reception, on_delete=models.PROTECT, related_name='reception_details',
                                verbose_name='Programa')
    date = models.DateField(verbose_name='Fecha de recepción')
    lot = models.ForeignKey(ProcessLineReleased, on_delete=models.PROTECT, related_name='receptions')
    history = HistoricalRecords()

    def __str__(self):
        return str(self.date) + " " + self.lot.get_lot_pt()

    def save(self, *args, **kwargs):
        pt, created = LotPT.objects.get_or_create(lot=self.lot.get_lot_pt(), container=self.program.slug)
        pt.quantity += self.lot.quantity
        pt.stock += self.lot.quantity
        pt.expirationDate = self.lot.expiration_date
        pt.description = self.lot.get_description()
        pt.save()
        super(IReception, self).save()

    class Meta:
        verbose_name = 'Datos de recepción'
        verbose_name_plural = 'Datos de recepción'
        ordering = ['-date']


@receiver(post_delete, sender=IReception)
def lot_quantity_hook(sender, instance, using, **kwargs):
    try:
        pt = LotPT.objects.get(lot=instance.lot.get_lot_pt(), container=instance.program.slug)
        pt.quantity -= instance.lot.quantity
        pt.stock -= instance.lot.quantity
        pt.save()
    except LotPT.DoesNotExist:
        pass


def custom_doc_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return '/'.join(['COMEX', str(date.today().year), instance.full_name(), filename])


class PackingList(models.Model):
    reception = models.OneToOneField(Reception, on_delete=models.PROTECT, related_name='packing_list',verbose_name='Recepción')
    status = models.BooleanField(default=False, verbose_name='Estado')
    date = models.DateField(verbose_name='Programa de despacho', blank=True, null=True)
    destine = models.CharField(max_length=50, verbose_name='Destino', blank=True, null=True)
    guide = models.CharField(max_length=10, verbose_name='Guía de remisión', blank=True, null=True)
    order = models.CharField(max_length=12, verbose_name='Orden de Pedido', blank=True, null=True)
    docs = models.FileField(upload_to=custom_doc_file_path, verbose_name='Documentación', blank=True, null=True)
    slug = models.SlugField(max_length=255, default=uuid.uuid4, blank=True, null=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.reception.full_name()

    def full_name(self):
        return self.reception.full_name()

    def get_docs(self):
        try:
            return self.docs.url
        except ValueError:
            return ''

    def get_total_box(self):
        try:
            total = 0
            for b in self.packing_list_information.all():
                total += b.boxes
            return total
        except Exception as e:
            return 0

    def get_total_bags(self):
        try:
            total = 0
            for b in self.packing_list_information.all():
                total += b.total_bags()
            return total
        except:
            return 0

    def get_total_weight(self):
        try:
            total = 0
            for b in self.packing_list_information.all():
                total += b.total_weight()
            return total
        except:
            return 0

    class Meta:
        verbose_name = 'Packing List'
        verbose_name_plural = 'Packing List'
        ordering = ['-id']


@receiver(pre_save, sender=PackingList)
def pre_save_image(sender, instance, *args, **kwargs):
    try:
        old_img = instance.__class__.objects.get(id=instance.id).docs.path
        try:
            new_img = instance.docs.path
        except:
            new_img = None
        if new_img != old_img:
            import os
            if os.path.exists(old_img):
                os.remove(old_img)
    except:
        pass


@receiver(post_delete, sender=PackingList)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.doc.delete(save=False)
    except:
        pass


class IPackingList(models.Model):
    packing_list = models.ForeignKey(PackingList, on_delete=models.PROTECT, related_name='packing_list_information',
                                     verbose_name='Packing List')
    number = models.PositiveSmallIntegerField(verbose_name='Número', default=0)
    lot = models.ForeignKey(LotPT, on_delete=models.PROTECT, related_name='packing_list_information',
                            verbose_name='Lote')
    boxes = models.PositiveSmallIntegerField(verbose_name='Cantidad', default=0)
    bags = models.PositiveSmallIntegerField(verbose_name='Bolsas', default=0)
    weight = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Peso', default=0)
    history = HistoricalRecords()

    def __str__(self):
        return self.packing_list.reception.full_name()

    class Meta:
        verbose_name = 'Información de Packing List'
        verbose_name_plural = 'Información de Packing List'
        ordering = ['number']

    def total_bags(self):
        try:
            return self.boxes * self.bags
        except:
            return 0

    def total_weight(self):
        try:
            return self.total_bags() * self.weight
        except:
            return 0
