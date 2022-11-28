from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.quality.models import AnalysisBlueberry, AnalysisBanano, AnalysisAguaymanto, AnalysisMango, AnalysisPineapple, \
    CutTest
from apps.quality.serializers import AnalysisBlueberrySerializer, AnalysisBananoSerializer, \
    AnalysisAguaymantoSerializer, AnalysisMangoSerializer, AnalysisPineappleSerializer, CutTestSerializer
from apps.util.pagination import SetPagination


# Create your views here.
class ListCutTestView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            paginator = SetPagination()
            queryset = CutTest.objects.all()
            results = paginator.paginate_queryset(queryset, request)
            serializer = CutTestSerializer(results, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class DetailCutTestView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != '5':
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
            paginator = SetPagination()
            queryset = AnalysisPineapple.objects.all()
            results = paginator.paginate_queryset(queryset, request)
            serializer = AnalysisPineappleSerializer(results, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class ListAnalysisMangoView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            paginator = SetPagination()
            queryset = AnalysisMango.objects.all()
            results = paginator.paginate_queryset(queryset, request)
            serializer = AnalysisMangoSerializer(results, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class ListAnalysisAguaymantoView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            paginator = SetPagination()
            queryset = AnalysisAguaymanto.objects.all()
            results = paginator.paginate_queryset(queryset, request)
            serializer = AnalysisAguaymantoSerializer(results, many=True)
            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class ListAnalysisBananoView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            paginator = SetPagination()
            queryset = AnalysisBanano.objects.all()
            results = paginator.paginate_queryset(queryset, request)
            serializer = AnalysisBananoSerializer(results, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class ListAnalysisBlueberryView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            paginator = SetPagination()
            queryset = AnalysisBlueberry.objects.all()
            results = paginator.paginate_queryset(queryset, request)
            serializer = AnalysisBlueberrySerializer(results, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)


class DetailAnalysisPineappleView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
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
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
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
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
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
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
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
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            obj = get_object_or_404(AnalysisBlueberry, id=kwargs['id'])
            serializer = AnalysisBlueberrySerializer(obj, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro actualizado correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al actualizar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
