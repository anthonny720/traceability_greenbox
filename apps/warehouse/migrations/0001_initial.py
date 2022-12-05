# Generated by Django 3.2 on 2022-11-28 12:00

import apps.warehouse.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('process_line', '0003_processlineconditioning_lot'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('business_partners', '0002_providermp_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reception',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('method', models.CharField(choices=[('PEPS', 'PEPS'), ('UEPS', 'UEPS')], default='PEPS', max_length=4, verbose_name='Método')),
                ('type', models.CharField(choices=[('FCL', 'FCL'), ('LCL', 'LCL')], default='FCL', max_length=3, verbose_name='Tipo')),
                ('date', models.DateField(verbose_name='Fecha')),
                ('number', models.PositiveSmallIntegerField(verbose_name='Número')),
                ('denomination', models.CharField(blank=True, default=' ', max_length=50, verbose_name='Denominación')),
                ('slug', models.SlugField(blank=True, default=uuid.uuid4, max_length=255, null=True)),
                ('client', models.ManyToManyField(related_name='receptions', to='business_partners.Client', verbose_name='Cliente')),
            ],
            options={
                'verbose_name': 'Programa de recepción',
                'verbose_name_plural': 'Programas de recepción',
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='PackingList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.BooleanField(default=False, verbose_name='Estado')),
                ('date', models.DateField(blank=True, null=True, verbose_name='Programa de despacho')),
                ('destine', models.CharField(blank=True, max_length=50, null=True, verbose_name='Destino')),
                ('guide', models.CharField(blank=True, max_length=10, null=True, verbose_name='Guía de remisión')),
                ('order', models.CharField(blank=True, max_length=12, null=True, verbose_name='Orden de Pedido')),
                ('docs', models.FileField(blank=True, null=True, upload_to=apps.warehouse.models.custom_doc_file_path, verbose_name='Documentación')),
                ('slug', models.SlugField(blank=True, default=uuid.uuid4, max_length=255, null=True)),
                ('reception', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='packing_list', to='warehouse.reception', verbose_name='Recepción')),
            ],
            options={
                'verbose_name': 'Packing List',
                'verbose_name_plural': 'Packing List',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='LotPT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lot', models.CharField(max_length=50)),
                ('quantity', models.PositiveSmallIntegerField(default=0)),
                ('stock', models.PositiveSmallIntegerField(default=0)),
                ('expirationDate', models.DateField(blank=True, null=True, verbose_name='Fecha de Vencimiento')),
                ('description', models.CharField(blank=True, max_length=50, null=True)),
                ('container', models.CharField(blank=True, default='', max_length=50, null=True)),
            ],
            options={
                'verbose_name': 'Lote',
                'verbose_name_plural': 'Lote',
                'ordering': ['-id'],
                'unique_together': {('lot', 'container')},
            },
        ),
        migrations.CreateModel(
            name='IReception',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Fecha de recepción')),
                ('lot', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='receptions', to='process_line.processlinereleased')),
                ('program', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='reception_details', to='warehouse.reception', verbose_name='Programa')),
            ],
            options={
                'verbose_name': 'Datos de recepción',
                'verbose_name_plural': 'Datos de recepción',
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='IPackingList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveSmallIntegerField(default=0, verbose_name='Número')),
                ('boxes', models.PositiveSmallIntegerField(default=0, verbose_name='Cantidad')),
                ('bags', models.PositiveSmallIntegerField(default=0, verbose_name='Bolsas')),
                ('weight', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Peso')),
                ('lot', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='packing_list_information', to='warehouse.lotpt', verbose_name='Lote')),
                ('packing_list', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='packing_list_information', to='warehouse.packinglist', verbose_name='Packing List')),
            ],
            options={
                'verbose_name': 'Información de Packing List',
                'verbose_name_plural': 'Información de Packing List',
                'ordering': ['number'],
            },
        ),
        migrations.CreateModel(
            name='HistoricalReception',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('method', models.CharField(choices=[('PEPS', 'PEPS'), ('UEPS', 'UEPS')], default='PEPS', max_length=4, verbose_name='Método')),
                ('type', models.CharField(choices=[('FCL', 'FCL'), ('LCL', 'LCL')], default='FCL', max_length=3, verbose_name='Tipo')),
                ('date', models.DateField(verbose_name='Fecha')),
                ('number', models.PositiveSmallIntegerField(verbose_name='Número')),
                ('denomination', models.CharField(blank=True, default=' ', max_length=50, verbose_name='Denominación')),
                ('slug', models.SlugField(blank=True, default=uuid.uuid4, max_length=255, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical Programa de recepción',
                'verbose_name_plural': 'historical Programas de recepción',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalPackingList',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('status', models.BooleanField(default=False, verbose_name='Estado')),
                ('date', models.DateField(blank=True, null=True, verbose_name='Programa de despacho')),
                ('destine', models.CharField(blank=True, max_length=50, null=True, verbose_name='Destino')),
                ('guide', models.CharField(blank=True, max_length=10, null=True, verbose_name='Guía de remisión')),
                ('order', models.CharField(blank=True, max_length=12, null=True, verbose_name='Orden de Pedido')),
                ('docs', models.TextField(blank=True, max_length=100, null=True, verbose_name='Documentación')),
                ('slug', models.SlugField(blank=True, default=uuid.uuid4, max_length=255, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('reception', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='warehouse.reception', verbose_name='Recepción')),
            ],
            options={
                'verbose_name': 'historical Packing List',
                'verbose_name_plural': 'historical Packing List',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalLotPT',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('lot', models.CharField(max_length=50)),
                ('quantity', models.PositiveSmallIntegerField(default=0)),
                ('stock', models.PositiveSmallIntegerField(default=0)),
                ('expirationDate', models.DateField(blank=True, null=True, verbose_name='Fecha de Vencimiento')),
                ('description', models.CharField(blank=True, max_length=50, null=True)),
                ('container', models.CharField(blank=True, default='', max_length=50, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical Lote',
                'verbose_name_plural': 'historical Lote',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalIReception',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Fecha de recepción')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='process_line.processlinereleased')),
                ('program', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='warehouse.reception', verbose_name='Programa')),
            ],
            options={
                'verbose_name': 'historical Datos de recepción',
                'verbose_name_plural': 'historical Datos de recepción',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalIPackingList',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('number', models.PositiveSmallIntegerField(default=0, verbose_name='Número')),
                ('boxes', models.PositiveSmallIntegerField(default=0, verbose_name='Cantidad')),
                ('bags', models.PositiveSmallIntegerField(default=0, verbose_name='Bolsas')),
                ('weight', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Peso')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='warehouse.lotpt', verbose_name='Lote')),
                ('packing_list', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='warehouse.packinglist', verbose_name='Packing List')),
            ],
            options={
                'verbose_name': 'historical Información de Packing List',
                'verbose_name_plural': 'historical Información de Packing List',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]
