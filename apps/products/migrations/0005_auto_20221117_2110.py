# Generated by Django 3.2 on 2022-11-17 21:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_auto_20221117_2048'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='fruits',
            options={'verbose_name': 'Frutas', 'verbose_name_plural': 'Frutas'},
        ),
        migrations.AlterModelOptions(
            name='packingproduct',
            options={'ordering': ['-entry_date'], 'verbose_name': 'Envase/Embalaje', 'verbose_name_plural': 'Envases/Embalajes'},
        ),
    ]
