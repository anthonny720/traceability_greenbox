from rest_framework import serializers

from apps.products.models import PackingProduct


class PackingContainersSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingProduct
        fields = '__all__'
