from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from .api import RegisterView


from blog_service.models import UserDetails



@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserDetails.objects.create(username=instance)
