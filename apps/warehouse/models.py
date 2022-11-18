from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver

from apps.business_partners.models import Client
from apps.process_line.models import ProcessLineReleased


class LotPT(models.Model):
    lot = models.CharField(max_length=50)
    quantity = models.PositiveSmallIntegerField(default=0)
    stock = models.PositiveSmallIntegerField(default=0)
    expirationDate = models.DateField(verbose_name='Fecha de Vencimiento')
    description = models.CharField(max_length=50, blank=True, null=True)
    container = models.CharField(max_length=50, default=' ', blank=True, null=True)

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


class IReception(models.Model):
    program = models.ForeignKey(Reception, on_delete=models.CASCADE, related_name='reception_details',
                                verbose_name='Programa')
    date = models.DateField(verbose_name='Fecha de recepción')
    lot = models.ForeignKey(ProcessLineReleased, on_delete=models.CASCADE, related_name='receptions')
    packing = models.BooleanField(verbose_name='Conformidad - Envasado', default=False)
    quality = models.BooleanField(verbose_name='Conformidad - Calidad', default=False)
    logistic = models.BooleanField(verbose_name='Conformidad - Logística', default=False)

    def __str__(self):
        return str(self.date) + " " + self.lot.get_lot_pt()

    def save(self, *args, **kwargs):
        pt, created = LotPT.objects.get_or_create(lot=self.lot.get_lot_pt(), container=self.program.full_name())
        pt.quantity = self.lot.quantity
        pt.stock = self.lot.quantity
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
        pt = LotPT.objects.get(lot=instance.lot.get_lot_pt(), container=instance.program.full_name())
        pt.quantity -= instance.lot.quantity
        pt.stock -= instance.lot.quantity
        pt.save()
    except LotPT.DoesNotExist:
        pass


class PackingList(models.Model):
    reception = models.OneToOneField(Reception, on_delete=models.CASCADE, related_name='packing_list',
                                     verbose_name='Recepción')
    status = models.BooleanField(default=False, verbose_name='Estado')
    order = models.CharField(max_length=6, verbose_name='Orden', default=' ', blank=True)
    quantity = models.PositiveSmallIntegerField(verbose_name='Bolsas', default=0)
    weight_bags = models.DecimalField(max_digits=6, decimal_places=3, verbose_name='Peso', default=0)

    def __str__(self):
        return self.reception.full_name()

    def full_name(self):
        return self.reception.full_name()

    def get_total_box(self):
        try:
            total = 0
            for b in self.packing_list_information.all():
                total += b.quantity
            return total
        except:
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


class IPackingList(models.Model):
    packing_list = models.ForeignKey(PackingList, on_delete=models.CASCADE, related_name='packing_list_information',
                                     verbose_name='Packing List')
    number = models.PositiveSmallIntegerField(verbose_name='Número', default=0)
    lot = models.ForeignKey(LotPT, on_delete=models.CASCADE, related_name='packing_list_information',
                            verbose_name='Lote')
    boxes = models.PositiveSmallIntegerField(verbose_name='Cantidad', default=0)

    def __str__(self):
        return self.packing_list.reception.full_name()

    class Meta:
        verbose_name = 'Información de Packing List'
        verbose_name_plural = 'Información de Packing List'
        ordering = ['-id']

    def total_bags(self):
        try:
            return self.boxes * self.packing_list.quantity
        except:
            return 0

    def total_weight(self):
        try:
            return self.total_bags() * self.packing_list.weight_bags
        except:
            return 0
