from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.quality.models import AnalysisPineapple, CutTest, AnalysisBanano, AnalysisMango, AnalysisAguaymanto, \
    AnalysisBlueberry
from apps.raw_material.models import Lot, ILot
from apps.raw_material.serializers import LotListSerializer, LotSerializer, LotDetailSerializer, ILotSerializer, \
    ILotCRUDSerializer
from apps.report.models import Report


# Create your views here.
class ListCreateLotView(APIView):
    def get(self, request, format=None):
        if Lot.objects.all().exists():
            serializer = LotListSerializer(Lot.objects.all(), many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registro de lotes'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, format=None):
        try:
            serializer = LotSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            lot = get_object_or_404(Lot, lot=serializer.data['lot'])
            if lot.category.name == "Piña":
                AnalysisPineapple.objects.create(lot=lot)
                CutTest.objects.create(lot=lot)
            elif lot.category.name == "Banano":
                AnalysisBanano.objects.create(lot=lot)
            elif lot.category.name == "Mango":
                AnalysisMango.objects.create(lot=lot)
            elif lot.category.name == "Aguaymanto":
                AnalysisAguaymanto.objects.create(lot=lot)
            else:
                AnalysisBlueberry.objects.create(lot=lot)
            Report.objects.create(lot=lot)
            return Response({'message': 'Lote registrado correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al registrar el lote'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailEntryView(APIView):

    def get(self, request, *args, **kwargs):
        lot = get_object_or_404(Lot, lot=kwargs['lot'])
        serializer = LotDetailSerializer(lot)
        return Response({'result': serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        entry = get_object_or_404(Lot, lot=kwargs['lot'])
        if entry.closed:
            return Response({"error": "El lote ya esta bloqueado para su edición. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            entry.delete()
            return Response({"message": "Lote eliminado correctamente"}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Ocurrió un error al eliminar el lote"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListILotView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            lot = kwargs['lot']
            serializer = ILotSerializer(ILot.objects.filter(lot__lot=lot), many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateInformationView(APIView):
    def post(self, request, format=None):
        data = request.data
        try:
            if Lot.objects.get(id=data.get("lot")).closed:
                return Response({"error": "El lote ya esta bloqueado para su edición. Contáctese con el administrador"},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except:
            return Response({"error": "Ocurrió un problema interno. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            serializer = ILotCRUDSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Item agregado correctamente'}, status=status.HTTP_201_CREATED)
        except:
            return Response({"error": "Ocurrió un error al registrar la información, verifique los datos"},
                            status=status.HTTP_400_BAD_REQUEST)


class DetailInformationView(APIView):
    def patch(self, request, *args, **kwargs):
        inf = get_object_or_404(ILot, id=kwargs['id'])
        try:
            if Lot.objects.get(lot=inf.lot).closed:
                return Response({"error": "El lote ya esta bloqueado para su edición. Contáctese con el administrador"},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except:
            return Response({"error": "Ocurrió un problema interno. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            serializer = ILotCRUDSerializer(inf, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Item actualizado correctamente'}, status=status.HTTP_200_OK)
        except:
            return Response({"error": {'Ocurrió un error al actualizar el item'}}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        # if not request.user.is_superuser:
        #     return Response({'error': 'No tiene permisos para realizar esta acción'},
        #                     status=status.HTTP_401_UNAUTHORIZED)
        try:
            inf = get_object_or_404(ILot, id=kwargs['id'])
            try:
                if Lot.objects.get(lot=inf.lot).closed:
                    return Response(
                        {"error": "El lote ya esta bloqueado para su edición. Contáctese con el administrador"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except:
                return Response({"error": "Ocurrió un problema interno. Contáctese con el administrador"},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            inf.delete()
            return Response({"message": "Item eliminado correctamente"}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Ocurrió un error al eliminar el registro"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
