from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from apps.comex.models import Documentation


# Register your models here.
@admin.register(Documentation)
class DocumentationAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = (
        'packing_list',
        'date',
        'destine',
        'guide',
        'order',
    )
    search_fields = ('guide', 'order',)
    list_per_page = 20
    date_hierarchy = 'date'
