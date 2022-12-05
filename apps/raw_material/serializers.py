from rest_framework import serializers

from apps.raw_material.models import Lot, ILot


class SalesSerializer(serializers.ModelSerializer):
    net_weight = serializers.DecimalField(source='get_total_net_weight', read_only=True, max_digits=10,
                                          decimal_places=2)

    class Meta:
        model = Lot
        fields = ('lot', 'entryDate', 'condition', 'origin', 'parcel', 'net_weight')


class LotListSerializer(serializers.ModelSerializer):
    business_maquila = serializers.CharField(source='maquila.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    stock = serializers.CharField(source='get_stock', read_only=True)
    net_weight = serializers.CharField(source='get_total_net_weight', read_only=True)

    class Meta:
        model = Lot
        fields = (
            'id', 'downloadDate', 'category_name', 'lot', 'condition', 'variety', 'stock', 'net_weight',
            'business_maquila')


class LotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lot
        fields = '__all__'


class LotDetailSerializer(serializers.ModelSerializer):
    document = serializers.CharField(source='get_document', read_only=True)
    amount_guide_kg = serializers.CharField(source='get_total_amount_guide_kg', read_only=True)
    amount_net_kg = serializers.CharField(source='get_total_amount_net_kg', read_only=True)
    discount_guide_kg = serializers.CharField(source='get_discount_guide_kg', read_only=True)
    discount_net_kg = serializers.CharField(source='get_discount_net_kg', read_only=True)
    category_name = serializers.CharField(source='get_category_name', read_only=True)
    provider_name = serializers.CharField(source='get_provider_name', read_only=True)
    calibers = serializers.DictField(source='get_c', read_only=True)
    weight_pallets = serializers.CharField(source='get_weight_pallets', read_only=True)
    weight_boxes = serializers.CharField(source='get_weight_boxes', read_only=True)
    pallets = serializers.DictField(source='get_pallet', read_only=True)
    boxes = serializers.DictField(source='get_box', read_only=True)
    avg_brute = serializers.CharField(source='get_avg_brute', read_only=True)
    avg_net = serializers.CharField(source='get_avg_net', read_only=True)
    quantity_boxes = serializers.CharField(source='get_quantity_boxes', read_only=True)
    final_weight = serializers.CharField(source='get_total_final_weight', read_only=True)
    total_tare = serializers.CharField(source='get_total_tare', read_only=True)
    net_weight = serializers.CharField(source='get_total_net_weight', read_only=True)
    net_final_weight = serializers.CharField(source='get_total_net_final_weight', read_only=True)
    decrease = serializers.CharField(source='get_decrease', read_only=True)
    total_indicted = serializers.CharField(source='get_total_indicted', read_only=True)
    stock = serializers.CharField(source='get_stock', read_only=True)
    brute_weight = serializers.CharField(source='get_total_brute_weight', read_only=True)
    business_maquila = serializers.CharField(source='maquila.name', read_only=True)

    class Meta:
        model = Lot
        fields = '__all__'


class ILotSerializer(serializers.ModelSerializer):
    net_weight = serializers.CharField(source='get_net_weight', read_only=True)
    net_final_weight = serializers.CharField(source='get_net_final_weight', read_only=True)
    pallet_name = serializers.CharField(source='get_pallet', read_only=True)
    boxes = serializers.CharField(source='get_quantity_boxes', read_only=True)
    indicted_type = serializers.CharField(source='get_indicted', read_only=True)
    location_name = serializers.CharField(source='location.name', read_only=True)

    class Meta:
        model = ILot
        fields = (
            'number', 'indicted_type', 'dateIndicted', 'location_name', 'weight', 'net_weight', 'tare', 'final_weight',
            'net_final_weight', 'gb', 'pa', 'co', 't0', 't1', 't2', 'gn', 'ma', 'c6', 'c8', 'c10', 'c12', 'c14'
            , 'pallet_name', 'boxes', 'pallet', 'id', 'indicted', 'location',
        )


class ILotCRUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = ILot
        fields = '__all__'


class DataLocationSerializer(serializers.ModelSerializer):
    boxes = serializers.CharField(source='get_quantity_boxes', read_only=True)
    net_weight = serializers.CharField(source='get_net_weight', read_only=True)
    lot = serializers.CharField(source='lot.lot', read_only=True)
    category = serializers.CharField(source='lot.get_category_name', read_only=True)

    class Meta:
        model = ILot
        fields = ('number', 'weight', 'net_weight', 'boxes', 'category', 'lot')
