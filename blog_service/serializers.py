from blog_service.models import Entry
from rest_framework import serializers

class EntrySerializer(serializers.Serializer):
    class Meta:
        model = Entry
        fields = ['author', 'blog_entry', 'date_created']
   