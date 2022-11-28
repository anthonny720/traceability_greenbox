from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.process_line.models import TypesCut, ProcessLineConditioning, ProcessLineTerminated, ProcessLineReleased


# Register your models here.
@admin.register(TypesCut)
class TypeCut(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'code',)


@admin.register(ProcessLineConditioning)
class ProcessLineConditioningAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('process_date', 'lot',)
    list_filter = ('lot__category__name',)
    list_per_page = 20
    search_fields = ('process_date', 'lot',)
    date_hierarchy = 'process_date'


@admin.register(ProcessLineTerminated)
class ProcessLineTerminatedAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('packing_date', 'lot', 'quantity', 'process',)
    list_filter = ('process__lot__category__name',)
    list_per_page = 20
    search_fields = ('packing_date', 'lot',)
    date_hierarchy = 'packing_date'


@admin.register(ProcessLineReleased)
class ProcessLineReleasedAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('release_date', 'quantity', 'client', 'process')
    list_filter = ('client', 'process__process__lot__category__name')
    list_per_page = 20
    search_fields = ('release_date', 'client',)
    date_hierarchy = 'release_date'

# Register your models here.
