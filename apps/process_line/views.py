from datetime import datetime

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.process_line.models import ProcessLineConditioning, ProcessLineTerminated, ProcessLineReleased, TypesCut
from apps.process_line.serializers import ConditioningListSerializer, TerminatedListSerializer, LiberatedListSerializer, \
    ConditioningSerializer, TypeCutSerializer, TerminatedSerializer, ReleasedSerializer, \
    LiberatedReceptionListSerializer
from apps.util.pagination import SetPagination


# Create your views here.
class ListTypeCut(APIView):
    def get(self, request):
        try:
            qr = TypesCut.objects.all()
            serializer = TypeCutSerializer(qr, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se encontraron resultados'}, status=status.HTTP_400_BAD_REQUEST)


class ListConditioningView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            lot = kwargs.get('lot')
            if ProcessLineConditioning.objects.filter(lot__lot=lot).exists():
                qr = ProcessLineConditioning.objects.filter(lot__lot=lot)
                serializer = ConditioningListSerializer(qr, many=True)
                return Response({'result': serializer.data}, status=status.HTTP_200_OK)
            else:
                raise Exception({'error': 'No se encontraron registros'})
        except Exception as e:
            return Response({'error': 'No hay registros para este lote'}, status=status.HTTP_404_NOT_FOUND)


class ListTerminatedView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            lot = kwargs.get('lot')
            if ProcessLineTerminated.objects.filter(process__lot__lot=lot).exists():
                qr = ProcessLineTerminated.objects.filter(process__lot__lot=lot).order_by('-process__process_date')
                serializer = TerminatedListSerializer(qr, many=True)
                return Response({'result': serializer.data}, status=status.HTTP_200_OK)
            else:
                raise Exception({'error': 'No se encontraron registros'})
        except Exception as e:
            return Response({'error': 'No hay registros para este lote'}, status=status.HTTP_404_NOT_FOUND)


class ListLiberatedView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            lot = kwargs.get('lot')
            if ProcessLineReleased.objects.filter(process__process__lot__lot=lot).exists():
                qr = ProcessLineReleased.objects.filter(process__process__lot__lot=lot).order_by(
                    '-process__process__process_date')
                serializer = LiberatedListSerializer(qr, many=True)
                return Response({'result': serializer.data}, status=status.HTTP_200_OK)
            else:
                raise Exception({'error': 'No se encontraron registros'})
        except Exception as e:
            return Response({'error': 'No hay registros para este lote'}, status=status.HTTP_404_NOT_FOUND)


class ListGeneralConditioningView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ProcessLineConditioning.objects.all().filter(process_date__year=current_date.year)
        # FILTERS
        category = request.query_params.get('category', None)
        month = request.query_params.get('month', None)
        year = request.query_params.get('year', None)

        if category:
            queryset = queryset.filter(lot__category__name=category)
        if year:
            queryset = queryset.filter(process_date__year=year)
        if month:
            queryset = queryset.filter(process_date__month=month)
        try:
            paginator = SetPagination()
            results = paginator.paginate_queryset(queryset, request)
            serializers = ConditioningListSerializer(results, many=True)
            return paginator.get_paginated_response(serializers.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListGeneralTerminatedView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ProcessLineTerminated.objects.all().filter(packing_date__year=current_date.year)
        # FILTERS
        category = request.query_params.get('category', None)
        month = request.query_params.get('month', None)
        year = request.query_params.get('year', None)

        if category:
            queryset = queryset.filter(process__lot__category__name=category)
        if year:
            queryset = queryset.filter(packing_date__year=year)
        if month:
            queryset = queryset.filter(packing_date__month=month)
        try:
            paginator = SetPagination()
            results = paginator.paginate_queryset(queryset, request)
            serializers = TerminatedListSerializer(results, many=True)
            return paginator.get_paginated_response(serializers.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ListGeneralReleasedView(APIView):
    def get(self, request, *args, **kwargs):
        current_date = datetime.date(datetime.now())
        queryset = ProcessLineReleased.objects.all().filter(release_date__year=current_date.year)
        # FILTERS
        category = request.query_params.get('category', None)
        month = request.query_params.get('month', None)
        year = request.query_params.get('year', None)

        if category:
            queryset = queryset.filter(process__process__lot__category__name=category)
        if year:
            queryset = queryset.filter(release_date__year=year)
        if month:
            queryset = queryset.filter(release_date__month=month)
        try:
            paginator = SetPagination()
            results = paginator.paginate_queryset(queryset, request)
            serializers = LiberatedListSerializer(results, many=True)
            return paginator.get_paginated_response(serializers.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class DetailConditioningView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = kwargs.get('id')
            qr = get_object_or_404(ProcessLineConditioning, id=id)
            serializer = ConditioningSerializer(qr, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': "Ocurrió un error al actualizar el registro, verifique los datos ingresados."},
                            status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = kwargs.get('id')
            qr = get_object_or_404(ProcessLineConditioning, id=id)
            qr.delete()
            return Response({'message': "Registro eliminado correctamente."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': "No se encontró un registro coincidente."}, status=status.HTTP_404_NOT_FOUND)


class DetailTerminatedView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = kwargs.get('id')
            qr = get_object_or_404(ProcessLineTerminated, id=id)
            serializer = TerminatedSerializer(qr, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = kwargs.get('id')
            qr = get_object_or_404(ProcessLineTerminated, id=id)
            qr.delete()
            return Response({'message': "Registro eliminado correctamente."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': "No se encontró un registro coincidente."}, status=status.HTTP_404_NOT_FOUND)


class DetailReleasedView(APIView):
    def patch(self, request, *args, **kwargs):
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = kwargs.get('id')
            qr = get_object_or_404(ProcessLineReleased, id=id)
            serializer = ReleasedSerializer(qr, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': "Ocurrió un error al actualizar el registro, verifique los datos ingresados."},
                            status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = kwargs.get('id')
            qr = get_object_or_404(ProcessLineReleased, id=id)
            qr.delete()
            return Response({'message': "Registro eliminado correctamente."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': "No se encontró un registro coincidente."}, status=status.HTTP_404_NOT_FOUND)


class CreateConditioningView(APIView):
    def post(self, request, *args, **kwargs):
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            serializer = ConditioningSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro creado correctamente."}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response({'error': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateTerminatedView(APIView):
    def post(self, request, *args, **kwargs):
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            serializer = TerminatedSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro creado correctamente."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateReleasedView(APIView):
    def post(self, request, *args, **kwargs):
        if request.user.role != '5':
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            serializer = ReleasedSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "Registro creado correctamente."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': "Ocurrió un error al realizar el registro, verifique los datos ingresados."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Create your views here.

class ListReleasedReceptionView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = ProcessLineReleased.objects.all()[0:50]
        try:
            serializers = LiberatedReceptionListSerializer(queryset, many=True)
            return Response({'result': serializers.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros'}, status=status.HTTP_400_BAD_REQUEST)
