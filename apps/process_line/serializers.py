from rest_framework import serializers

from apps.process_line.models import ProcessLineConditioning, ProcessLineTerminated, ProcessLineReleased, TypesCut


class TypeCutSerializer(serializers.ModelSerializer):

    class Meta:
        model = TypesCut
        fields = '__all__'



class ConditioningSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessLineConditioning
        fields = '__all__'


class TerminatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessLineTerminated
        exclude = ('lot',)

class ReleasedSerializer(serializers.ModelSerializer):
    lot = serializers.CharField(source='get_lot_pt', read_only=True)

    class Meta:
        model = ProcessLineReleased
        fields = '__all__'


class ConditioningListSerializer(serializers.ModelSerializer):
    lot = serializers.CharField(source='lot.lot', read_only=True)
    lot_id = serializers.CharField(source='lot.id', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    year = serializers.CharField(source='get_year', read_only=True)

    class Meta:
        model = ProcessLineConditioning
        fields = (
            'id', 'week', 'month', 'year', 'process_date', 'lot', 'chlorine', 'disinfection', 'brix', 'ph', 'width',
            'aspect', 'oven', 'h1',
            'h2',
            'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13', 'h14', 'h15', 'h16', 'h17', 'h18',
            'h19',
            'h20', 'h21', 'h22', 'h23', 'h24', 'lot_id')


class TerminatedListSerializer(serializers.ModelSerializer):
    process_date = serializers.DateField(source='process.process_date', read_only=True)
    process_id = serializers.CharField(source='process.id', read_only=True)
    type_id = serializers.CharField(source='type_cut.id', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    year = serializers.CharField(source='get_year', read_only=True)
    lot_mp = serializers.CharField(source='get_lot_mp', read_only=True)

    class Meta:
        model = ProcessLineTerminated
        fields = (
            'id', 'week', 'month', 'year', 'process_date', 'packing_date', 'lot', 'brix_pt', 'ph_pt', 'humidity',
            'aroma', 'color', 'flavor',
            'texture', 'width_pt', 'defects', 'quantity', 'lot_mp', 'process_id', 'type_id')


class LiberatedReceptionListSerializer(serializers.ModelSerializer):
    summary=serializers.CharField(source='get_summary', read_only=True)
    class Meta:
        model = ProcessLineReleased
        fields = ('id', 'summary',)

class LiberatedListSerializer(serializers.ModelSerializer):
    observations = serializers.SerializerMethodField()
    packing_date = serializers.DateField(source='process.packing_date', read_only=True)
    lot_boxes = serializers.CharField(source='lot_boxes.lot', read_only=True)
    lot_bags = serializers.CharField(source='lot_bags.lot', read_only=True)
    client = serializers.CharField(source='client.name', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    year = serializers.CharField(source='get_year', read_only=True)
    lot_mp = serializers.CharField(source='get_lot_mp', read_only=True)
    lot = serializers.CharField(source='get_lot_pt', read_only=True)
    process_id = serializers.CharField(source='process.id', read_only=True)
    lot_boxes_id = serializers.CharField(source='lot_boxes.id', read_only=True)
    lot_bags_id = serializers.CharField(source='lot_bags.id', read_only=True)
    client_id = serializers.CharField(source='client.id', read_only=True)

    class Meta:
        model = ProcessLineReleased
        fields = (
            'id', 'week', 'month', 'year', 'packing_date', 'release_date', 'lot', 'quantity', 'client',
            'expiration_date', 'lot_boxes',
            'lot_bags',
            'observations', 'lot_mp', 'process_id',
            'lot_boxes_id',
            'lot_bags_id',
            'client_id')

    def get_observations(self, obj):
        return obj.get_observations_display()

    def to_internal_value(self, data):
        return data


class LiberatedSalesSerializer(serializers.ModelSerializer):
    observations = serializers.SerializerMethodField()
    lot_mp = serializers.CharField(source='get_lot_mp', read_only=True)
    lot_pt = serializers.CharField(source='get_lot_pt', read_only=True)
    lot=serializers.CharField(source='get_lot_pt', read_only=True)

    class Meta:
        model = ProcessLineReleased
        fields = ('lot_mp','lot_pt',
            'release_date', 'quantity',
            'expiration_date',
            'observations','lot')

    def get_observations(self, obj):
        return obj.get_observations_display()

    def to_internal_value(self, data):
        return data
