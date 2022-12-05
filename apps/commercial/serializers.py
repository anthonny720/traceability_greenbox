from rest_framework import serializers

from apps.commercial.models import Product, Provider, Packing, Presentation, Client, Variety, Cut, Condition, Type, \
    Group, Family, Lot


class ProductSerializer(serializers.ModelSerializer):
    stock = serializers.DictField(source='get_stock', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'


class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = '__all__'


class CutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cut
        fields = '__all__'


class VarietySerializer(serializers.ModelSerializer):
    class Meta:
        model = Variety
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class PresentationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Presentation
        fields = '__all__'


class PackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Packing
        fields = '__all__'


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = '__all__'


class LotSerializer(serializers.ModelSerializer):
    family_name = serializers.CharField(source='family.name', read_only=True)
    group_name = serializers.CharField(source='group.name', read_only=True)
    type_inf_name = serializers.CharField(source='type_inf.name', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    cut_name = serializers.CharField(source='cut.name', read_only=True)
    variety_name = serializers.CharField(source='variety.name', read_only=True)
    client_name = serializers.CharField(source='client.name', read_only=True)
    presentation_name = serializers.CharField(source='presentation.name', read_only=True)
    packaging_name = serializers.CharField(source='packaging.name', read_only=True)
    packing_name = serializers.CharField(source='packing.name', read_only=True)
    provider_name = serializers.CharField(source='provider.name', read_only=True)
    condition_name = serializers.CharField(source='condition.name', read_only=True)

    class Meta:
        model = Lot
        fields = '__all__'
