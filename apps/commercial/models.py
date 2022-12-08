from django.db import models

from apps.business_partners.models import Client, BusinessMaquila
from apps.warehouse.models import PackingList


class Family(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Familia'
        verbose_name_plural = 'Familia'


class Group(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Grupo'
        verbose_name_plural = 'Grupos'


class Type(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Tipo'
        verbose_name_plural = 'Tipos'


class Product(models.Model):
    name = models.CharField(max_length=60, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'


class Cut(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Corte'
        verbose_name_plural = 'Cortes'


class Variety(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Variedad'
        verbose_name_plural = 'Variedades'


class Presentation(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Presentación'
        verbose_name_plural = 'Presentaciones'


class Packing(models.Model):
    name = models.CharField(max_length=50, verbose_name='Nombre')
    category = models.CharField(choices=(('1', 'Empaque'), ('2', 'Embajale')), max_length=1, default=1,
                                verbose_name='Categoría')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Empaque'
        verbose_name_plural = 'Empaques'
        unique_together = ('name', 'category')


class Condition(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Condición'
        verbose_name_plural = 'Condiciones'


class Lot(models.Model):
    name = models.CharField(max_length=50, verbose_name='Nombre')
    production_date = models.DateField(verbose_name='Fecha de producción', blank=True, null=True)
    expiring_date = models.DateField(verbose_name='Fecha de vencimiento', blank=True, null=True)
    boxes = models.IntegerField(verbose_name='Cajas', blank=True, null=True, default=0)
    fcl = models.ForeignKey(PackingList, verbose_name='FCL', blank=True, null=True, on_delete=models.CASCADE,
                            related_name='fcl_lot')
    observation = models.TextField(verbose_name='Observación', blank=True, null=True)
    stock = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Stock')
    family = models.ForeignKey(Family, on_delete=models.CASCADE, verbose_name='Familia', related_name='family')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, verbose_name='Grupo', related_name='group')
    type_inf = models.ForeignKey(Type, on_delete=models.CASCADE, verbose_name='Tipo', related_name='type', blank=True,
                                 null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Producto', related_name='product_lot')
    cut = models.ForeignKey(Cut, blank=True, null=True, on_delete=models.CASCADE, verbose_name='Corte',
                            related_name='cut')
    variety = models.ForeignKey(Variety, blank=True, null=True, on_delete=models.CASCADE, verbose_name='Variedad',
                                related_name='variety')
    client = models.ForeignKey(Client, blank=True, null=True, on_delete=models.CASCADE, verbose_name='Cliente',
                               related_name='client')
    presentation = models.ForeignKey(Presentation, blank=True, null=True, on_delete=models.CASCADE,
                                     verbose_name='Presentación',
                                     related_name='presentation')
    packaging = models.ForeignKey(Packing, blank=True, null=True, on_delete=models.CASCADE, verbose_name='Embalaje',
                                  related_name='packaging')
    packing = models.ForeignKey(Packing, blank=True, null=True, on_delete=models.CASCADE, verbose_name='Empaque',
                                related_name='packing', )
    provider = models.ForeignKey(BusinessMaquila, on_delete=models.CASCADE, verbose_name='Proveedor',
                                 related_name='provider', blank=True, null=True)
    condition = models.ForeignKey(Condition, on_delete=models.CASCADE, verbose_name='Condición',
                                  related_name='condition', blank=True, null=True)
    progress = models.DecimalField(default=0, verbose_name='Progreso', max_digits=4, decimal_places=1, blank=True,
                                   null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name', 'production_date']
        verbose_name = 'Lotes'
        verbose_name_plural = 'Lotes'
