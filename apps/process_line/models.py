import datetime

from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.timezone import now
from simple_history.models import HistoricalRecords

from apps.business_partners.models import Client
from apps.products.models import PackingProduct
from apps.raw_material.models import Lot


class TypesCut(models.Model):
    name = models.CharField(max_length=100, verbose_name='Nombre')
    code = models.CharField(verbose_name='Codigo referencial', max_length=3, unique=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Tipos de Corte'
        verbose_name = 'Tipo de Corte'


class ProcessLineConditioning(models.Model):
    process_date = models.DateField(verbose_name='Fecha de Proceso', default=now)
    lot = models.ForeignKey(Lot, on_delete=models.PROTECT, related_name='conditioning',
                            verbose_name='Lote Materia Prima')
    chlorine = models.IntegerField(verbose_name='Cloro en red', default=0)
    disinfection = models.IntegerField(verbose_name='Linea de desinfección', default=0)
    brix = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='°Brix', blank=True, null=True, default=0)
    ph = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='pH', blank=True, null=True, default=0)
    width = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Espesor(mm)', default=0)
    aspect = models.CharField(
        choices=(('1', '1'), ('2', '2'), ('3', '3')), max_length=1,
        verbose_name='Aspecto', default='1')
    oven = models.CharField(
        choices=(('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6'), ('7', '7')), max_length=1,
        verbose_name='Horno')
    h1 = models.IntegerField(verbose_name='1ra Hora', default=0)
    h2 = models.IntegerField(verbose_name='2da Hora', default=0)
    h3 = models.IntegerField(verbose_name='3ra Hora', default=0)
    h4 = models.IntegerField(verbose_name='4ta Hora', default=0)
    h5 = models.IntegerField(verbose_name='5ta Hora', default=0)
    h6 = models.IntegerField(verbose_name='6ta Hora', default=0)
    h7 = models.IntegerField(verbose_name='7ma Hora', default=0)
    h8 = models.IntegerField(verbose_name='8va Hora', default=0)
    h9 = models.IntegerField(verbose_name='9na Hora', default=0)
    h10 = models.IntegerField(verbose_name='10ma Hora', default=0)
    h11 = models.IntegerField(verbose_name='11va Hora', default=0)
    h12 = models.IntegerField(verbose_name='12va Hora', default=0)
    h13 = models.IntegerField(verbose_name='13va Hora', default=0)
    h14 = models.IntegerField(verbose_name='14va Hora', default=0)
    h15 = models.IntegerField(verbose_name='15va Hora', default=0)
    h16 = models.IntegerField(verbose_name='16va Hora', default=0)
    h17 = models.IntegerField(verbose_name='17va Hora', default=0)
    h18 = models.IntegerField(verbose_name='18va Hora', default=0)
    h19 = models.IntegerField(verbose_name='19va Hora', default=0)
    h20 = models.IntegerField(verbose_name='20va Hora', default=0)
    h21 = models.IntegerField(verbose_name='21va Hora', default=0)
    h22 = models.IntegerField(verbose_name='22va Hora', default=0)
    h23 = models.IntegerField(verbose_name='23va Hora', default=0)
    h24 = models.IntegerField(verbose_name='24va Hora', default=0)
    history = HistoricalRecords()

    class Meta:
        unique_together = ('process_date', 'lot',)
        verbose_name = 'Proceso de Acondicionado'
        verbose_name_plural = 'Proceso de Acondicionado'
        ordering = ['-process_date']

    def __str__(self):
        return str(self.process_date) + ' - ' + str(self.lot)

    def get_year(self):
        try:
            return self.process_date.strftime('%Y')
        except:
            return 0

    def get_month(self):
        try:
            return self.process_date.strftime('%B')
        except:
            return 0

    def get_week(self):
        try:
            return self.process_date.isocalendar()[1]
        except:
            return 0

    def get_lot_mp(self):
        return self.lot.lot


class ProcessLineTerminated(models.Model):
    packing_date = models.DateField(verbose_name='Fecha de Envasado', default=now)
    type_cut = models.ForeignKey(TypesCut, on_delete=models.PROTECT, related_name='type_cut')
    lot = models.CharField(max_length=100, verbose_name='Lote Producto Terminado', blank=True, null=True)
    process = models.ForeignKey(ProcessLineConditioning, on_delete=models.PROTECT, related_name='process_line',
                                verbose_name='Proceso de Acondicionado')
    brix_pt = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='°Brix', blank=True, null=True,
                                  default=0)
    ph_pt = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='pH', blank=True, null=True, default=0)
    humidity = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Humedad', blank=True, null=True,
                                   default=0)
    aroma = models.IntegerField(verbose_name='Aroma', blank=True, null=True, default=0)
    color = models.IntegerField(verbose_name='Color', blank=True, null=True, default=0)
    flavor = models.IntegerField(verbose_name='Sabor', blank=True, null=True, default=0)
    texture = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Textura', blank=True, null=True,
                                  default=0)
    defects = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Defectos', blank=True, null=True,
                                  default=0)
    width_pt = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Espesor(mm)',
                                   blank=True, null=True, default=0)
    quantity = models.IntegerField(verbose_name='Cantidad producida', blank=True, null=True, default=0)
    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Proceso de Envasado'
        verbose_name_plural = 'Proceso de Envasado'
        ordering = ['-packing_date']
        unique_together = ('packing_date', 'lot',)

    def get_lot_mp(self):
        return self.process.lot.lot

    def get_lot_pt(self):
        try:
            return self.lot
        except:
            return 0

    def __str__(self):
        return str(self.packing_date) + ' - ' + str(self.lot)

    def get_year(self):
        try:
            return self.packing_date.strftime('%Y')
        except:
            return 0

    def get_month(self):
        try:
            return self.packing_date.strftime('%B')
        except:
            return 0

    def get_week(self):
        try:
            return self.packing_date.isocalendar()[1]
        except:
            return 0


class ProcessLineReleased(models.Model):
    release_date = models.DateField(verbose_name='Fecha de Liberación', default=now)
    process = models.ForeignKey(ProcessLineTerminated, on_delete=models.PROTECT, related_name='process_line_released',
                                verbose_name='Proceso Terminado')
    quantity = models.IntegerField(verbose_name='Cantidad liberada', blank=True, null=True, default=0)
    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name='client_released', verbose_name='Cliente')
    expiration_date = models.DateField(verbose_name='Fecha de Vencimiento', blank=True, null=True)
    lot_bags = models.ForeignKey(PackingProduct, on_delete=models.PROTECT, related_name='lot_bags_released',
                                 verbose_name='Lote de Bolsas', blank=True, null=True)
    lot_boxes = models.ForeignKey(PackingProduct, on_delete=models.PROTECT, related_name='lot_boxes_released',
                                  verbose_name='Lote de Cajas', blank=True, null=True)
    observations = models.CharField(
        choices=(('1', 'Producto apto'), ('2', 'Producto en transición'), ('3', 'Producto no conforme'),),
        max_length=100, verbose_name='Observaciones', default='1', blank=True, null=True)
    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Proceso de  Liberación'
        verbose_name_plural = 'Proceso de Liberación'
        ordering = ['-release_date']

    def __str__(self):
        try:
            return self.get_summary()
        except:
            return "0"

    def get_description(self):
        return self.process.type_cut.name

    def get_summary(self):
        return str(self.release_date) + ' - ' + str(self.process.lot) + ' - ' + str(self.client) + ' - ' + str(
            self.quantity) + " und"

    def get_lot_mp(self):
        return self.process.process.lot.lot

    def get_lot_pt(self):
        return self.process.get_lot_pt()

    def get_year(self):
        try:
            return self.release_date.strftime('%Y')
        except:
            return "0"

    def get_month(self):
        try:
            return self.release_date.strftime('%B')
        except:
            return "0"

    def get_week(self):
        try:
            return self.release_date.isocalendar()[1]
        except:
            return 0


@receiver(pre_save, sender=ProcessLineTerminated)
def my_callback(sender, instance, *args, **kwargs):
    year = str(datetime.datetime.now().year)[2:]
    type_cut = str(instance.type_cut.code)
    serie = instance.get_lot_mp()[-3:]
    instance.lot = year + type_cut + "-" + serie
