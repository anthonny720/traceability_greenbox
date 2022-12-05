from django.db import models
from simple_history.models import HistoricalRecords

from apps.raw_material.models import Lot


# Prueba de corte para Piña
class CutTest(models.Model):
    lot = models.ForeignKey(Lot, on_delete=models.PROTECT, verbose_name='Lote', related_name='cut_test')
    caliber = models.CharField(choices=[('6', '6'), ('8', '8'), ('10', '10'), ('12', '12'), ('14', '14')], default='6',
                               max_length=2, verbose_name='Calibre')
    cut_fresh_1_8 = models.IntegerField(verbose_name='Peso en fresco (corte 1/8)',
                                        blank=True, null=True, default=0)
    cut_1_8 = models.IntegerField(verbose_name='Peso corte <> 1/8', blank=True,
                                  null=True, default=0)
    eyes = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Ojitos', blank=True, null=True, default=0)
    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Prueba de Corte para Piña'
        verbose_name_plural = 'Prueba de Corte para Piña'
        ordering = ['-id']

    def __str__(self):
        return self.lot.lot

    def get_total_weight(self):
        try:
            return self.cut_fresh_1_8 + self.cut_1_8
        except:
            return 0

    def get_percentage_cut_fresh_1_8(self):
        try:
            return (self.cut_fresh_1_8 / self.get_total_weight()) * 100
        except:
            return 0

    def get_percentage_cut_1_8(self):
        try:
            return (self.cut_1_8 / self.get_total_weight()) * 100
        except:
            return 0

    def get_year(self):
        try:
            return self.lot.get_year()
        except:
            return "0"

    def get_month(self):
        try:
            return self.lot.get_month()
        except:
            return "0"

    def get_week(self):
        try:
            return self.lot.get_week()
        except:
            return 0


# Análisis de calidad para Piña
class AnalysisPineapple(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="analysis_pineapple",
                               verbose_name="Lote MP")

    maturation_0_plant = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                             verbose_name=u"Maduración 0 Planta %")
    maturation_1_plant = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                             verbose_name=u"Maduración 1 Planta %")
    maturation_2_plant = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                             verbose_name=u"Maduración 2 Planta %")
    maturation_3_plant = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                             verbose_name=u"Maduración 3 Planta %")
    maturation_4_plant = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                             verbose_name=u"Maduración 4 Planta %")
    maturation_5_plant = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                             verbose_name=u"Maduración 5 Planta %")
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Análisis de Piña"
        verbose_name_plural = "Análisis de Piña"
        ordering = ['-id']

    def __str__(self):
        return self.lot.lot

    def get_lot(self):
        return self.lot.lot

    def get_maturation_total(self):
        try:
            return self.maturation_0_plant + self.maturation_1_plant + self.maturation_2_plant + self.maturation_3_plant + self.maturation_4_plant + self.maturation_5_plant
        except:
            return 0


class AnalysisAguaymanto(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="analysis_aguaymanto",
                               verbose_name="Lote MP")

    maturation_1 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                       verbose_name=u"Maduración 1 %")
    maturation_2 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                       verbose_name=u"Maduración 2 %")
    maturation_3 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                       verbose_name=u"Maduración 3 %")
    mushroom = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                   verbose_name=u"Hongos y fermentado")
    green = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True, verbose_name=u"Verde")
    cracked = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                  verbose_name=u"Rajado")
    crushed = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                  verbose_name=u"Aplastado")
    phytosanitary = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                        verbose_name='Fitosanitario')
    watery = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                 verbose_name='Consistencia aguada')

    history = HistoricalRecords()

    def __str__(self):
        return self.lot.lot

    def get_lot(self):
        return self.lot.lot

    def get_defects(self):
        try:
            return self.mushroom + self.green + self.cracked + self.crushed + self.phytosanitary + self.watery
        except:
            return 0

    def get_maturation_total(self):
        try:
            return self.maturation_1 + self.maturation_2 + self.maturation_3
        except:
            return 0

    class Meta:
        verbose_name = "Análisis de Aguaymanto"
        verbose_name_plural = "Análisis de Aguaymanto"
        ordering = ['-id']


class AnalysisBanano(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="analysis_banano",
                               verbose_name="Lote MP")

    maturation_1 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                       verbose_name=u"Maduración 1 %")
    maturation_2 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                       verbose_name=u"Maduración 2 %")
    mechanical_damages = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                             verbose_name=u"Daños mecánicos")
    broken_neck = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                      verbose_name=u"Corte de cuello")
    chafing = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                  verbose_name=u"Rozadura")
    scar = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                               verbose_name=u"Cicatriz")
    unharmed = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                   verbose_name=u"Sin daños")
    history = HistoricalRecords()

    def __str__(self):
        return self.lot.lot

    def get_lot(self):
        return self.lot.lot

    def get_maturation_total(self):
        try:
            return self.maturation_1 + self.maturation_2
        except:
            return 0

    class Meta:
        verbose_name = "Análisis de Banano"
        verbose_name_plural = "Análisis de Banano"
        ordering = ['-id']


class AnalysisBlueberry(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="analysis_blueberry",
                               verbose_name="Lote MP")

    average_brix = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                       verbose_name=u"Brix promedio")
    max_brix = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                   verbose_name=u"Brix máximo")
    min_brix = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                   verbose_name=u"Brix mínimo")
    caliber_1 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                    verbose_name=u"Calibre 1 <=11")
    caliber_2 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                    verbose_name=u"Calibre 2 12 -18")
    caliber_3 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                    verbose_name=u"Calibre 3 >=19")
    green = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True, verbose_name=u"Verde")
    crushed = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                  verbose_name=u"Aplastado")
    mechanical_damages = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                             verbose_name=u"Daños mecánicos")
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Análisis de Arándanos"
        verbose_name_plural = "Análisis de Arándanos"
        ordering = ['-id']

    def get_unharmed(self):
        try:
            return 100 - self.green - self.crushed - self.mechanical_damages
        except:
            return 0

    def get_lot(self):
        return self.lot.lot

    def __str__(self):
        return self.lot.lot


class AnalysisMango(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, related_name="analysis_mango",
                               verbose_name="Lote MP")

    color_1 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                  verbose_name=u"Color 1")
    color_1_5 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                    verbose_name=u"Color 1,5 ")
    color_2 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                  verbose_name=u"Color 2")
    color_2_5 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                    verbose_name=u"Color 2,5")
    color_3 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                  verbose_name=u"Color 3")
    brix_7_9 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                   verbose_name=u"Brix 7-9")
    brix_10_12 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                     verbose_name=u"Brix 10-12")
    brix_13 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                  verbose_name=u"Brix >13")
    weight_280 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                     verbose_name=u"Peso <280 ")
    weight_280_300 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                         verbose_name=u"Peso 280-300 ")
    weight_300 = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                     verbose_name=u"Peso >300 ")
    mechanical_damage = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                            verbose_name=u"Daños mecanicos")
    cracked = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                  verbose_name=u"Rajado")
    sun_damage = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                     verbose_name=u"Daños de sol")
    anthracnose = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                      verbose_name=u"Antracnosis")
    rot = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                              verbose_name=u"Pudricion")
    mature = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                 verbose_name=u"Sobre maduro")
    latex = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                verbose_name=u"Latex")
    queresa = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                  verbose_name=u"Queresa")
    insect_bite = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                      verbose_name=u"Picadura de insectos")
    soft = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                               verbose_name=u"Fruta Blanda")
    advanced = models.DecimalField(decimal_places=2, max_digits=4, default=0, blank=True, null=True,
                                   verbose_name=u"Avanzado")

    history = HistoricalRecords()

    class Meta:
        verbose_name = "Análisis de Mango"
        verbose_name_plural = "Análisis de Mango"
        ordering = ['-id']

    def get_total_defects(self):
        try:
            return self.mechanical_damage + self.cracked + self.sun_damage + self.anthracnose + self.rot + self.mature + self.latex + self.queresa + self.insect_bite + self.soft + self.advanced
        except:
            return 0

    def get_total_unharmed(self):
        try:
            return 100 - self.get_total_defects()
        except:
            return 0

    def get_lot(self):
        return self.lot.lot

    def __str__(self):
        return self.lot.lot
