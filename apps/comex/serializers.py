from rest_framework import serializers

from apps.comex.models import Documentation


class DocumentationSerializer(serializers.ModelSerializer):
    docs_url = serializers.CharField(source='get_document', read_only=True)
    full_name= serializers.CharField(source='get_packing_list', read_only=True)
    class Meta:
        model = Documentation
        fields = '__all__'