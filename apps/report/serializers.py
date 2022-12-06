from rest_framework import serializers

from apps.report.models import Report


class ReportSerializer(serializers.ModelSerializer):
    avg_box=serializers.CharField(source='get_avg_box',read_only=True)
    provider = serializers.CharField(source='get_provider', read_only=True)
    lot = serializers.CharField(source='get_lot', read_only=True)
    provider_guide = serializers.CharField(source='get_provider_guide', read_only=True)
    carrier_guide = serializers.CharField(source='get_carrier_guide', read_only=True)
    entry_date = serializers.CharField(source='get_entry_date', read_only=True)
    download_date = serializers.CharField(source='get_download_date', read_only=True)
    year = serializers.CharField(source='get_year', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)
    total_amount = serializers.CharField(source='get_total_amount', read_only=True)
    price_plant = serializers.CharField(source='get_price_plant', read_only=True)
    brute_weight = serializers.CharField(source='get_brute_weight', read_only=True)
    origin = serializers.CharField(source='get_origin', read_only=True)
    parcel = serializers.CharField(source='get_parcel', read_only=True)
    number_boxes = serializers.CharField(source='get_quantity_boxes', read_only=True)
    net_weight = serializers.CharField(source='get_net_weight', read_only=True)
    discount_soles = serializers.CharField(source='get_discount_soles', read_only=True)
    kg_usable = serializers.CharField(source='get_kg_usable', read_only=True)
    kg_discounted = serializers.CharField(source='get_kg_discounted', read_only=True)
    net_difference = serializers.CharField(source='get_net_difference', read_only=True)
    tare = serializers.CharField(source='get_tare', read_only=True)
    weight_guide = serializers.CharField(source='get_weight_guide', read_only=True)
    condition = serializers.CharField(source='get_condition', read_only=True)
    variety = serializers.CharField(source='get_variety', read_only=True)
    departure_time = serializers.CharField(source='get_departure_time', read_only=True)
    arrival_time = serializers.CharField(source='get_arrival_time', read_only=True)
    discount_percentage = serializers.CharField(source='get_discount_percentage', read_only=True)
    driver = serializers.CharField(source='lot.get_driver', read_only=True)
    carrier = serializers.CharField(source='lot.get_carrier', read_only=True)
    code = serializers.CharField(source='lot.get_carrier_code', read_only=True)

    class Meta:
        model = Report
        fields = '__all__'
