from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from apps.warehouse.models import Reception, LotPT, IReception, PackingList,IPackingList


# Register your models here.

@admin.register(LotPT)
class LotAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('lot', 'quantity', 'container')
    search_fields = ('lot',)
    list_per_page = 20


@admin.register(Reception)
class ReceptionAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('method', 'date', 'full_name')
    search_fields = ('client__name', 'date',)
    list_per_page = 20
    date_hierarchy = 'date'
    list_filter = ('client', 'method', 'type')

@admin.register(IReception)
class IReceptionAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('date', 'lot', 'packing', 'quality', 'logistic')
    search_fields = ('date', 'lot__process__lot',)
    date_hierarchy = 'date'
    list_filter = ('packing', 'quality', 'logistic')
    list_per_page = 20

@admin.register(PackingList)
class PackingListAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('full_name', 'order', 'status')
    search_fields = ('reception__date',)
    date_hierarchy = 'reception__date'
    list_filter = ('status','reception__type')
    list_per_page = 20

@admin.register(IPackingList)
class IPackingListAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('packing_list', 'number', 'lot','boxes')
    search_fields =  ('packing_list__reception__full_name', )
    list_per_page = 20
