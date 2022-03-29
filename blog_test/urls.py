
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from blog_service.views import EntryViewSet


router = routers.SimpleRouter()
router.register(r'entry', EntryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
