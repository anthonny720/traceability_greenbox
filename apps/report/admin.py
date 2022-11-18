from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from apps.report.models import Report


# Register your models here.
@admin.register(Report)
class ReportAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('lot',
                    'price_camp',
                    'freight',
                    'observations',)
    list_per_page = 20
    date_hierarchy = 'lot__downloadDate'
    list_filter = ('lot__category', 'lot__downloadDate',)
