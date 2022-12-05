from django.db import models
from django.db.models import Sum


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
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')
    from_color = models.CharField(max_length=50, verbose_name='From color', blank=True)
    via = models.CharField(max_length=50, verbose_name='Vía color', blank=True)
    to = models.CharField(max_length=50, verbose_name='To color', blank=True)

    def __str__(self):
        return self.name

    def get_stock(self):
        try:
            inf = self.product_lot.all()
            exportation = inf.filter(group__name__iexact='Exportacion').aggregate(Sum('stock'))['stock__sum']
            merma = inf.filter(group__name__iexact='Merma').aggregate(Sum('stock'))['stock__sum']
            local = inf.filter(group__name__iexact='Local').aggregate(Sum('stock'))['stock__sum']
            sample = inf.filter(group__name__iexact='Muestra').aggregate(Sum('stock'))['stock__sum']
            return {'merma': merma, 'exportation': exportation, 'local': local, 'sample': sample}
        except Exception as e:
            return str(e)

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


class Client(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'


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


class Provider(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Proveedor'
        verbose_name_plural = 'Proveedores'


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
    production_date = models.DateField(verbose_name='Fecha de producción')
    expiring_date = models.DateField(verbose_name='Fecha de vencimiento')
    boxes = models.IntegerField(verbose_name='Cajas')
    fcl = models.CharField(max_length=25, verbose_name='FCL', blank=True, null=True)
    observation = models.TextField(verbose_name='Observación', blank=True, null=True)
    stock = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Stock')
    family = models.ForeignKey(Family, on_delete=models.CASCADE, verbose_name='Familia', related_name='family')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, verbose_name='Grupo', related_name='group')
    type_inf = models.ForeignKey(Type, on_delete=models.CASCADE, verbose_name='Tipo', related_name='type')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Producto', related_name='product_lot')
    cut = models.ForeignKey(Cut, on_delete=models.CASCADE, verbose_name='Corte', related_name='cut')
    variety = models.ForeignKey(Variety, on_delete=models.CASCADE, verbose_name='Variedad', related_name='variety')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, verbose_name='Cliente', related_name='client')
    presentation = models.ForeignKey(Presentation, on_delete=models.CASCADE, verbose_name='Presentación',
                                     related_name='presentation')
    packaging = models.ForeignKey(Packing, on_delete=models.CASCADE, verbose_name='Embalaje', related_name='packaging')
    packing = models.ForeignKey(Packing, on_delete=models.CASCADE, verbose_name='Empaque', related_name='packing')
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, verbose_name='Proveedor', related_name='provider')
    condition = models.ForeignKey(Condition, on_delete=models.CASCADE, verbose_name='Condición',
                                  related_name='condition')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name', 'production_date']
        verbose_name = 'Lotes'
        verbose_name_plural = 'Lotes'
