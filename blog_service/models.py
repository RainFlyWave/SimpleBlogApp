from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now



class AllUsers(models.Model):
    username = models.CharField(max_length=36)
    user_email = models.EmailField(max_length=254)
    # Had to stop my work there
    # sorreh ugh

class Entry(models.Model):
    author = models.ForeignKey(AllUsers, on_delete=models.CASCADE)
    blog_entry = models.TextField()
    date_created = models.DateTimeField(default=now)


   