from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.warehouse.models import Reception, PackingList, IReception, LotPT
from apps.warehouse.serializers import IReceptionSerializer, IPackingList, ReceptionSerializer, \
    IReceptionDetailSerializer, ReceptionDetail, LotSerializer, PackingListSerializer, IPackingListSerializer, \
    IPackingListDetailSerializer


# Create your views here.


class ListReceptionView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            if Reception.objects.all().exists():
                receptions = Reception.objects.all()
                serializer = IReceptionSerializer(receptions, many=True)
                return Response({'result': serializer.data}, status=status.HTTP_200_OK)
            else:
                raise ValueError('No hay programas de recepción registrados')
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        try:
            serializer = ReceptionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Programa registrado correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al registrar el programa de recepción', 'detail': str(e)},
                            status=status.HTTP_400_BAD_REQUEST)


class GetReceptionView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            reception = get_object_or_404(Reception, slug=kwargs['slug'])
            serializer = IReceptionSerializer(reception, many=False)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class IReceptionListView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            if IReception.objects.filter(program__slug=kwargs['slug']).exists():
                data = IReception.objects.filter(program__slug=kwargs['slug'])
                serializer = IReceptionDetailSerializer(data, many=True)
                return Response({'result': serializer.data}, status=status.HTTP_200_OK)
            else:
                raise ValueError('No hay datos registrados para este programa')
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class AddIReceptionView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            serializer = ReceptionDetail(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Datos registrados correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al registrar los datos'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class IReceptionDetailView(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            if IReception.objects.filter(id=kwargs['pk']).exists():
                data = IReception.objects.get(id=kwargs['pk'])
                data.delete()
                return Response({'message': 'Registro eliminado correctamente'}, status=status.HTTP_200_OK)
            else:
                raise ValueError('Ocurrió un error al eliminar el registro')
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class PackingListView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            if PackingList.objects.all().exists():
                packing_list = PackingList.objects.all()
                serializer = IPackingListSerializer(packing_list, many=True)
                return Response({'result': serializer.data}, status=status.HTTP_200_OK)
            else:
                raise ValueError('No hay registros de packing list')
        except Exception as e:
            return Response({'error': 'No se encontraron registros de PackingList'}, status=status.HTTP_404_NOT_FOUND)


class GetPackingListView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            packing = get_object_or_404(PackingList, slug=kwargs['slug'])
            serializer = IPackingListSerializer(packing, many=False)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, *args, **kwargs):
        try:
            packing = get_object_or_404(PackingList, slug=kwargs['slug'])
            serializer = PackingListSerializer(packing, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al actualizar el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetLotView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            lot = LotPT.objects.filter(container=kwargs['slug'])
            serializer = LotSerializer(lot, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddLotPackingView(APIView):



    def post(self, request, *args, **kwargs):
        packing = get_object_or_404(PackingList, id=request.data['id'])
        try:
            quantity = int(request.data['boxes'])
        except:
            return Response({'error': 'El campo debe ser un número entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            number = int(request.data['number'])
        except:
            return Response({'error': 'El campo  debe ser un número entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            bags = int(request.data['bags'])
        except:
            return Response({'error': 'El campo debe ser un número entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            weight = float(request.data['weight'])
        except:
            return Response({'error': 'El campo debe ser un número entero o decimal'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            lot = get_object_or_404(LotPT, id=request.data['lot'])
            if quantity > lot.stock:
                return Response({'error': 'No hay suficiente stock'}, status=status.HTTP_404_NOT_FOUND)
            else:
                lot.stock -= quantity
                lot.save()
                data = IPackingList(packing_list=packing, number=number, lot=lot, boxes=quantity, bags=bags,
                                    weight=weight)
                data.save()
                return Response({'message': 'Registro agregado correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al agregar el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailLotPackingView(APIView):
    def delete(self, request, *args, **kwargs):
        data = get_object_or_404(IPackingList, id=kwargs['id'])
        try:
            lot = LotPT.objects.get(id=data.lot.id)
            lot.stock += data.boxes
            lot.save()
            data.delete()
            return Response({'message': 'Registro eliminado correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al eliminar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DataPackingListView(APIView):
    def get(self,request,*args,**kwargs):
        try:
            if IPackingList.objects.filter(packing_list__slug=kwargs['slug']).exists():
                data = IPackingList.objects.filter(packing_list__slug=kwargs['slug'])
                serializer = IPackingListDetailSerializer(data, many=True)
                return Response({'result': serializer.data}, status=status.HTTP_200_OK)
            else:
                raise ValueError('No se encontraron registros para este packing list')
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)