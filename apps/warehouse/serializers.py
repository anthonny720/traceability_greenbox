from rest_framework import serializers

from apps.warehouse.models import LotPT, Reception, IReception


class LotSerializer(serializers.ModelSerializer):
    class Meta:
        model = LotPT
        fields = '__all__'


class ReceptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reception
        fields = '__all__'


class IReceptionSerializer(serializers.ModelSerializer):
    full_clients = serializers.CharField(source='full_clients', read_only=True)
    full_name = serializers.CharField(source='full_name', read_only=True)
    type = serializers.SerializerMethodField()
    method = serializers.SerializerMethodField()

    class Meta:
        model = IReception
        fields = '__all__'
        exclude = ('client',)

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
    lot = serializers.CharField(source='lot.get_summary', read_only=True)

    class Meta:
        model = Reception
        fields = '__all__'
        exclude = ('program',)


class PackingList(serializers.ModelSerializer):
    class Meta:
        model = Reception
        fields = '__all__'


class IPackingList(serializers.ModelSerializer):
    reception = serializers.CharField(source='full_name', read_only=True)
    box = serializers.CharField(source='get_total_box', read_only=True)
    bag = serializers.CharField(source='get_total_bags', read_only=True)
    weight = serializers.CharField(source='get_total_weight', read_only=True)

    class Meta:
        model = Reception
        fields = '__all__'


class PackingListDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reception
        fields = '__all__'


class IPackingListDetailSerializer(serializers.ModelSerializer):
    bags = serializers.CharField(source='total_bags', read_only=True)
    weight = serializers.CharField(source='total_weight', read_only=True)
    lot = LotSerializer(many=True, read_only=True)
    class Meta:
        model = Reception
        fields = '__all__'
        exclude = ('packing_list',)
