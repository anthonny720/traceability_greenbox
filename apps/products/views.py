from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.products.models import Fruits, Pallets
from apps.products.scraping import get_day


# Create your views here.
class ListFruitsView(APIView):
    def get(self, request):
        try:
            day = get_day()
        except:
            day = 0
        try:
            result = [{'id': sm.id, 'name': sm.name, 'stock': sm.get_stock()} for sm in
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
