# Generated by Django 4.0.3 on 2022-04-15 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_service', '0012_alter_userdetails_profile_pic'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetails',
            name='user_description',
            field=models.TextField(default=2, max_length=500),
            preserve_default=False,
        ),
    ]