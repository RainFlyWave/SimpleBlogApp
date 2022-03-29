
from django.db import models
from django.utils.timezone import now



# Simple concept of User model.
# Passwords are stored in plain text 

class AllUsers(models.Model):
    user_name = models.CharField(max_length=36)
    user_password = models.CharField(max_length=64)
    user_mail = models.EmailField(max_length=254)
    date_created = models.DateTimeField(default=now)

    def __str__(self):
        return f'{self.pk} -> {self.user_name}'

class Entry(models.Model):
    author = models.ForeignKey(AllUsers, on_delete=models.CASCADE)
    blog_entry = models.TextField()
    date_created = models.DateTimeField(default=now)


   