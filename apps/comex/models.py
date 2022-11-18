import uuid
from datetime import date

from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver

from apps.warehouse.models import PackingList


# Create your models here.

def custom_doc_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return '/'.join(['COMEX', str(date.today().year), instance.packing_list.full_name(), filename])


class Documentation(models.Model):
    packing_list = models.OneToOneField(PackingList, on_delete=models.CASCADE, related_name='documentation')
    date = models.DateField(verbose_name='Programa de despacho')
    destine = models.CharField(max_length=50, verbose_name='Destino')
    guide = models.CharField(max_length=50, verbose_name='Guía de remisión')
    order = models.CharField(max_length=50, verbose_name='Orden de Pedido')
    docs = models.FileField(upload_to=custom_doc_file_path, verbose_name='Documentación')

    def __str__(self):
        return str(self.date)

    def get_document(self):
        if self.docs:
            return self.docs.url
        return ''

    def get_packing_list(self):
        return self.packing_list.full_name()

    class Meta:
        verbose_name = 'Documentación'
        verbose_name_plural = 'Documentación'
        ordering = ['-date']


@receiver(post_delete, sender=Documentation)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.doc.delete(save=False)
    except:
        pass
