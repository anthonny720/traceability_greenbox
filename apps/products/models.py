import datetime
import uuid

from django.db import models
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from simple_history.models import HistoricalRecords

from apps.business_partners.models import ProviderPacking


def custom_doc_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return '/'.join(['ENVASES_EMBALAJES', filename])


def custom_doc_file(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return '/'.join(['FRUTAS', instance.name, filename])


# Create your models here.
class Fruits(models.Model):
    name = models.CharField(max_length=100)
    thumbnail = models.ImageField(upload_to=custom_doc_file, blank=True, null=True)

    history = HistoricalRecords()

    def __str__(self):
        return self.name

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        else:
            return None

    def get_stock(self):
        t = 0
        try:
            for c in self.fruit_entry.all():
                t += c.get_stock()
            self.stock = t
            self.save()
            return t
        except:
            return 0

    def get_motions(self):
        current_date = datetime.datetime.now().date()
        i = 0
        o = 0
        try:
            for c in self.fruit_entry.filter(downloadDate=current_date):
                i += c.get_total_net_weight()
            self.input = i
            for c in self.fruit_entry.all():
                for d in c.data.filter(dateIndicted=current_date):
                    o += d.get_net_final_weight()
            self.output = o
            self.save()
            return {'input': i, 'output': o}
        except:
            return 0

    class Meta:
        verbose_name = 'Frutas'
        verbose_name_plural = 'Frutas'


class PackingProduct(models.Model):
    entry_date = models.DateField(verbose_name='Fecha de ingreso', blank=False, null=False)
    production_date = models.DateField(verbose_name='Fecha de producción', blank=False, null=False)
    expiration_date = models.DateField(verbose_name='Fecha de vencimiento', blank=False, null=False)
    provider = models.ForeignKey(ProviderPacking, on_delete=models.PROTECT, blank=False, null=False,
                                 verbose_name='Proveedor')
    docs = models.FileField(upload_to=custom_doc_file_path, blank=True, null=True, verbose_name='Documentos')
    type = models.CharField(max_length=100, verbose_name='Tipo', blank=False, null=False,
                            choices=[('Bolsas', 'Bolsas'), ('Cajas', 'Cajas')], default='Bolsas')
    lot = models.CharField(max_length=50, verbose_name='Lote', blank=False, null=False)
    history = HistoricalRecords()

    def __str__(self):
        return self.lot

    class Meta:
        verbose_name = 'Envase/Embalaje'
        verbose_name_plural = 'Envases/Embalajes'
        ordering = ['-entry_date']


@receiver(pre_save, sender=PackingProduct)
def pre_save_image(sender, instance, *args, **kwargs):
    """ instance old image file will delete from os """
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


@receiver(post_delete, sender=PackingProduct)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.docs.delete(save=False)
    except:
        pass


class Boxes(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    weight = models.DecimalField(max_digits=3, decimal_places=2, verbose_name="Peso")
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Jaba'
        verbose_name_plural = 'Jabas'


class Pallets(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    weight = models.DecimalField(max_digits=4, decimal_places=2, verbose_name="Peso")
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Pallet'
        verbose_name_plural = 'Pallets'
