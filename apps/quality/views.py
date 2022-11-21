from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.quality.models import AnalysisBlueberry, AnalysisBanano, AnalysisAguaymanto, AnalysisMango, AnalysisPineapple, \
    CutTest
from apps.quality.serializers import AnalysisBlueberrySerializer, AnalysisBananoSerializer, \
    AnalysisAguaymantoSerializer, AnalysisMangoSerializer, AnalysisPineappleSerializer, CutTestSerializer


# Create your views here.
class ListCutTestView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            queryset = CutTest.objects.all()
            serializer = CutTestSerializer(queryset, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class DetailCutTestView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != "Calidad_Editor":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            cut = get_object_or_404(CutTest, id=kwargs['id'])
            serializer = CutTestSerializer(cut, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Corte actualizado correctamente"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': 'Ocurrió un error al actualizar el corte'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Analysis Fruits
class ListAnalysisPineappleView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            queryset = AnalysisPineapple.objects.all()
            serializer = AnalysisPineappleSerializer(queryset, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class ListAnalysisMangoView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            queryset = AnalysisMango.objects.all()
            serializer = AnalysisMangoSerializer(queryset, many=True)

            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class ListAnalysisAguaymantoView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            queryset = AnalysisAguaymanto.objects.all()
            serializer = AnalysisAguaymantoSerializer(queryset, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class ListAnalysisBananoView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            queryset = AnalysisBanano.objects.all()
            serializer = AnalysisBananoSerializer(queryset, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class ListAnalysisBlueberryView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            queryset = AnalysisBlueberry.objects.all()
            serializer = AnalysisBlueberrySerializer(queryset, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class DetailAnalysisPineappleView(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            obj = get_object_or_404(AnalysisPineapple, id=kwargs['id'])
            serializer = AnalysisPineappleSerializer(obj, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro actualizado correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al actualizar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailAnalysisMangoView(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            obj = get_object_or_404(AnalysisMango, id=kwargs['id'])
            serializer = AnalysisMangoSerializer(obj, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro actualizado correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al actualizar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailAnalysisAguaymantoView(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            obj = get_object_or_404(AnalysisAguaymanto, id=kwargs['id'])
            serializer = AnalysisAguaymantoSerializer(obj, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro actualizado correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al actualizar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailAnalysisBananoView(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            obj = get_object_or_404(AnalysisBanano, id=kwargs['id'])
            serializer = AnalysisBananoSerializer(obj, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro actualizado correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al actualizar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailAnalysisBlueberryView(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            obj = get_object_or_404(AnalysisBlueberry, id=kwargs['id'])
            serializer = AnalysisBlueberrySerializer(obj, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro actualizado correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al actualizar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
