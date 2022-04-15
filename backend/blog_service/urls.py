from blog_service.api import RegisterView, LoginView, UserView, LogoutView, EntriesView,UserDescriptionView, CreateEntryView, DeleteEntryView, EditEntryView, UploadPhotoView
from django.urls import path, include
from rest_framework import routers
from blog_service.views import EntryViewSet

router = routers.DefaultRouter()
router.register(r'entry', EntryViewSet, basename="entries")



urlpatterns = [

    path('', include(router.urls)),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('entries/',EntriesView.as_view()),
    path('create/',CreateEntryView.as_view()),
    path('delete/',DeleteEntryView.as_view()),
    path('edit/',EditEntryView.as_view()),
    path('upload/', UploadPhotoView.as_view()),
    path('description/', UserDescriptionView.as_view()),


]
