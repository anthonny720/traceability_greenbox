from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.commercial.models import Product, Condition, Provider, Packing, Presentation, Client, Variety, Cut, Type, \
    Group, Family, Lot
from apps.commercial.serializers import ProductSerializer, ProviderSerializer, ConditionSerializer, PackingSerializer, \
    PresentationSerializer, ClientSerializer, VarietySerializer, CutSerializer, TypeSerializer, GroupSerializer, \
    FamilySerializer, LotSerializer
from apps.util.pagination import SetPagination


# Create your views here.

class ListFamilyView(APIView):
    def get(self, request):
        if Family.objects.all().exists():
            family = Family.objects.all()
            serializer = FamilySerializer(family, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListGroupView(APIView):
    def get(self, request):
        if Group.objects.exists():
            groups = Group.objects.all()
            serializer = GroupSerializer(groups, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListTypeView(APIView):
    def get(self, request):
        if Type.objects.exists():
            types = Type.objects.all()
            serializer = TypeSerializer(types, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListProductView(APIView):
    def get(self, request):
        if Product.objects.exists():
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListCutView(APIView):
    def get(self, request):
        if Cut.objects.exists():
            cuts = Cut.objects.all()
            serializer = CutSerializer(cuts, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListVarietyView(APIView):
    def get(self, request):
        if Variety.objects.exists():
            varieties = Variety.objects.all()
            serializer = VarietySerializer(varieties, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListClientView(APIView):
    def get(self, request):
        if Client.objects.exists():
            clients = Client.objects.all()
            serializer = ClientSerializer(clients, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListPresentationView(APIView):
    def get(self, request):
        if Presentation.objects.exists():
            presentations = Presentation.objects.all()
            serializer = PresentationSerializer(presentations, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListPackagingView(APIView):
    def get(self, request):
        if Packing.objects.filter(category=1).exists():
            packaging = Packing.objects.filter(category=1)
            serializer = PackingSerializer(packaging, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListPackingView(APIView):
    def get(self, request):
        if Packing.objects.filter(category=2).exists():
            packing = Packing.objects.filter(category=2)
            serializer = PackingSerializer(packing, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListProviderView(APIView):
    def get(self, request):
        if Provider.objects.filter().exists():
            providers = Provider.objects.all()
            serializer = ProviderSerializer(providers, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListConditionView(APIView):
    def get(self, request):
        if Condition.objects.exists():
            conditions = Condition.objects.all()
            serializer = ConditionSerializer(conditions, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListLotView(APIView):
    def get(self, request):
        if Lot.objects.exists():
            paginator = SetPagination()
            lots = Lot.objects.all()
            results = paginator.paginate_queryset(lots, request)
            serializer = LotSerializer(results, many=True)
            return paginator.get_paginated_response(serializer.data)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            serializer = LotSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'result': "Registro creado correctamente"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al registrar el item', 'detail': str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
