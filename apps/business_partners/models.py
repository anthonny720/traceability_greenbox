import uuid
from datetime import datetime

from django.db import models
from django.utils.text import slugify
from simple_history.models import HistoricalRecords


# Create your models here.
class ContactProxy(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name="Nombre")
    description = models.TextField(verbose_name="Descripción", blank=True, null=True)
    business_name = models.CharField(max_length=255, blank=True, null=True, verbose_name="Razón Social")
    ruc = models.CharField(max_length=15, blank=True, null=True, verbose_name="RUC")
    address = models.CharField(max_length=255, blank=True, null=True, verbose_name="Dirección")
    city = models.CharField(max_length=255, blank=True, null=True, verbose_name="Ciudad")
    country = models.CharField(max_length=255, blank=True, null=True, verbose_name="País")
    zip_code = models.CharField(max_length=10, blank=True, null=True, verbose_name="Código Postal")
    contact = models.CharField(max_length=255, blank=True, null=True, verbose_name="Contacto")
    position = models.CharField(max_length=255, blank=True, null=True, verbose_name="Cargo")
    email = models.EmailField(max_length=255, blank=True, null=True, verbose_name="Correo Electrónico")
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Teléfono")
    payment = models.CharField(max_length=255, blank=True, null=True, verbose_name="Forma de Pago")
    money = models.CharField(choices=(('1', 'USD'), ('2', 'EUR'), ('3', 'SOLES'),), default='1', verbose_name="Moneda",
                             max_length=1)
    image = models.URLField(max_length=255, blank=True, null=True, verbose_name="Imagen")
    slug = models.SlugField(max_length=255, default=uuid.uuid1, verbose_name="Slug", blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(ContactProxy, self).save(*args, **kwargs)

    class Meta:
        abstract = True
        verbose_name = "Información de Contacto"
        verbose_name_plural = "Información de Contactos"


class ProviderMP(ContactProxy):
    code = models.CharField(max_length=2, blank=True, null=True, verbose_name="Código", unique=True)
    stock = models.PositiveIntegerField(default=0, verbose_name="Stock")
    category = models.ForeignKey(to='products.Fruits', on_delete=models.PROTECT, null=True, blank=True,
                                 related_name='provider', verbose_name="Categoría")
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Proveedor Materia Prima'
        verbose_name_plural = 'Proveedores Materia Prima'
        ordering = ['name']

    def get_total_sales(self):
        try:
            current_date = datetime.date(datetime.now())
            return self.provider_entry.all().filter(entryDate__year=current_date.year).count()
        except:
            return 0


class Client(ContactProxy):
    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Cliente Comercial'
        verbose_name_plural = 'Clientes Comerciales'
        ordering = ['-id']

    def get_total_sales(self):
        try:
            current_date = datetime.date(datetime.now())
            return self.receptions.all().filter(date__year=current_date.year).count()
        except:
            return 0

    def __str__(self):
        return self.name


class ProviderPacking(ContactProxy):
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Proveedor de Packing'
        verbose_name_plural = 'Proveedores de Packing'
        ordering = ['-id']


class Contact(models.Model):
    name = models.CharField(max_length=50, verbose_name="Nombre")
    dni = models.IntegerField(blank=True, null=True, verbose_name="DNI")
    email = models.EmailField(max_length=50, blank=True, null=True, verbose_name="Correo Electrónico")
    phone = models.IntegerField(verbose_name="Teléfono")
    licence = models.CharField(max_length=9, blank=True, null=True, verbose_name="Licencia")
    reference = models.CharField(max_length=50, blank=True, null=True, verbose_name="Referencia")
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Contacto'
        verbose_name_plural = "Contactos"
        ordering = ['-id']


class Carrier(models.Model):
    name = models.CharField(max_length=50, verbose_name="Nombre")
    ruc = models.CharField(blank=True, null=True, max_length=11, verbose_name="RUC")
    code = models.CharField(max_length=10, blank=True, null=True, verbose_name="Placa", unique=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Empresa de Transporte'
        verbose_name_plural = "Empresas de Transporte"
        ordering = ['-id']


class BusinessMaquila(ContactProxy):
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Empresa de Maquila'
        verbose_name_plural = "Empresas de Maquila"
        ordering = ['-id']
