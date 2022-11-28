# Generated by Django 3.2 on 2022-11-25 09:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('raw_material', '0001_initial'),
        ('quality', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalcuttest',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalcuttest',
            name='lot',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='raw_material.lot', verbose_name='Lote'),
        ),
        migrations.AddField(
            model_name='historicalanalysispineapple',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalanalysispineapple',
            name='lot',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='raw_material.lot', verbose_name='Lote MP'),
        ),
        migrations.AddField(
            model_name='historicalanalysismango',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalanalysismango',
            name='lot',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='raw_material.lot', verbose_name='Lote MP'),
        ),
        migrations.AddField(
            model_name='historicalanalysisblueberry',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalanalysisblueberry',
            name='lot',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='raw_material.lot', verbose_name='Lote MP'),
        ),
        migrations.AddField(
            model_name='historicalanalysisbanano',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalanalysisbanano',
            name='lot',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='raw_material.lot', verbose_name='Lote MP'),
        ),
        migrations.AddField(
            model_name='historicalanalysisaguaymanto',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalanalysisaguaymanto',
            name='lot',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='raw_material.lot', verbose_name='Lote MP'),
        ),
        migrations.AddField(
            model_name='cuttest',
            name='lot',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='cut_test', to='raw_material.lot', verbose_name='Lote'),
        ),
        migrations.AddField(
            model_name='analysispineapple',
            name='lot',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='analysis_pineapple', to='raw_material.lot', verbose_name='Lote MP'),
        ),
        migrations.AddField(
            model_name='analysismango',
            name='lot',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='analysis_mango', to='raw_material.lot', verbose_name='Lote MP'),
        ),
        migrations.AddField(
            model_name='analysisblueberry',
            name='lot',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='analysis_blueberry', to='raw_material.lot', verbose_name='Lote MP'),
        ),
        migrations.AddField(
            model_name='analysisbanano',
            name='lot',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='analysis_banano', to='raw_material.lot', verbose_name='Lote MP'),
        ),
        migrations.AddField(
            model_name='analysisaguaymanto',
            name='lot',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='analysis_aguaymanto', to='raw_material.lot', verbose_name='Lote MP'),
        ),
    ]
