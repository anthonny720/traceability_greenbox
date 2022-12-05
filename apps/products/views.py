from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.products.models import Fruits, Pallets, PackingProduct
from apps.products.scraping import get_day
from apps.products.serializers import PackingContainersSerializer


# Create your views here.
class ListFruitsView(APIView):
    def get(self, request):
        try:
            day = get_day()
        except:
            day = 0
        try:
            result = [{'id': sm.id, 'name': sm.name, 'stock': sm.get_stock(), 'summary': sm.get_motions(),'thumbnail':sm.get_thumbnail()} for sm in
                      Fruits.objects.all().order_by('-id')]
            return Response({'categories': result, 'day': day}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class ListPalletsView(APIView):
    def get(self, request, format=None):
        if Pallets.objects.all().exists():
            result = [
                {'id': pallet.id, 'name': pallet.name, 'weight': pallet.weight} for pallet in Pallets.objects.all()]
            return Response({'pallets': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Ocurrio un error al obtener registros'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListBoxSerializers(APIView):
    def get(self, request):
        if PackingProduct.objects.filter(type='Cajas').exists():
            serializer = PackingContainersSerializer(PackingProduct.objects.filter(type='Cajas'), many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class ListBagsSerializers(APIView):
    def get(self, request):
        if PackingProduct.objects.filter(type='Bolsas').exists():
            serializer = PackingContainersSerializer(PackingProduct.objects.filter(type='Bolsas'), many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)
