from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import now
from django.core.validators import MaxValueValidator
import uuid
import os



def path_to_rename(instance, filename):
    new_format = filename.split('.')[-1]
    new_filename = f'{uuid.uuid4()}.{new_format}'
    while os.path.exists(f'images/{new_filename}'):
        new_filename = f'{uuid.uuid4()}.{new_format}'
    return f'images/{new_filename}'

class UserDetails(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to=path_to_rename ,default='images/default.png')
    is_banned = models.BooleanField(default=False)
    user_description = models.TextField(max_length=500,default="",blank=True)
    user_profile_color = models.CharField(max_length=7, default="#000000")

    def __str__(self):
        return f"{self.username}"

class Entry(models.Model):
    author_name = models.ForeignKey(User, on_delete=models.CASCADE)
    blog_entry = models.TextField(max_length=512)
    date_created = models.DateTimeField(default=now)



class EntryStats(models.Model):
    """Model that stores amount of every user"""
    
    entry_date_created = models.DateTimeField(auto_now_add=True)
    entry_author_name = models.ForeignKey(User, on_delete=models.CASCADE)
    entry_amount = models.IntegerField(validators=[
        MaxValueValidator(4096)
    ],
    default=0)

    def __str__(self):
        return f"{self.pk}: {self.entry_author_name}"

