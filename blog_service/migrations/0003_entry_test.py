# Generated by Django 4.0.2 on 2022-03-28 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_service', '0002_remove_entry_test'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='test',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
