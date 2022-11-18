from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from apps.products.models import Fruits, PackingProduct, Boxes, Pallets


# Register your models here.
@admin.register(Fruits)
class FruitsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('name',)


@admin.register(PackingProduct)
class PackingProductAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('entry_date',
                    'provider',
                    'quantity',
                    'type',
                    'lot',)
    list_filter = ('provider', 'type',)
    search_fields = ('lot',)
    date_hierarchy = 'entry_date'
    list_per_page = 20


@admin.register(Boxes)
class BoxesAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('name', 'weight',)
    list_per_page = 20


@admin.register(Pallets)
class PalletsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('name', 'weight',)
    list_per_page = 20
