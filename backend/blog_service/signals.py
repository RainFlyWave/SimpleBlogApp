from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        # Profile.objects.create(user=instance)
        print("create")

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
        # instance.profile.save()
        print("Save")

@receiver(post_save, sender=User)
def defekacja(sender, instance, **kwargs):
        # instance.profile.save()
        print("dokonano aktu defekacji")