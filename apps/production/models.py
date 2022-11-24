from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from simple_history.models import HistoricalRecords

from apps.products.models import Pallets
from apps.raw_material.models import Lot


class ProcessPineapple(models.Model):
    """Model definition for ProcessPineapple."""
    date = models.DateField(blank=False, null=False, verbose_name='Fecha de Proceso')
    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)
    lot = models.ForeignKey(Lot, on_delete=models.PROTECT, verbose_name='Lote', related_name='process_pineapple')
    juice = models.DecimalField(blank=True, null=True, max_digits=4, decimal_places=1, verbose_name='Jugo', default=0)
    discard = models.DecimalField(blank=True, null=True, max_digits=4, decimal_places=1, verbose_name='Descarte',
                                  default=0)
    start_washed = models.TimeField(blank=True, null=True, verbose_name='Inicio de lavado')
    start_bare = models.TimeField(blank=True, null=True, verbose_name='Inicio de pelado')
    start_chopped = models.TimeField(blank=True, null=True, verbose_name='Inicio de picado')
    start_loaded = models.TimeField(blank=True, null=True, verbose_name='Inicio de cargado')
    start_cleaning = models.TimeField(blank=True, null=True, verbose_name='Inicio de limpieza')
    finish_washed = models.TimeField(blank=True, null=True, verbose_name='Fin de lavado')
    finish_bare = models.TimeField(blank=True, null=True, verbose_name='Fin de pelado')
    finish_chopped = models.TimeField(blank=True, null=True, verbose_name='Fin de picado')
    finish_loaded = models.TimeField(blank=True, null=True, verbose_name='Fin de cargado')
    finish_cleaning = models.TimeField(blank=True, null=True, verbose_name='Fin de limpieza ')
    people = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Personas', default=0)
    kg_unpeeled = models.DecimalField(blank=True, null=True, max_digits=4, decimal_places=1,
                                      verbose_name='Kg sin pelar', default=0)
    cars = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Cantidad de Coches', default=1)
    status = models.BooleanField(default=False, verbose_name="Cerrado/Abierto")
    history = HistoricalRecords()

    class Meta:
        """Meta definition for ProcessPineapple."""
        verbose_name = 'Proceso de Piña'
        verbose_name_plural = 'Procesos de Piña'
        ordering = ('-date',)

    def __str__(self):
        """Unicode representation of ProcessPineapple."""
        return self.lot.lot

    def get_summary(self):
        data = {'Lote': self.__str__(), 'Peso': self.get_kg_mp(), 'Sin pelar': self.kg_unpeeled,
                'Corona': self.get_total_crown()['kg'],
                '% Corona': self.get_total_crown()['percentage'],
                'Cáscara': self.get_total_peel()['kg'], '% Cáscara': self.get_total_peel()['percentage'],
                'Jugo': self.get_total_juice()['kg'], '% Jugo': self.get_total_juice()['percentage'],
                'Descarte': self.get_total_discard()['kg'], '% Descarte': self.get_total_discard()['percentage'],
                'Habilitado': self.get_total_enabled()['kg'], '% Habilitado': self.get_total_enabled()['percentage'],
                'Coches': self.cars, 'Personas': self.people}
        hours = {'Lavado': str(self.start_washed) + " - " + str(self.finish_washed),
                 'Pelado': str(self.start_bare) + " - " + str(self.finish_bare),
                 'Picado': str(self.start_chopped) + " - " + str(self.start_washed),
                 'Cargado': str(self.start_loaded) + " - " + str(self.finish_loaded),
                 'Limpieza': str(self.start_cleaning) + " - " + str(self.finish_cleaning)
                 }
        return {'data': data, 'hours': hours}

    def get_kg_mp(self):
        try:
            q = self.lot.data.all().filter(dateIndicted=self.date)
            total = 0
            for i in q:
                total += i.get_net_final_weight()
            return total
        except:
            return 0

    def get_total_crown(self):
        try:
            total = 0
            for d in self.crown.all():
                total += d.get_net_weight()
            percentage = total / self.get_kg_mp() * 100
            return {'kg': total, 'percentage': percentage}
        except:
            return {'kg': 0, 'percentage': 0}

    def get_total_peel(self):
        try:
            total = 0
            for d in self.peel.all():
                total += d.get_net_weight()
            percentage = total / self.get_kg_mp() * 100
            return {'kg': total, 'percentage': percentage}
        except:
            return {'kg': 0, 'percentage': 0}

    def get_total_juice(self):
        try:
            percentage = float(self.juice) / float(self.get_kg_mp()) * 100
            return {'kg': self.juice, 'percentage': percentage}
        except:
            return {'kg': 0, 'percentage': 0}

    def get_total_discard(self):
        try:
            percentage = float(self.discard) / float(self.get_kg_mp()) * 100
            return {'kg': self.discard, 'percentage': percentage}
        except:
            return {'kg': 0, 'percentage': 0}

    def get_total_enabled(self):
        try:
            total = float(self.get_kg_mp()) - float(self.get_total_crown()['kg']) - float(
                self.get_total_peel()['kg']) - float(self.get_total_juice()['kg']) - float(
                self.get_total_discard()['kg'])
            percentage = float(total) / float(self.get_kg_mp()) * 100
            return {'kg': total, 'percentage': percentage}
        except:
            return {'kg': 0, 'percentage': 0}


@receiver(pre_save, sender=ProcessPineapple)
def my_callback(sender, instance, *args, **kwargs):
    try:
        instance.slug = instance.lot.lot + '-' + str(instance.date)
    except:
        pass


class Crown(models.Model):
    process = models.ForeignKey(ProcessPineapple, on_delete=models.PROTECT, blank=False, null=False,
                                related_name='crown',
                                verbose_name='Proceso')
    weight = models.FloatField(blank=False, null=False, verbose_name='Peso')
    pallet = models.ForeignKey(Pallets, on_delete=models.PROTECT, blank=False, null=False, verbose_name='Pallet')
    history = HistoricalRecords()

    def __str__(self):
        return str(self.weight)

    class Meta:
        verbose_name = 'Registro de Piña - Corona'
        verbose_name_plural = 'Registro de Piña - Corona'
        ordering = ('id',)

    def get_net_weight(self):
        try:
            return float(self.weight) - float(self.pallet.weight)
        except:
            return 0

    def get_pallet_name(self):
        return self.pallet.name


class Peel(models.Model):
    process = models.ForeignKey(ProcessPineapple, on_delete=models.PROTECT, blank=False, null=False,
                                related_name='peel',
                                verbose_name='Proceso', )
    weight = models.DecimalField(blank=False, null=False, verbose_name='Peso', max_digits=4, decimal_places=1)
    pallet = models.ForeignKey(Pallets, on_delete=models.PROTECT, blank=False, null=False, verbose_name='Pallet')
    quantity = models.PositiveSmallIntegerField(verbose_name='Cantidad', default=0)
    history = HistoricalRecords()

    def __str__(self):
        return str(self.weight)

    class Meta:
        verbose_name = 'Registro de Piña - Cáscara'
        verbose_name_plural = 'Registro de Piña - Cáscara'
        ordering = ('id',)

    def get_weight_boxes(self):
        try:
            return self.quantity * 2.0
        except:
            return 0

    def get_tare(self):
        try:
            return float(self.get_weight_boxes()) + float(self.pallet.weight)
        except:
            return 0

    def get_net_weight(self):
        try:
            return float(self.weight) - float(self.pallet.weight) - float(self.get_weight_boxes())
        except:
            return 0

    def get_pallet_name(self):
        return self.pallet.name

