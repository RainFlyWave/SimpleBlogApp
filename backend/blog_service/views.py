from django.shortcuts import render
from blog_service.models import Entry
from rest_framework import viewsets
from blog_service.serializers import EntrySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
import jwt
import os
from django.contrib.auth.models import User


class EntryViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    serializer_class= EntrySerializer

    def get_queryset(self):
        token = self.request.COOKIES.get('token')
        if 'token' not in self.request.COOKIES.keys():
            raise AuthenticationFailed('Unauthenticated access')
       
        
        try:
            payload = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated access')
        
        # author_object =  User.objects.get(id=payload['id'])
        return Entry.objects.filter(author_name__pk=payload['id'])


  

