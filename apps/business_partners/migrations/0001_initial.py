# Generated by Django 3.2 on 2022-11-28 12:00

from django.db import migrations, models
import simple_history.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Carrier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Nombre')),
                ('ruc', models.CharField(blank=True, max_length=11, null=True, verbose_name='RUC')),
                ('code', models.CharField(blank=True, max_length=10, null=True, unique=True, verbose_name='Placa')),
            ],
            options={
                'verbose_name': 'Empresa de Transporte',
                'verbose_name_plural': 'Empresas de Transporte',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='Nombre')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Descripción')),
                ('business_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Razón Social')),
                ('ruc', models.CharField(blank=True, max_length=15, null=True, verbose_name='RUC')),
                ('address', models.CharField(blank=True, max_length=255, null=True, verbose_name='Dirección')),
                ('city', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ciudad')),
                ('country', models.CharField(blank=True, max_length=255, null=True, verbose_name='País')),
                ('zip_code', models.CharField(blank=True, max_length=10, null=True, verbose_name='Código Postal')),
                ('contact', models.CharField(blank=True, max_length=255, null=True, verbose_name='Contacto')),
                ('position', models.CharField(blank=True, max_length=255, null=True, verbose_name='Cargo')),
                ('email', models.EmailField(blank=True, max_length=255, null=True, verbose_name='Correo Electrónico')),
                ('phone', models.CharField(blank=True, max_length=20, null=True, verbose_name='Teléfono')),
                ('payment', models.CharField(blank=True, max_length=255, null=True, verbose_name='Forma de Pago')),
                ('money', models.CharField(choices=[('1', 'USD'), ('2', 'EUR'), ('3', 'SOLES')], default='1', max_length=1, verbose_name='Moneda')),
                ('image', models.URLField(blank=True, max_length=255, null=True, verbose_name='Imagen')),
                ('slug', models.SlugField(blank=True, default=uuid.uuid1, max_length=255, null=True, verbose_name='Slug')),
            ],
            options={
                'verbose_name': 'Cliente Comercial',
                'verbose_name_plural': 'Clientes Comerciales',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Nombre')),
                ('dni', models.IntegerField(blank=True, null=True, verbose_name='DNI')),
                ('email', models.EmailField(blank=True, max_length=50, null=True, verbose_name='Correo Electrónico')),
                ('phone', models.IntegerField(verbose_name='Teléfono')),
                ('licence', models.CharField(blank=True, max_length=9, null=True, verbose_name='Licencia')),
                ('reference', models.CharField(blank=True, max_length=50, null=True, verbose_name='Referencia')),
            ],
            options={
                'verbose_name': 'Contacto',
                'verbose_name_plural': 'Contactos',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='HistoricalCarrier',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Nombre')),
                ('ruc', models.CharField(blank=True, max_length=11, null=True, verbose_name='RUC')),
                ('code', models.CharField(blank=True, db_index=True, max_length=10, null=True, verbose_name='Placa')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Empresa de Transporte',
                'verbose_name_plural': 'historical Empresas de Transporte',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalClient',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=255, verbose_name='Nombre')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Descripción')),
                ('business_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Razón Social')),
                ('ruc', models.CharField(blank=True, max_length=15, null=True, verbose_name='RUC')),
                ('address', models.CharField(blank=True, max_length=255, null=True, verbose_name='Dirección')),
                ('city', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ciudad')),
                ('country', models.CharField(blank=True, max_length=255, null=True, verbose_name='País')),
                ('zip_code', models.CharField(blank=True, max_length=10, null=True, verbose_name='Código Postal')),
                ('contact', models.CharField(blank=True, max_length=255, null=True, verbose_name='Contacto')),
                ('position', models.CharField(blank=True, max_length=255, null=True, verbose_name='Cargo')),
                ('email', models.EmailField(blank=True, max_length=255, null=True, verbose_name='Correo Electrónico')),
                ('phone', models.CharField(blank=True, max_length=20, null=True, verbose_name='Teléfono')),
                ('payment', models.CharField(blank=True, max_length=255, null=True, verbose_name='Forma de Pago')),
                ('money', models.CharField(choices=[('1', 'USD'), ('2', 'EUR'), ('3', 'SOLES')], default='1', max_length=1, verbose_name='Moneda')),
                ('image', models.URLField(blank=True, max_length=255, null=True, verbose_name='Imagen')),
                ('slug', models.SlugField(blank=True, default=uuid.uuid1, max_length=255, null=True, verbose_name='Slug')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Cliente Comercial',
                'verbose_name_plural': 'historical Clientes Comerciales',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalContact',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Nombre')),
                ('dni', models.IntegerField(blank=True, null=True, verbose_name='DNI')),
                ('email', models.EmailField(blank=True, max_length=50, null=True, verbose_name='Correo Electrónico')),
                ('phone', models.IntegerField(verbose_name='Teléfono')),
                ('licence', models.CharField(blank=True, max_length=9, null=True, verbose_name='Licencia')),
                ('reference', models.CharField(blank=True, max_length=50, null=True, verbose_name='Referencia')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Contacto',
                'verbose_name_plural': 'historical Contactos',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalProviderMP',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=255, verbose_name='Nombre')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Descripción')),
                ('business_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Razón Social')),
                ('ruc', models.CharField(blank=True, max_length=15, null=True, verbose_name='RUC')),
                ('address', models.CharField(blank=True, max_length=255, null=True, verbose_name='Dirección')),
                ('city', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ciudad')),
                ('country', models.CharField(blank=True, max_length=255, null=True, verbose_name='País')),
                ('zip_code', models.CharField(blank=True, max_length=10, null=True, verbose_name='Código Postal')),
                ('contact', models.CharField(blank=True, max_length=255, null=True, verbose_name='Contacto')),
                ('position', models.CharField(blank=True, max_length=255, null=True, verbose_name='Cargo')),
                ('email', models.EmailField(blank=True, max_length=255, null=True, verbose_name='Correo Electrónico')),
                ('phone', models.CharField(blank=True, max_length=20, null=True, verbose_name='Teléfono')),
                ('payment', models.CharField(blank=True, max_length=255, null=True, verbose_name='Forma de Pago')),
                ('money', models.CharField(choices=[('1', 'USD'), ('2', 'EUR'), ('3', 'SOLES')], default='1', max_length=1, verbose_name='Moneda')),
                ('image', models.URLField(blank=True, max_length=255, null=True, verbose_name='Imagen')),
                ('slug', models.SlugField(blank=True, default=uuid.uuid1, max_length=255, null=True, verbose_name='Slug')),
                ('code', models.CharField(blank=True, db_index=True, max_length=2, null=True, verbose_name='Código')),
                ('stock', models.PositiveIntegerField(default=0, verbose_name='Stock')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Proveedor Materia Prima',
                'verbose_name_plural': 'historical Proveedores Materia Prima',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalProviderPacking',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=255, verbose_name='Nombre')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Descripción')),
                ('business_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Razón Social')),
                ('ruc', models.CharField(blank=True, max_length=15, null=True, verbose_name='RUC')),
                ('address', models.CharField(blank=True, max_length=255, null=True, verbose_name='Dirección')),
                ('city', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ciudad')),
                ('country', models.CharField(blank=True, max_length=255, null=True, verbose_name='País')),
                ('zip_code', models.CharField(blank=True, max_length=10, null=True, verbose_name='Código Postal')),
                ('contact', models.CharField(blank=True, max_length=255, null=True, verbose_name='Contacto')),
                ('position', models.CharField(blank=True, max_length=255, null=True, verbose_name='Cargo')),
                ('email', models.EmailField(blank=True, max_length=255, null=True, verbose_name='Correo Electrónico')),
                ('phone', models.CharField(blank=True, max_length=20, null=True, verbose_name='Teléfono')),
                ('payment', models.CharField(blank=True, max_length=255, null=True, verbose_name='Forma de Pago')),
                ('money', models.CharField(choices=[('1', 'USD'), ('2', 'EUR'), ('3', 'SOLES')], default='1', max_length=1, verbose_name='Moneda')),
                ('image', models.URLField(blank=True, max_length=255, null=True, verbose_name='Imagen')),
                ('slug', models.SlugField(blank=True, default=uuid.uuid1, max_length=255, null=True, verbose_name='Slug')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Proveedor de Packing',
                'verbose_name_plural': 'historical Proveedores de Packing',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='ProviderMP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='Nombre')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Descripción')),
                ('business_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Razón Social')),
                ('ruc', models.CharField(blank=True, max_length=15, null=True, verbose_name='RUC')),
                ('address', models.CharField(blank=True, max_length=255, null=True, verbose_name='Dirección')),
                ('city', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ciudad')),
                ('country', models.CharField(blank=True, max_length=255, null=True, verbose_name='País')),
                ('zip_code', models.CharField(blank=True, max_length=10, null=True, verbose_name='Código Postal')),
                ('contact', models.CharField(blank=True, max_length=255, null=True, verbose_name='Contacto')),
                ('position', models.CharField(blank=True, max_length=255, null=True, verbose_name='Cargo')),
                ('email', models.EmailField(blank=True, max_length=255, null=True, verbose_name='Correo Electrónico')),
                ('phone', models.CharField(blank=True, max_length=20, null=True, verbose_name='Teléfono')),
                ('payment', models.CharField(blank=True, max_length=255, null=True, verbose_name='Forma de Pago')),
                ('money', models.CharField(choices=[('1', 'USD'), ('2', 'EUR'), ('3', 'SOLES')], default='1', max_length=1, verbose_name='Moneda')),
                ('image', models.URLField(blank=True, max_length=255, null=True, verbose_name='Imagen')),
                ('slug', models.SlugField(blank=True, default=uuid.uuid1, max_length=255, null=True, verbose_name='Slug')),
                ('code', models.CharField(blank=True, max_length=2, null=True, unique=True, verbose_name='Código')),
                ('stock', models.PositiveIntegerField(default=0, verbose_name='Stock')),
            ],
            options={
                'verbose_name': 'Proveedor Materia Prima',
                'verbose_name_plural': 'Proveedores Materia Prima',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='ProviderPacking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='Nombre')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Descripción')),
                ('business_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Razón Social')),
                ('ruc', models.CharField(blank=True, max_length=15, null=True, verbose_name='RUC')),
                ('address', models.CharField(blank=True, max_length=255, null=True, verbose_name='Dirección')),
                ('city', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ciudad')),
                ('country', models.CharField(blank=True, max_length=255, null=True, verbose_name='País')),
                ('zip_code', models.CharField(blank=True, max_length=10, null=True, verbose_name='Código Postal')),
                ('contact', models.CharField(blank=True, max_length=255, null=True, verbose_name='Contacto')),
                ('position', models.CharField(blank=True, max_length=255, null=True, verbose_name='Cargo')),
                ('email', models.EmailField(blank=True, max_length=255, null=True, verbose_name='Correo Electrónico')),
                ('phone', models.CharField(blank=True, max_length=20, null=True, verbose_name='Teléfono')),
                ('payment', models.CharField(blank=True, max_length=255, null=True, verbose_name='Forma de Pago')),
                ('money', models.CharField(choices=[('1', 'USD'), ('2', 'EUR'), ('3', 'SOLES')], default='1', max_length=1, verbose_name='Moneda')),
                ('image', models.URLField(blank=True, max_length=255, null=True, verbose_name='Imagen')),
                ('slug', models.SlugField(blank=True, default=uuid.uuid1, max_length=255, null=True, verbose_name='Slug')),
            ],
            options={
                'verbose_name': 'Proveedor de Packing',
                'verbose_name_plural': 'Proveedores de Packing',
                'ordering': ['-id'],
            },
        ),
    ]
