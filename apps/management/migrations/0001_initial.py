# Generated by Django 3.2 on 2022-11-28 12:00

from django.db import migrations, models
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricalKardex',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Fecha')),
                ('input', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=8, null=True, verbose_name='Entrada')),
                ('output', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=8, null=True, verbose_name='Salida')),
                ('stock', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=8, null=True, verbose_name='Stock')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Kardex',
                'verbose_name_plural': 'historical Kardex',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalLocation',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=50, verbose_name='Nombre')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Ubicaci??n',
                'verbose_name_plural': 'historical Ubicaciones',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalMotion',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('date', models.DateField(blank=True, editable=False, verbose_name='Fecha')),
                ('quantity', models.PositiveIntegerField(default=0, verbose_name='Cantidad')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Movimiento de Jaba',
                'verbose_name_plural': 'historical Movimientos de Jaba',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalPayments',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('date', models.DateField(blank=True, editable=False, null=True, verbose_name='Fecha')),
                ('name', models.CharField(blank=True, max_length=100, null=True, verbose_name='Nombre')),
                ('business_name', models.CharField(blank=True, max_length=100, null=True, verbose_name='Raz??n social')),
                ('weight', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Peso neto')),
                ('receipt', models.CharField(blank=True, max_length=12, null=True, verbose_name='Recibo')),
                ('amount', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Monto total')),
                ('status', models.BooleanField(default=False, verbose_name='Estado')),
                ('cancelled', models.DateField(blank=True, null=True, verbose_name='Fecha de pago')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Pagos y Recibos',
                'verbose_name_plural': 'historical Pagos y Recibos',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='Kardex',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Fecha')),
                ('input', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=8, null=True, verbose_name='Entrada')),
                ('output', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=8, null=True, verbose_name='Salida')),
                ('stock', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=8, null=True, verbose_name='Stock')),
            ],
            options={
                'verbose_name': 'Kardex',
                'verbose_name_plural': 'Kardex',
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Nombre')),
            ],
            options={
                'verbose_name': 'Ubicaci??n',
                'verbose_name_plural': 'Ubicaciones',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Motion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True, verbose_name='Fecha')),
                ('quantity', models.PositiveIntegerField(default=0, verbose_name='Cantidad')),
            ],
            options={
                'verbose_name': 'Movimiento de Jaba',
                'verbose_name_plural': 'Movimientos de Jaba',
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='Payments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True, null=True, verbose_name='Fecha')),
                ('name', models.CharField(blank=True, max_length=100, null=True, verbose_name='Nombre')),
                ('business_name', models.CharField(blank=True, max_length=100, null=True, verbose_name='Raz??n social')),
                ('weight', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Peso neto')),
                ('receipt', models.CharField(blank=True, max_length=12, null=True, verbose_name='Recibo')),
                ('amount', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Monto total')),
                ('status', models.BooleanField(default=False, verbose_name='Estado')),
                ('cancelled', models.DateField(blank=True, null=True, verbose_name='Fecha de pago')),
            ],
            options={
                'verbose_name': 'Pagos y Recibos',
                'verbose_name_plural': 'Pagos y Recibos',
                'ordering': ['-receipt'],
            },
        ),
    ]
