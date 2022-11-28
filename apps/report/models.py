from decimal import Decimal

from django.db import models
from simple_history.models import HistoricalRecords

from apps.raw_material.models import Lot


# Create your models here.
class Report(models.Model):
    lot = models.OneToOneField(Lot, on_delete=models.PROTECT, verbose_name="Lote", related_name="report")

    price_camp = models.DecimalField(decimal_places=2, max_digits=4, default=0,
                                     verbose_name="Precio Campo")
    freight = models.DecimalField(decimal_places=4, max_digits=9, default=0, blank=True, null=True,
                                  verbose_name="Flete")
    observations = models.CharField(max_length=100, blank=True, null=True, verbose_name="Observaciones")
    type = models.CharField(choices=[("campo", "campo"), ("planta", "planta")], max_length=10, default="planta",
                            verbose_name="Referencia de Precio")
    type_kg = models.CharField(choices=[("guia", "guia"), ("neto", "neto"), ("bruto", "bruto")], max_length=10,
                               default="neto",
                               verbose_name="Referencia de kg aprovechables")
    type_discount = models.CharField(choices=[("guia", "guia"), ("neto", "neto"), ("bruto", "bruto")], max_length=10,
                                     default="neto",
                                     verbose_name="Referencia de kg a descontar")
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Registro"
        verbose_name_plural = "Registros"
        ordering = ["-id"]

    def get_quantity_boxes(self):
        try:
            return self.lot.get_quantity_boxes()
        except:
            return 0

    def get_origin(self):
        return self.lot.origin

    def get_parcel(self):
        try:
            return self.lot.parcel
        except:
            return "0"

    def get_brute_weight(self):
        try:
            return Decimal(self.lot.get_total_net_weight()) + Decimal(self.lot.get_weight_boxes())
        except:
            return 0

    def get_condition(self):
        try:
            return self.lot.condition
        except:
            return "0"

    def get_variety(self):
        try:
            return self.lot.variety
        except:
            return "0"

    def get_departure_time(self):
        try:
            return self.lot.departure_time
        except:
            return "0"

    def get_arrival_time(self):
        try:
            return self.lot.arrival_time
        except:
            return "0"

    def get_net_weight(self):
        try:
            return Decimal(self.lot.get_total_net_weight())
        except:
            return 0

    def get_provider_guide(self):
        try:
            return self.lot.providerGuide
        except:
            return "0"

    def get_weight_guide(self):
        try:
            return self.lot.weight_guide
        except:
            return 0

    def get_carrier_guide(self):
        try:
            return self.lot.carrierGuide
        except:
            return "0"

    def get_entry_date(self):
        try:
            return self.lot.entryDate
        except:
            return "0"

    def get_download_date(self):
        try:
            return self.lot.downloadDate
        except:
            return "0"

    def get_tare(self):
        try:
            return Decimal(self.get_brute_weight()) - Decimal(self.lot.get_total_net_weight())
        except:
            return 0

    def get_net_difference(self):
        try:
            return Decimal(self.lot.get_total_net_weight()) - Decimal(self.lot.weight_guide)
        except:
            return 0

    def get_discount_percentage(self):
        try:
            return self.lot.discount_percentage
        except:
            return 0

    def get_kg_discounted(self):
        try:
            if self.type_kg == "guia":
                return (Decimal(self.lot.weight_guide) * Decimal(self.get_discount_percentage())) / 100
            elif self.type_kg == "bruto":
                return (Decimal(self.get_brute_weight()) * Decimal(self.get_discount_percentage())) / 100
            else:
                return (Decimal(self.lot.get_total_net_weight()) * Decimal(self.get_discount_percentage())) / 100
        except:
            return 0

    def get_kg_usable(self):
        try:
            if self.type_kg == "guia":
                return Decimal(self.lot.weight_guide) - Decimal(self.get_kg_discounted())
            elif self.type_kg == "bruto":
                return Decimal(self.get_brute_weight()) - Decimal(self.get_kg_discounted())
            else:
                return Decimal(self.lot.get_total_net_weight()) - Decimal(self.get_kg_discounted())
        except Exception as e:
            return str(e)

    def get_discount_soles(self):
        try:
            return self.price_camp * self.get_kg_discounted()
        except:
            return 0

    def get_price_plant(self):
        try:
            return ((Decimal(self.get_kg_usable()) * Decimal(self.price_camp)) + Decimal(self.freight)) / Decimal(
                self.get_kg_usable())
        except:
            return 0

    def get_total_amount(self):
        try:
            if self.type == "campo":
                return self.get_kg_usable() * self.price_camp
            else:
                return self.get_kg_usable() * self.get_price_plant()
        except:
            return 0

    def get_year(self):
        try:
            return self.lot.downloadDate.strftime('%Y')
        except:
            return "0"

    def get_month(self):
        try:
            return self.lot.downloadDate.strftime('%B')
        except:
            return "0"

    def get_week(self):
        try:
            return self.lot.downloadDate.isocalendar()[1]
        except:
            return 0

    def get_lot(self):
        return self.lot.lot

    def __str__(self):
        return self.lot.lot

    def get_provider(self):
        return self.lot.provider.name
