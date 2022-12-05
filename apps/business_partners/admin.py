from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.business_partners.models import ProviderMP, Client, ProviderPacking, Contact, Carrier, BusinessMaquila


# Register your models here.
@admin.register(ProviderMP)
class ProviderMPAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'ruc', 'contact', 'email', 'stock')
    search_fields = ('name', 'ruc', 'contact', 'email')
    list_per_page = 20


@admin.register(Client)
class ClientAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'ruc', 'contact', 'email')
    search_fields = ('name', 'ruc', 'contact', 'email')
    list_per_page = 20


@admin.register(ProviderPacking)
class ProviderPackingAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'ruc', 'contact', 'email')
    search_fields = ('name', 'ruc', 'contact', 'email')
    list_per_page = 20


@admin.register(BusinessMaquila)
class BusinessMaquilaPackingAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'ruc', 'contact', 'email')
    search_fields = ('name', 'ruc', 'contact', 'email')
    list_per_page = 20


@admin.register(Contact)
class ContactAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'dni', 'email', 'phone')
    search_fields = ('name', 'dni', 'email', 'phone')
    list_per_page = 20


@admin.register(Carrier)
class CarrierAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'ruc', 'code')
    search_fields = ('name', 'ruc', 'code')
    list_per_page = 20
