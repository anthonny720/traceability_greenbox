from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.raw_material.models import Lot, ILot


# Register your models here.
@admin.register(Lot)
class LotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = (
        'lot',
        'downloadDate',
        'provider',
        'parcel',
        'carrierGuide',
        'providerGuide',
        'quality',
        'category',
        'closed',
    )
    search_fields = ('lot', 'carrierGuide', 'providerGuide')
    list_filter = ('provider', 'category', 'closed')
    list_editable = ('closed',)
    date_hierarchy = 'downloadDate'
    list_per_page = 20




@admin.register(ILot)
class ILotAdmin(ImportExportModelAdmin,SimpleHistoryAdmin):
    list_per_page = 20
    search_fields = ('lot__lot', )
    list_filter = ('lot__category', 'indicted',)
    list_editable = ('indicted', 'dateIndicted',)
    date_hierarchy = 'dateIndicted'
    list_display = ('lot', 'number', 'weight', 'final_weight', 'dateIndicted', 'indicted',)
