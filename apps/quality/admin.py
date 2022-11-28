from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.quality.models import (AnalysisPineapple, AnalysisMango, AnalysisBanano, AnalysisAguaymanto,
                                 AnalysisBlueberry, CutTest, )


@admin.register(AnalysisPineapple)
class AnalysisPineappleAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__name',)
    list_per_page = 20


@admin.register(AnalysisMango)
class AnalysisMangoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__name',)
    list_per_page = 20


@admin.register(AnalysisBanano)
class AnalysisBananoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__name',)
    list_per_page = 20


@admin.register(AnalysisAguaymanto)
class AnalysisAguaymantoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__name',)
    list_per_page = 20


@admin.register(AnalysisBlueberry)
class AnalysisBlueberryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__name',)
    list_per_page = 20


@admin.register(CutTest)
class CutTestAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot', 'cut_fresh_1_8', 'cut_1_8', 'eyes',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__name',)
    list_per_page = 20
