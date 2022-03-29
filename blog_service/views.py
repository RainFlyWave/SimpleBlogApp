from django.shortcuts import render
from blog_service.models import Entry
from rest_framework import viewsets
from blog_service.serializers import EntrySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class= EntrySerializer



