from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from apps.production.models import ProcessPineapple, Crown, Peel


@admin.register(ProcessPineapple)
class ProcessPineappleAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('date', 'lot', 'juice', 'discard', 'people', 'kg_unpeeled', 'cars', 'status',)
    list_editable = ('status',)
    date_hierarchy = 'date'
    search_fields = ('date', 'lot',)
    list_filter = ('status',)
    list_per_page = 20


@admin.register(Crown)
class CrownAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('process', 'weight', 'pallet',)
    list_per_page = 20


@admin.register(Peel)
class PeelAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('process', 'weight', 'pallet',)
    list_per_page = 20
