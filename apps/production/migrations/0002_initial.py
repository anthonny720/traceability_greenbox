# Generated by Django 3.2 on 2022-11-28 12:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('production', '0001_initial'),
        ('raw_material', '0001_initial'),
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='processpineapple',
            name='lot',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='process_pineapple', to='raw_material.lot', verbose_name='Lote'),
        ),
        migrations.AddField(
            model_name='peel',
            name='pallet',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='products.pallets', verbose_name='Pallet'),
        ),
        migrations.AddField(
            model_name='peel',
            name='process',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='peel', to='production.processpineapple', verbose_name='Proceso'),
        ),
    ]