from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now


class Entry(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    blog_entry = models.TextField()
    date_created = models.DateTimeField(default=now)


   