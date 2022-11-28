# Generated by Django 3.2 on 2022-11-25 09:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
        ('business_partners', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='providermp',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='provider', to='products.fruits', verbose_name='Categoría'),
        ),
    ]