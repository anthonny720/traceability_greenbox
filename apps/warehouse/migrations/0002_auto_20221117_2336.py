# Generated by Django 3.2 on 2022-11-17 23:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('process_line', '0001_initial'),
        ('warehouse', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PackingListInformation',
            new_name='IPackingList',
        ),
        migrations.RenameModel(
            old_name='ReceptionDetail',
            new_name='IReception',
        ),
    ]
