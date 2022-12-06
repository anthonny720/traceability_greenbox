# Generated by Django 3.2 on 2022-11-28 12:00

from django.db import migrations, models
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Crown',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField(verbose_name='Peso')),
            ],
            options={
                'verbose_name': 'Registro de Piña - Corona',
                'verbose_name_plural': 'Registro de Piña - Corona',
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='HistoricalCrown',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('weight', models.FloatField(verbose_name='Peso')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Registro de Piña - Corona',
                'verbose_name_plural': 'historical Registro de Piña - Corona',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalPeel',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('weight', models.DecimalField(decimal_places=1, max_digits=4, verbose_name='Peso')),
                ('quantity', models.PositiveSmallIntegerField(default=0, verbose_name='Cantidad')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Registro de Piña - Cáscara',
                'verbose_name_plural': 'historical Registro de Piña - Cáscara',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalProcessPineapple',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Fecha de Proceso')),
                ('slug', models.SlugField(blank=True, max_length=100, null=True)),
                ('juice', models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=4, null=True, verbose_name='Jugo')),
                ('discard', models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=4, null=True, verbose_name='Descarte')),
                ('start_washed', models.TimeField(blank=True, null=True, verbose_name='Inicio de lavado')),
                ('start_bare', models.TimeField(blank=True, null=True, verbose_name='Inicio de pelado')),
                ('start_chopped', models.TimeField(blank=True, null=True, verbose_name='Inicio de picado')),
                ('start_loaded', models.TimeField(blank=True, null=True, verbose_name='Inicio de cargado')),
                ('start_cleaning', models.TimeField(blank=True, null=True, verbose_name='Inicio de limpieza')),
                ('finish_washed', models.TimeField(blank=True, null=True, verbose_name='Fin de lavado')),
                ('finish_bare', models.TimeField(blank=True, null=True, verbose_name='Fin de pelado')),
                ('finish_chopped', models.TimeField(blank=True, null=True, verbose_name='Fin de picado')),
                ('finish_loaded', models.TimeField(blank=True, null=True, verbose_name='Fin de cargado')),
                ('finish_cleaning', models.TimeField(blank=True, null=True, verbose_name='Fin de limpieza ')),
                ('people', models.PositiveSmallIntegerField(blank=True, default=0, null=True, verbose_name='Personas')),
                ('kg_unpeeled', models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=4, null=True, verbose_name='Kg sin pelar')),
                ('cars', models.PositiveSmallIntegerField(blank=True, default=1, null=True, verbose_name='Cantidad de Coches')),
                ('status', models.BooleanField(default=False, verbose_name='Cerrado/Abierto')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical Proceso de Piña',
                'verbose_name_plural': 'historical Procesos de Piña',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='Peel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.DecimalField(decimal_places=1, max_digits=4, verbose_name='Peso')),
                ('quantity', models.PositiveSmallIntegerField(default=0, verbose_name='Cantidad')),
            ],
            options={
                'verbose_name': 'Registro de Piña - Cáscara',
                'verbose_name_plural': 'Registro de Piña - Cáscara',
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='ProcessPineapple',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Fecha de Proceso')),
                ('slug', models.SlugField(blank=True, max_length=100, null=True, unique=True)),
                ('juice', models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=4, null=True, verbose_name='Jugo')),
                ('discard', models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=4, null=True, verbose_name='Descarte')),
                ('start_washed', models.TimeField(blank=True, null=True, verbose_name='Inicio de lavado')),
                ('start_bare', models.TimeField(blank=True, null=True, verbose_name='Inicio de pelado')),
                ('start_chopped', models.TimeField(blank=True, null=True, verbose_name='Inicio de picado')),
                ('start_loaded', models.TimeField(blank=True, null=True, verbose_name='Inicio de cargado')),
                ('start_cleaning', models.TimeField(blank=True, null=True, verbose_name='Inicio de limpieza')),
                ('finish_washed', models.TimeField(blank=True, null=True, verbose_name='Fin de lavado')),
                ('finish_bare', models.TimeField(blank=True, null=True, verbose_name='Fin de pelado')),
                ('finish_chopped', models.TimeField(blank=True, null=True, verbose_name='Fin de picado')),
                ('finish_loaded', models.TimeField(blank=True, null=True, verbose_name='Fin de cargado')),
                ('finish_cleaning', models.TimeField(blank=True, null=True, verbose_name='Fin de limpieza ')),
                ('people', models.PositiveSmallIntegerField(blank=True, default=0, null=True, verbose_name='Personas')),
                ('kg_unpeeled', models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=4, null=True, verbose_name='Kg sin pelar')),
                ('cars', models.PositiveSmallIntegerField(blank=True, default=1, null=True, verbose_name='Cantidad de Coches')),
                ('status', models.BooleanField(default=False, verbose_name='Cerrado/Abierto')),
            ],
            options={
                'verbose_name': 'Proceso de Piña',
                'verbose_name_plural': 'Procesos de Piña',
                'ordering': ('-date',),
            },
        ),
    ]