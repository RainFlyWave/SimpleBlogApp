from django.apps import AppConfig


class BlogServiceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'blog_service'

    def ready(self):
        from . import signals