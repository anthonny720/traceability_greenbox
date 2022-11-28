from rest_framework import serializers

from apps.production.models import ProcessPineapple, Crown, Peel


class CrownSerializer(serializers.ModelSerializer):
    """Serializer to crown"""
    net_weight = serializers.FloatField(source='get_net_weight', read_only=True)
    tare = serializers.FloatField(source='pallet.weight', read_only=True)
    pallet_name = serializers.CharField(source='get_pallet_name', read_only=True)

    class Meta:
        extra_kwargs = {'process': {'write_only': True}, 'pallet': {'write_only': True}}
        model = Crown
        fields = ('id', 'process', 'weight', 'pallet', 'pallet_name', 'tare', 'net_weight')


class PeelSerializer(serializers.ModelSerializer):
    tare = serializers.FloatField(source='get_tare', read_only=True)
    net_weight = serializers.FloatField(source='get_net_weight', read_only=True)
    pallet_name = serializers.CharField(source='get_pallet_name', read_only=True)

    class Meta:
        extra_kwargs = {'process': {'write_only': True}, 'pallet': {'write_only': True}}
        model = Peel
        fields = ('id', 'process', 'pallet', 'weight', 'pallet_name', 'quantity', 'tare', 'net_weight')


class ProcessListPineappleSerializer(serializers.ModelSerializer):
    summary = serializers.DictField(source='get_summary', read_only=True)
    class Meta:
        model = ProcessPineapple
        extra_kwargs = {'process': {'write_only': True},
                        'juice': {'write_only': True},
                        'discard': {'write_only': True},
                        'start_washed': {'write_only': True},
                        'start_bare': {'write_only': True},
                        'start_chopped': {'write_only': True},
                        'start_loaded': {'write_only': True},
                        'start_cleaning': {'write_only': True},
                        'finish_washed': {'write_only': True},
                        'finish_bare': {'write_only': True},
                        'finish_chopped': {'write_only': True},
                        'finish_loaded': {'write_only': True},
                        'finish_cleaning': {'write_only': True},
                        'people': {'write_only': True},
                        'cars': {'write_only': True},
                        'kg_unpeeled': {'write_only': True},
                        }
        fields = '__all__'


class ProcessDetailPineappleSerializer(serializers.ModelSerializer):
    crown = CrownSerializer(many=True, read_only=True)
    peel = PeelSerializer(many=True, read_only=True)
    summary = serializers.DictField(source='get_summary', read_only=True)
    lot_name = serializers.CharField(source='lot.lot', read_only=True)

    class Meta:
        model = ProcessPineapple
        extra_kwargs = {'process': {'write_only': True},
                        'juice': {'write_only': True},
                        'discard': {'write_only': True},
                        'people': {'write_only': True},
                        'cars': {'write_only': True},
                        'kg_unpeeled': {'write_only': True},
                        }
        fields = '__all__'
