import uuid
from datetime import date
from decimal import Decimal

from django.db import models
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from simple_history.models import HistoricalRecords

from apps.business_partners.models import ProviderMP, Contact, Carrier
from apps.products.models import Fruits, Pallets, Boxes


def custom_doc_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return '/'.join(['MATERIA_PRIMA', str(date.today().year), instance.category.name, instance.lot, filename])


# Create your models here.

class Lot(models.Model):
    provider = models.ForeignKey(ProviderMP, on_delete=models.PROTECT, related_name="provider_entry",
                                 verbose_name="Proveedor")
    origin = models.CharField(max_length=100, verbose_name="Origen")
    parcel = models.CharField(max_length=100, blank=True, null=True, default="No Parcel", verbose_name="Parcela")
    carrierGuide = models.CharField(max_length=12, verbose_name="Guia de transporte")
    providerGuide = models.CharField(max_length=12, verbose_name="Guia de proveedor")
    docs = models.FileField(upload_to=custom_doc_file_path, blank=True, null=True, verbose_name="Documentos")
    entryDate = models.DateField(verbose_name="Fecha de entrada")
    starting_point_date = models.DateField(verbose_name="Fecha de inicio de partida", blank=True, null=True)
    downloadDate = models.DateField(verbose_name="Fecha de descarga")
    weight_guide = models.DecimalField(decimal_places=3, max_digits=11, default=0, blank=True, null=True,
                                       verbose_name="Peso Guia")

    condition = models.CharField(max_length=100, blank=True, null=True, verbose_name="Condición")
    variety = models.CharField(max_length=100, blank=True, null=True, verbose_name="Variedad")
    departure_time = models.TimeField(blank=True, null=True, verbose_name="Hora de Salida de Acopio")
    arrival_time = models.TimeField(blank=True, null=True, verbose_name="Hora de Llegada a Planta")
    lot = models.CharField(max_length=13, unique=True, verbose_name="Lote")
    quality = models.DecimalField(decimal_places=1, max_digits=3, default=0, blank=True, null=True,
                                  verbose_name="Muestra de Calidad")
    category = models.ForeignKey(Fruits, on_delete=models.PROTECT, related_name="fruit_entry",
                                 verbose_name="Categoria")
    description = models.CharField(max_length=500, blank=True, null=True, verbose_name="Descripcion")
    certified = models.CharField(max_length=500, blank=True, null=True, verbose_name="Certificado")
    discount_percentage = models.DecimalField(decimal_places=10, max_digits=15, default=0, blank=True, null=True,
                                              verbose_name="Porcentaje de Descuento")
    driver = models.ForeignKey(Contact, on_delete=models.PROTECT, related_name="driver_entry", verbose_name="Conductor",
                               blank=True, null=True)
    carrier = models.ForeignKey(Carrier, on_delete=models.PROTECT, related_name="carrier_entry",
                                verbose_name="Empresa de transporte", blank=True, null=True)
    closed = models.BooleanField(default=False, verbose_name="Cerrado/Abierto")
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Lote"
        verbose_name_plural = "Lotes"
        ordering = ['-downloadDate']

    def __str__(self):
        return self.lot

    def get_driver(self):
        if self.driver:
            return self.driver.name
        return ''

    def get_carrier(self):
        if self.carrier:
            return self.carrier.name
        return ''

    def get_carrier_code(self):
        if self.carrier:
            return self.carrier.code
        return ''

    def get_calibers_percentage(self):
        c = {"c6": 0, "c8": 0, "c10": 0, "c12": 0, "c14": 0}
        try:
            total = self.get_c()
            c["c6"] = (float(total["c6"]) / float(self.get_quantity_boxes())) * 100
            c["c8"] = (float(total["c8"]) / float(self.get_quantity_boxes())) * 100
            c["c10"] = (float(total["c10"]) / float(self.get_quantity_boxes())) * 100
            c["c12"] = (float(total["c12"]) / float(self.get_quantity_boxes())) * 100
            c["c14"] = (float(total["c14"]) / float(self.get_quantity_boxes())) * 100
            return c
        except:
            return c

    def get_weight_pallets(self):
        t = 0
        try:
            for count in self.data.all():
                t += count.get_weight_pallet()
            return t
        except:
            return t

    def get_year(self):
        try:
            return self.downloadDate.strftime('%Y')
        except:
            return "0"

    def get_month(self):
        try:
            return self.downloadDate.strftime('%B')
        except:
            return "0"

    def get_week(self):
        try:
            return self.downloadDate.isocalendar()[1]
        except:
            return 0

    def get_document(self):
        if self.docs:
            return self.docs.url
        return ''

    def get_total_amount_guide_kg(self):
        try:
            return self.weight_guide - self.get_discount_guide_kg()
        except:
            return 0

    def get_total_amount_net_kg(self):
        try:
            return Decimal(self.get_total_net_weight()) - Decimal(self.get_discount_net_kg())
        except:
            return 0

    def get_discount_guide_kg(self):
        try:
            return Decimal(self.weight_guide) * Decimal(self.discount_percentage / 100)
        except:
            return 0

    def get_discount_net_kg(self):
        try:
            return Decimal(self.get_total_net_weight()) * (Decimal(self.discount_percentage) / 100)
        except Exception as e:
            return 0

    def get_category_name(self):
        try:
            return self.category.name
        except:
            return "Sin categoria"

    def get_provider_name(self):
        try:
            return self.provider.name
        except:
            return "Sin proveedor"

    def get_c(self):
        c = {"c6": 0, "c8": 0, "c10": 0, "c12": 0, "c14": 0}
        try:
            for count in self.data.all():
                c["c6"] += count.c6
                c["c8"] += count.c8
                c["c10"] += count.c10
                c["c12"] += count.c12
                c["c14"] += count.c14
            return c
        except:
            return c

    def get_weight_pallets(self):
        t = 0
        try:
            for count in self.data.all():
                t += count.get_weight_pallet()
            return t
        except:
            return t

    def get_weight_boxes(self):
        t = 0
        try:
            for count in self.data.all():
                t += count.get_weight_boxes()
            return t
        except:
            return t

    def get_pallet(self):
        try:
            e = self.data.all()
            p = {"Negro": e.filter(pallet__name="Negro").count(),
                 "Verde": e.filter(pallet__name="Verde").count(),
                 "Azul": e.filter(pallet__name="Azul").count(),
                 "Celeste": e.filter(pallet__name="Celeste").count(),
                 "Rojo": e.filter(pallet__name="Rojo").count(),
                 "Madera": e.filter(pallet__name="Madera").count()}
            return p
        except Exception as e:
            return {'Negro': 0, 'Verde': 0, 'Azul': 0, 'Rojo': 0, 'Madera': 0, 'error': str(e)}

    def get_box(self):
        b = {"gb": 0, "co": 0, "t0": 0, "t1": 0, "t2": 0, "gn": 0, "pa": 0, "ma": 0}
        try:
            for count in self.data.all():
                b["gb"] += count.gb
                b["co"] += count.co
                b["t0"] += count.t0
                b["t1"] += count.t1
                b["t2"] += count.t2
                b["gn"] += count.gn
                b["pa"] += count.pa
                b["ma"] += count.ma
            return b
        except:
            return b

    def get_avg_brute(self):
        try:
            return float(self.get_total_brute_weight()) / float(self.get_quantity_boxes())
        except:
            return 0

    def get_avg_net(self):
        try:
            return float(self.get_total_net_weight()) / float(self.get_quantity_boxes())
        except:
            return 0

    def get_quantity_boxes(self):
        t = 0
        try:
            for count in self.data.all():
                t += count.get_quantity_boxes()
            return t
        except:
            return t

    def get_total_final_weight(self):
        t = 0
        try:
            for count in self.data.all():
                t += count.final_weight
            return t
        except:
            return t

    def get_total_tare(self):
        t = 0
        try:
            for count in self.data.all():
                t += count.tare
            return t
        except:
            return t

    def get_total_net_weight(self):
        nw = 0
        try:
            for count in self.data.all():
                nw += count.get_net_weight()
            return nw + float(self.quality)
        except:
            return nw

    def get_total_net_final_weight(self):
        nfw = 0
        try:
            for count in self.data.all():
                nfw += count.get_net_final_weight()
            return nfw
        except:
            return nfw

    def get_decrease(self):
        try:
            return self.get_total_net_weight() - self.get_total_net_final_weight() - float(self.quality)
        except:
            return 0

    def get_total_indicted(self):
        ti = 0
        try:
            for t in self.data.all():
                ti += t.get_indicted_size()
            return ti
        except:
            return ti

    def get_stock(self):
        try:
            return self.get_total_net_weight() - self.get_total_indicted() - self.get_decrease() - float(self.quality)
        except:
            return 0

    def get_total_brute_weight(self):

        try:
            return float(self.get_total_net_weight()) + float(self.get_weight_boxes())
        except Exception as e:
            return 0


class ILot(models.Model):
    number = models.IntegerField(verbose_name="Numero de pallet")
    weight = models.FloatField(default=0, verbose_name="Peso bruto")
    final_weight = models.FloatField(default=0, verbose_name="Peso final")
    gb = models.IntegerField(default=0, verbose_name="GreenBox")
    pa = models.IntegerField(default=0, verbose_name="PAE")
    co = models.IntegerField(default=0, verbose_name="Colores")
    t0 = models.IntegerField(default=0, verbose_name="Tibana 0")
    t1 = models.IntegerField(default=0, verbose_name="Tibana 1")
    t2 = models.IntegerField(default=0, verbose_name="Tibana 2")
    gn = models.IntegerField(default=0, verbose_name="Gandules")
    ma = models.IntegerField(default=0, verbose_name="Madera")
    pallet = models.ForeignKey(Pallets, on_delete=models.PROTECT, verbose_name="Pallet", related_name="pallet")
    tare = models.FloatField(default=0, verbose_name="Tara")
    c6 = models.IntegerField(default=0, verbose_name="Calibre 6")
    c8 = models.IntegerField(default=0, verbose_name="Calibre 8")
    c10 = models.IntegerField(default=0, verbose_name="Calibre 10")
    c12 = models.IntegerField(default=0, verbose_name="Calibre 12")
    c14 = models.IntegerField(default=0, verbose_name="Calibre 14")
    dateIndicted = models.DateField(blank=True, null=True, verbose_name="Fecha de procesado")
    indicted = models.BooleanField(default=False, verbose_name="Procesado")
    lot = models.ForeignKey(Lot, on_delete=models.PROTECT, related_name="data", verbose_name="Lote")
    location = models.ForeignKey(to='management.Location', on_delete=models.PROTECT, verbose_name="Ubicacion",
                                 related_name="lot",
                                 blank=True, null=True)
    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Informacion de Lotes'
        verbose_name_plural = 'Informacion de Lotes'
        ordering = ['number']

    def __str__(self):
        return str(self.id) + " - " + self.lot.lot

    def get_lot(self):
        try:
            return self.lot.lot
        except:
            return "--------------"

    def get_pallet(self):
        try:
            return self.pallet.name
        except:
            return "--------------"

    def get_quantity_boxes(self):
        try:
            return self.gb + self.pa + self.co + self.t0 + self.t1 + self.t2 + self.gn + self.ma
        except:
            return 0

    def get_weight_boxes(self):
        try:
            return (self.pa * Boxes.objects.filter(name="PAE").first().weight) + (
                    self.gb * Boxes.objects.filter(name="GreenBox").first().weight) + (
                           self.t0 * Boxes.objects.filter(name="Tibana").first().weight) + (
                           self.t1 * Boxes.objects.filter(name="Tibana 1").first().weight) + (
                           self.t2 * Boxes.objects.filter(name="Tibana 2").first().weight) + (
                           self.co * Boxes.objects.filter(name="Colores").first().weight) + (
                           self.gn * Boxes.objects.filter(name="Gandules").first().weight) + (
                           self.ma * Boxes.objects.filter(name="Madera").first().weight)
        except:
            return 0

    def get_weight_pallet(self):
        try:
            return Pallets.objects.get(name=self.pallet.name).weight
        except:
            return 0

    def get_net_weight(self):
        try:
            return self.weight - self.tare
        except:
            return 0

    def get_net_final_weight(self):
        try:
            return self.final_weight - self.tare
        except:
            return 0

    def get_indicted_size(self):
        try:
            if self.indicted:
                return self.get_net_final_weight()
        except:
            return 0

    def get_indicted(self):
        if self.indicted:
            return "✔"
        else:
            return "✘"


@receiver(pre_save, sender=ILot)
def my_callback(sender, instance, *args, **kwargs):
    if instance.final_weight < 1:
        instance.final_weight = instance.weight
    if instance.tare == 0:
        instance.tare = instance.get_weight_pallet() + instance.get_weight_boxes()
    else:
        instance.tare = instance.tare
    if instance.dateIndicted:
        instance.indicted = True
        instance.dateIndicted = instance.dateIndicted
    else:
        if instance.indicted:
            instance.dateIndicted = date.today()
        else:
            instance.dateIndicted = None


@receiver(pre_save, sender=Lot)
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


@receiver(post_delete, sender=Lot)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.docs.delete(save=False)
    except:
        pass
