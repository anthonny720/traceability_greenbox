from django.contrib import admin
from django.contrib.auth import get_user_model
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

User = get_user_model()


@admin.register(User)
class UserAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', 'role', 'created_at')
    list_filter = ('is_active', 'is_staff', 'role')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ['-id']
    list_per_page = 25
