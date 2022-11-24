from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.warehouse.models import Reception, LotPT, IReception, PackingList, IPackingList


# Register your models here.

@admin.register(LotPT)
class LotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot', 'quantity', 'container')
    search_fields = ('lot',)
    list_per_page = 20


@admin.register(Reception)
class ReceptionAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('method', 'date', 'full_name')
    search_fields = ('client__name', 'date',)
    list_per_page = 20
    date_hierarchy = 'date'
    list_filter = ('client', 'method', 'type')


@admin.register(IReception)
class IReceptionAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'lot',)
    search_fields = ('date', 'lot__process__lot',)
    date_hierarchy = 'date'
    list_per_page = 20


@admin.register(PackingList)
class PackingListAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('full_name', 'order', 'status')
    search_fields = ('reception__date',)
    date_hierarchy = 'reception__date'
    list_filter = ('status', 'reception__type')
    list_per_page = 20


@admin.register(IPackingList)
class IPackingListAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('packing_list', 'number', 'lot', 'boxes')
    search_fields = ('packing_list__reception__full_name',)
    list_per_page = 20
