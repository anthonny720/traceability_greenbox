from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.products.models import Fruits, PackingProduct, Boxes, Pallets


# Register your models here.
@admin.register(Fruits)
class FruitsAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)


@admin.register(PackingProduct)
class PackingProductAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
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
class BoxesAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'weight',)
    list_per_page = 20


@admin.register(Pallets)
class PalletsAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'weight',)
    list_per_page = 20
