from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.util.pagination import SetPagination
from apps.warehouse.models import Reception, PackingList, IReception, LotPT
from apps.warehouse.serializers import IReceptionSerializer, IPackingList, ReceptionSerializer, \
    IReceptionDetailSerializer, ReceptionDetail, LotSerializer, PackingListSerializer, IPackingListSerializer, \
    IPackingListDetailSerializer


# Create your views here.
class ListReceptionView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            if Reception.objects.all().exists():
                paginator = SetPagination()
                receptions = Reception.objects.all()
                result = paginator.paginate_queryset(receptions, request)
                serializer = IReceptionSerializer(result, many=True)
                return paginator.get_paginated_response(serializer.data)
            else:
                raise ValueError('No hay programas de recepción registrados')
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        if request.user.role != "2":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
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
        if request.user.role != "2":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
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
        if request.user.role != "2":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            if IReception.objects.filter(id=kwargs['pk']).exists():
                data = IReception.objects.get(id=kwargs['pk'])
                if data.program.packing_list.status:
                    return Response({'error': 'No se puede eliminar un registro que ya tiene un packing list'},
                                    status=status.HTTP_400_BAD_REQUEST)
                else:
                    pass
                data.delete()
                return Response({'message': 'Registro eliminado correctamente'}, status=status.HTTP_200_OK)
            else:
                raise ValueError()

        except Exception as e:
            return Response({'error': 'Ocurrió un error al eliminar el registro'}, status=status.HTTP_404_NOT_FOUND)


class PackingListView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            if PackingList.objects.all().exists():
                paginator = SetPagination()
                packing_list = PackingList.objects.all()
                result = paginator.paginate_queryset(packing_list, request)
                serializer = IPackingListSerializer(result, many=True)
                return paginator.get_paginated_response(serializer.data)
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
        packing = get_object_or_404(PackingList, slug=kwargs['slug'])
        if packing.status:
            return Response(
                {"error": "El registro ya esta bloqueado para su edición. Contáctese con el administrador"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if request.user.role != "2":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
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
            lot = LotPT.objects.filter(container=kwargs['slug'], stock__gt=0)
            serializer = LotSerializer(lot, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener el registro', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddLotPackingView(APIView):

    def post(self, request, *args, **kwargs):
        packing = get_object_or_404(PackingList, id=request.data['id'])
        if packing.status:
            return Response(
                {"error": "El registro ya esta bloqueado para su edición. Contáctese con el administrador"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if request.user.role != "2":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)

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
        if data.packing_list.status:
            return Response(
                {"error": "El registro ya esta bloqueado para su edición. Contáctese con el administrador"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if request.user.role != "2":
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
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
    def get(self, request, *args, **kwargs):
        try:
            if IPackingList.objects.filter(packing_list__slug=kwargs['slug']).exists():
                data = IPackingList.objects.filter(packing_list__slug=kwargs['slug'])
                serializer = IPackingListDetailSerializer(data, many=True)
                return Response({'result': serializer.data}, status=status.HTTP_200_OK)
            else:
                raise ValueError('No se encontraron registros para este packing list')
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
