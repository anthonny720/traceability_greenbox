from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.production.models import ProcessPineapple, Crown, Peel


@admin.register(ProcessPineapple)
class ProcessPineappleAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'lot', 'juice', 'discard', 'people', 'kg_unpeeled', 'cars', 'status',)
    list_editable = ('status',)
    date_hierarchy = 'date'
    search_fields = ('date', 'lot',)
    list_filter = ('status',)
    list_per_page = 20


@admin.register(Crown)
class CrownAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('process', 'weight', 'pallet',)
    list_per_page = 20


@admin.register(Peel)
class PeelAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('process', 'weight', 'pallet',)
    list_per_page = 20
