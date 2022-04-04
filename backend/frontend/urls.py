from .views import index
from django.urls import path





urlpatterns = [
    path('', index),
    path('login/', index),
    path('logout/', index),



]
