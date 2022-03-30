from blog_service.api import RegisterView, LoginView, UserView, LogoutView
from django.urls import path, include
from rest_framework import routers
from blog_service.views import EntryViewSet

router = routers.DefaultRouter()
router.register(r'entry', EntryViewSet)


urlpatterns = [

    path('', include(router.urls)),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
]
