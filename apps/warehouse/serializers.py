from rest_framework import serializers

from apps.warehouse.models import LotPT, Reception, IReception, PackingList, IPackingList


class LotSerializer(serializers.ModelSerializer):
    class Meta:
        model = LotPT
        fields = '__all__'


class ReceptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reception
        fields = '__all__'


class IReceptionSerializer(serializers.ModelSerializer):
    clients = serializers.CharField(source='full_clients', read_only=True)
    name = serializers.CharField(source='full_name', read_only=True)
    type = serializers.SerializerMethodField()
    method = serializers.SerializerMethodField()

    class Meta:
        model = Reception
        fields = ('id','type', 'method', 'slug', 'date', 'number', 'denomination', 'name', 'clients')

    def get_type(self, obj):
        return obj.get_type_display()

    def get_method(self, obj):
        return obj.get_method_display()

    def to_internal_value(self, data):
        return data


class ReceptionDetail(serializers.ModelSerializer):
    class Meta:
        model = IReception
        fields = '__all__'


class IReceptionDetailSerializer(serializers.ModelSerializer):
    release_date = serializers.CharField(source='lot.release_date', read_only=True)
    expiration_date = serializers.CharField(source='lot.expiration_date', read_only=True)
    lot = serializers.CharField(source='lot.get_lot_pt', read_only=True)
    quantity = serializers.CharField(source='lot.quantity', read_only=True)
    description = serializers.CharField(source='lot.get_description', read_only=True)

    class Meta:
        model = IReception
        exclude = ('program',)


class PackingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingList
        fields = '__all__'


class IPackingListSerializer(serializers.ModelSerializer):
    reception = serializers.CharField(source='full_name', read_only=True)
    box = serializers.CharField(source='get_total_box', read_only=True)
    bag = serializers.CharField(source='get_total_bags', read_only=True)
    weight = serializers.CharField(source='get_total_weight', read_only=True)
    doc = serializers.CharField(source='get_docs', read_only=True)

    class Meta:
        model = PackingList
        fields = '__all__'


class PackingListDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPackingList
        fields = '__all__'


class IPackingListDetailSerializer(serializers.ModelSerializer):
    bags_total = serializers.CharField(source='total_bags', read_only=True)
    weight_total = serializers.CharField(source='total_weight', read_only=True)
    lot = serializers.CharField(source='lot.lot', read_only=True)
    description = serializers.CharField(source='lot.description', read_only=True)
    expiration_date = serializers.CharField(source='lot.expirationDate', read_only=True)


    class Meta:
        model = IPackingList
        exclude = ('packing_list',)
