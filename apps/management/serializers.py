from rest_framework import serializers

from apps.management.models import Payments, Location


class PaymentSerializer(serializers.ModelSerializer):
    lot=serializers.CharField(source='report.lot', read_only=True)
    class Meta:
        model = Payments
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'