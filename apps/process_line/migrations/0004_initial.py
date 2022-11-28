# Generated by Django 3.2 on 2022-11-25 09:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
        ('business_partners', '0003_initial'),
        ('raw_material', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('process_line', '0003_processlineconditioning_lot'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicaltypescut',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalprocesslineterminated',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalprocesslineterminated',
            name='process',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='process_line.processlineconditioning', verbose_name='Proceso de Acondicionado'),
        ),
        migrations.AddField(
            model_name='historicalprocesslineterminated',
            name='type_cut',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='process_line.typescut'),
        ),
        migrations.AddField(
            model_name='historicalprocesslinereleased',
            name='client',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='business_partners.client', verbose_name='Cliente'),
        ),
        migrations.AddField(
            model_name='historicalprocesslinereleased',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalprocesslinereleased',
            name='lot_bags',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='products.packingproduct', verbose_name='Lote de Bolsas'),
        ),
        migrations.AddField(
            model_name='historicalprocesslinereleased',
            name='lot_boxes',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='products.packingproduct', verbose_name='Lote de Cajas'),
        ),
        migrations.AddField(
            model_name='historicalprocesslinereleased',
            name='process',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='process_line.processlineterminated', verbose_name='Proceso Terminado'),
        ),
        migrations.AddField(
            model_name='historicalprocesslineconditioning',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalprocesslineconditioning',
            name='lot',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='raw_material.lot', verbose_name='Lote Materia Prima'),
        ),
        migrations.AlterUniqueTogether(
            name='processlineterminated',
            unique_together={('packing_date', 'lot')},
        ),
        migrations.AlterUniqueTogether(
            name='processlineconditioning',
            unique_together={('process_date', 'lot')},
        ),
    ]
