from django.apps import AppConfig


class ProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.products'
    verbose_name = 'Productos'
    verbose_name_plural = 'Productos'
