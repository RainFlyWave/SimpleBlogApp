from rest_framework import serializers
from blog_service.models import Entry
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class EntrySerializer(serializers.ModelSerializer):
    author_name = UserSerializer(read_only=True)

    class Meta:
        model = Entry
        fields = ['author_name', 'blog_entry', 'date_created']
