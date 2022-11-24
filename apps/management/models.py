from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from simple_history.models import HistoricalRecords

from apps.business_partners.models import ProviderMP
from apps.products.models import Fruits
from apps.raw_material.models import Lot


# Create your models here.

class Location(models.Model):
    name=models.CharField(max_length=50,verbose_name='Nombre',unique=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name='Ubicación'
        verbose_name_plural='Ubicaciones'
        ordering=['name']
class Payments(models.Model):
    date = models.DateField(blank=True, null=True, auto_now_add=True, verbose_name='Fecha')
    name = models.CharField(max_length=100, blank=True, null=True, verbose_name='Nombre')
    business_name = models.CharField(max_length=100, blank=True, null=True, verbose_name='Razón social')
    report = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name='entry_report', verbose_name='Reporte')
    weight = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name='Peso neto')
    receipt = models.CharField(max_length=12, blank=True, null=True, verbose_name='Recibo')
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name='Monto total')
    status = models.BooleanField(default=False, verbose_name='Estado')
    cancelled = models.DateField(blank=True, null=True, verbose_name='Fecha de pago')
    history = HistoricalRecords()

    def __str__(self):
        return self.report.lot

    class Meta:
        ordering = ['-receipt']
        verbose_name = 'Pagos y Recibos'
        verbose_name_plural = 'Pagos y Recibos'


class Kardex(models.Model):
    date = models.DateField(verbose_name='Fecha')
    input = models.DecimalField(decimal_places=2, max_digits=8, default=0, blank=True, null=True,
                                verbose_name='Entrada')
    output = models.DecimalField(decimal_places=2, max_digits=8, default=0, blank=True, null=True,
                                 verbose_name='Salida')
    stock = models.DecimalField(decimal_places=2, max_digits=8, default=0, blank=True, null=True, verbose_name='Stock')
    category = models.ForeignKey(Fruits, on_delete=models.PROTECT, verbose_name='Fruta', related_name='kardex_category')
    history = HistoricalRecords()

    def __str__(self):
        return self.date.strftime('%d/%m/%Y')

    def get_category_name(self):
        return self.category.name

    class Meta:
        verbose_name_plural = "Kardex"
        verbose_name = "Kardex"
        ordering = ['-date']
        unique_together = ('date', 'category')


class Motion(models.Model):
    date = models.DateField(auto_now_add=True, verbose_name="Fecha")
    to = models.ForeignKey(ProviderMP, on_delete=models.PROTECT, related_name='to', verbose_name="Origen")
    fr = models.ForeignKey(ProviderMP, on_delete=models.PROTECT, related_name='fr', verbose_name="Destino")
    quantity = models.PositiveIntegerField(default=0, verbose_name="Cantidad")
    history = HistoricalRecords()


    def __str__(self):
        try:
            return self.date.strftime('%d/%m/%Y')
        except Exception as e:
            return str(e)

    class Meta:
        verbose_name = 'Movimiento de Jaba'
        verbose_name_plural = 'Movimientos de Jaba'
        ordering = ['-date']


# SIGNALS
@receiver(pre_save, sender=Payments)
def my_callback(sender, instance, *args, **kwargs):
    try:
        instance.date = instance.report.downloadDate
    except:
        pass
