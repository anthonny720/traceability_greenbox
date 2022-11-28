from rest_framework import serializers

from apps.business_partners.models import ProviderMP, Contact, Client, Carrier


class ProviderMPSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProviderMP
        fields = ('id', 'name',
                  'business_name',
                  'ruc',
                  'country',
                  'contact',
                  'email', 'slug', 'stock')


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'name', 'phone', 'dni', 'email', 'licence', 'reference')


class ClientsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'name',
                  'business_name',
                  'ruc',
                  'country',
                  'contact',
                  'email', 'slug')


class ClientsDetailSerializer(serializers.ModelSerializer):
    money = serializers.SerializerMethodField()
    sales = serializers.CharField(source='get_total_sales', read_only=True)

    class Meta:
        model = Client
        fields = '__all__'

    def get_money(self, obj):
        return obj.get_money_display()

    def to_internal_value(self, data):
        return data


class ProviderDetailSerializer(serializers.ModelSerializer):
    money = serializers.SerializerMethodField()
    sales = serializers.CharField(source='get_total_sales', read_only=True)

    class Meta:
        model = ProviderMP
        fields = '__all__'

    def get_money(self, obj):
        return obj.get_money_display()

    def to_internal_value(self, data):
        return data


class CarrierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrier
        fields = '__all__'
