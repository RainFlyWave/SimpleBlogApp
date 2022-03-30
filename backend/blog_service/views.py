from django.shortcuts import render
from blog_service.models import Entry
from rest_framework import viewsets
from blog_service.serializers import EntrySerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


class EntryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class= EntrySerializer
    queryset = Entry.objects.all()


  

