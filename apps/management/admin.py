from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.management.models import Payments, Kardex, Motion, Location


# Register your models here.
@admin.register(Payments)
class PaymentsAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'name', 'business_name', 'receipt', 'amount', 'status')
    search_fields = ('date', 'cancelled',)
    list_per_page = 20
    date_hierarchy = 'date'
    list_filter = ('status',)

@admin.register(Location)
class LocationAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name',)
    list_per_page = 20


@admin.register(Kardex)
class KardexAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('id', 'date', 'input', 'output')
    list_per_page = 20
    search_fields = ('date',)
    list_filter = ('category',)
    date_hierarchy = 'date'


@admin.register(Motion)
class MotionAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'quantity',)
    date_hierarchy = 'date'
    list_filter = ('to', 'fr',)
    list_per_page = 25
