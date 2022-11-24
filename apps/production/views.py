from datetime import datetime

from django.db.models import Min, Max, Sum
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.production.models import ProcessPineapple, Crown, Peel
from apps.production.serializers import ProcessDetailPineappleSerializer, \
    CrownSerializer, PeelSerializer, ProcessListPineappleSerializer


# Create your views here.

class ProcessPineappleList(APIView):
    def get(self, request, *args, **kwargs):
        if ProcessPineapple.objects.all().exists():
            process = ProcessPineapple.objects.all()
            serializer = ProcessListPineappleSerializer(process, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        return Response({'error': 'No se encontraron resultados'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        try:
            if ProcessPineapple.objects.filter(lot__lot=request.data['lot'], date=request.data['date']).exists():
                return Response({'error': 'Se encontró un registró existente, verifique los datos ingresados.'},
                                status=status.HTTP_400_BAD_REQUEST)
            serializer = ProcessDetailPineappleSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Proceso registrado'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProcessDetailPineappleList(APIView):
    def get(self, request, *args, **kwargs):
        process = get_object_or_404(ProcessPineapple, slug=kwargs['slug'])
        serializer = ProcessDetailPineappleSerializer(process)
        return Response({'result': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        process = get_object_or_404(ProcessPineapple, slug=kwargs['slug'])

        if process.status:
            return Response({"error": "El registro ya esta bloqueado para su edición. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            serializer = ProcessDetailPineappleSerializer(instance=process, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': "Ocurrió un error al actualizar el registro, verifique los datos ingresados"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, *args, **kwargs):
        process = get_object_or_404(ProcessPineapple, slug=kwargs['slug'])

        if process.status:
            return Response({"error": "El registro ya esta bloqueado para su edición. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            id = process.id
            process.delete()
            return Response({'message': 'Registro eliminado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': "Ningún registro coincide con la consulta dada"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateCrownView(APIView):
    def post(self, request, format=None):

        process = get_object_or_404(ProcessPineapple, id=request.data['process'])
        if process.status:
            return Response({"error": "El registro ya esta bloqueado para su edición. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            serializer = CrownSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Item registrado correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteCrownView(APIView):
    def delete(self, request, **kwargs):
        crown_id = get_object_or_404(Crown, id=kwargs['id'])
        if crown_id.process.status:
            return Response({"error": "El registro ya esta bloqueado para su edición. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            crown_id.delete()
            return Response({'message': 'Registro eliminado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreatePeelView(APIView):
    def post(self, request, format=None):
        process = get_object_or_404(ProcessPineapple, id=request.data['process'])
        if process.status:
            return Response({"error": "El registro ya esta bloqueado para su edición. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            serializer = PeelSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Item registrado correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': "Ocurrió un error, verifique los datos ingresados."})


class DeletePeelView(APIView):
    def delete(self, request, **kwargs):
        peel_id = get_object_or_404(Peel, id=kwargs['id'])

        if peel_id.process.status:
            return Response({"error": "El registro ya esta bloqueado para su edición. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            peel_id.delete()
            return Response({'message': 'Registro eliminado correctamente'}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Ocurrió un error al eliminar el registro"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetReportView(APIView):
    def post(self, request, **kwargs):
        try:
            category = request.data['category']
            date = request.data['date']
            data = []
            summary = []
            if date == '':
                date = datetime.now()
            if category == 'Piña':
                queryset = ProcessPineapple.objects.filter(date=date)
                weight = 0
                crown = 0
                peel = 0
                enabled = 0
                people = 0
                start = queryset.values('start_washed').aggregate(Min('start_washed'))['start_washed__min']
                cars = queryset.aggregate(Sum('cars'))['cars__sum']
                end = queryset.values('finish_cleaning').aggregate(Max('finish_cleaning'))['finish_cleaning__max']

                for i in queryset:
                    people = i.people
                    weight += i.get_kg_mp()
                    crown += i.get_total_crown()['kg']
                    peel += i.get_total_peel()['kg']
                    enabled += i.get_total_enabled()['kg']
                data.append(ProcessListPineappleSerializer(queryset, many=True).data)
                summary = {'Peso': weight, 'Corona': crown, 'Cáscara': peel, 'Habilitado': enabled,
                           'Corona %': (crown / weight) * 100 if weight != 0 else 0,
                           'Cáscara %': (peel / weight) * 100 if weight != 0 else 0,
                           'Habilitado %': (enabled / weight) * 100 if weight != 0 else 0, 'Coches': cars,
                           'Personas': people,
                           'Inicio': start, 'Fin': end}
            report = {'data': data, 'summary': summary}
            return Response({'result': report}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
