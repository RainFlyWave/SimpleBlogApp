from rest_framework import serializers
from blog_service.models import Entry
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username',]

class EntrySerializer(serializers.ModelSerializer):
    author_name = UserSerializer(read_only=True)

    class Meta:
        model = Entry
        fields = ['author_name', 'blog_entry', 'date_created']

