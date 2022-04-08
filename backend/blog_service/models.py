from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import now



# Simple concept of User model.
# Passwords are stored in plain text 



class Entry(models.Model):
    author_name = models.ForeignKey(User, on_delete=models.CASCADE)
    blog_entry = models.TextField(max_length=254)
    date_created = models.DateTimeField(default=now)


   