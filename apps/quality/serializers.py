from rest_framework import serializers

from apps.quality.models import AnalysisPineapple, CutTest, AnalysisBanano, AnalysisBlueberry, AnalysisMango, \
    AnalysisAguaymanto


class CutTestSerializer(serializers.ModelSerializer):
    lot_name = serializers.CharField(source='lot.lot', read_only=True)
    percentage_cut_fresh_1_8 = serializers.CharField(source='get_percentage_cut_fresh_1_8', read_only=True)
    percentage_cut_1_8 = serializers.CharField(source='get_percentage_cut_1_8', read_only=True)
    total_weight = serializers.CharField(source='get_total_weight', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    year = serializers.CharField(source='get_year', read_only=True)

    class Meta:
        model = CutTest
        fields = '__all__'


# Serializador para el modelo de análisis de piña
class AnalysisPineappleSerializer(serializers.ModelSerializer):
    boxes = serializers.CharField(source='lot.get_quantity_boxes', read_only=True)
    calibers = serializers.DictField(source='lot.get_calibers_percentage', read_only=True)
    net_weight = serializers.CharField(source='lot.get_total_final_weight', read_only=True)
    lot_name = serializers.CharField(source='get_lot', read_only=True)
    maturation_total = serializers.CharField(source='get_maturation_total', read_only=True)

    class Meta:
        model = AnalysisPineapple
        fields = '__all__'


# Serializador para el modelo de análisis de banano
class AnalysisBananoSerializer(serializers.ModelSerializer):
    boxes = serializers.CharField(source='lot.get_quantity_boxes', read_only=True)
    net_weight = serializers.CharField(source='lot.get_total_final_weight', read_only=True)
    lot_name = serializers.CharField(source='get_lot', read_only=True)
    maturation_1_kg = serializers.CharField(source='get_kg_maturation_1', read_only=True)
    maturation_2_kg = serializers.CharField(source='get_kg_maturation_2', read_only=True)
    maturation_total = serializers.CharField(source='get_maturation_total', read_only=True)

    class Meta:
        model = AnalysisBanano
        fields = '__all__'


# Serializador para el modelo de análisis de banano
class AnalysisBlueberrySerializer(serializers.ModelSerializer):
    boxes = serializers.CharField(source='lot.get_quantity_boxes', read_only=True)
    lot_name = serializers.CharField(source='get_lot', read_only=True)
    net_weight = serializers.CharField(source='lot.get_total_final_weight', read_only=True)

    class Meta:
        model = AnalysisBlueberry
        fields = '__all__'


# Serializador para el modelo de análisis de mango
class AnalysisMangoSerializer(serializers.ModelSerializer):
    boxes = serializers.CharField(source='lot.get_quantity_boxes', read_only=True)
    lot_name = serializers.CharField(source='get_lot', read_only=True)
    net_weight = serializers.CharField(source='lot.get_total_final_weight', read_only=True)
    total_defects = serializers.CharField(source='get_total_defects', read_only=True)
    total_unharmed = serializers.CharField(source='get_total_unharmed', read_only=True)

    class Meta:
        model = AnalysisMango
        fields = '__all__'


# Serializador para el modelo de análisis de aguaymanto
class AnalysisAguaymantoSerializer(serializers.ModelSerializer):
    boxes = serializers.CharField(source='lot.get_quantity_boxes', read_only=True)
    net_weight = serializers.CharField(source='lot.get_total_final_weight', read_only=True)
    lot_name = serializers.CharField(source='get_lot', read_only=True)
    maturation_total = serializers.CharField(source='get_maturation_total', read_only=True)

    class Meta:
        model = AnalysisAguaymanto
        fields = '__all__'
