from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.business_partners.models import ProviderMP
from apps.management.models import Kardex, Motion
from apps.products.models import Fruits


class ListKardexView(APIView):
    def get(self, request, format=None):
        try:
            input = []
            output = []
            stock = []
            q = Kardex.objects.all()
            category = request.query_params.get('category', None)
            if category:
                q = q.filter(category=category)
                for i in q:
                    input.append({"id": i.id, "title": f'↑ {i.input} kg', "date": i.date,
                                  "backgroundColor": "rgb(60, 179, 113)", "borderColor": "white",
                                  "className": "p-2 flex-wrap text-center"})
                    output.append({"id": i.id, "title": f'↓ {i.output} kg', "date": i.date,
                                   "backgroundColor": "rgb(255,47,0,0.7)", "borderColor": "white",
                                   "className": "p-2 flex-wrap text-center"})
                    stock.append({"id": i.id, "title": f'⚡ {i.stock} kg', "date": i.date,
                                  "backgroundColor": "RGB(186 208 231,0.7)", "borderColor": "white",
                                  "className": "p-2 flex-wrap text-center"})
                result = input + output + stock
                return Response({'result': result}, status=status.HTTP_200_OK)
            else:
                return Response({'error': "No hay categoria seleccionada"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': 'Ocurrió un error al obtener los registros.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateKardexView(APIView):
    def post(self, request, format=None):
        try:
            category = int(request.data.get('category'))
            category = Fruits.objects.get(id=category)
        except:
            return Response({'error': 'No se encontro la categoria'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            input = float(request.data.get('input'))
        except:
            return Response({'error': 'La entrada es un campo obligatorio'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            output = float(request.data.get('output'))
        except:
            return Response({'error': 'La salida es un campo obligatorio'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            stock = float(request.data.get('stock'))
        except:
            return Response({'error': 'El stock final es un campo obligatorio'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            date = request.data.get('date')
        except:
            return Response({'error': 'La fecha es un campo obligatorio'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            k = Kardex.objects.create(category=category, input=input, output=output, stock=stock, date=date)
            k.save()
            return Response({'message': 'Registro creado correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': "Se encontró un registro para este día"},
                            status=status.HTTP_226_IM_USED)


class ListMotionView(APIView):
    def get(self, request, format=None):
        if Motion.objects.all().exists():
            result = [
                {'id': motion.id, 'date': motion.date, 'remitter': motion.to.name, 'receiver': motion.fr.name,
                 'quantity': motion.quantity} for motion in Motion.objects.all().order_by('-id')]
            return Response({'motions': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class AddMotionView(APIView):
    def post(self, request, format=None):
        try:
            remitter = int(self.request.data['to'])
            receiver = int(self.request.data['fr'])
            quantity = int(self.request.data['quantity'])
        except:
            return Response({'error': 'Los datos deben ser numeros enternos.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            remitter = ProviderMP.objects.get(id=remitter)
        except:
            return Response({'error': 'El remitente no existe'}, status=status.HTTP_404_NOT_FOUND)
        try:
            receiver = ProviderMP.objects.get(id=receiver)
        except:
            return Response({'error': 'El destinatario no existe'}, status=status.HTTP_404_NOT_FOUND)
        try:
            if remitter.id == receiver.id:
                return Response({'error': 'El remitente y el destinatario no pueden ser iguales'},
                                status=status.HTTP_400_BAD_REQUEST)
            if quantity > remitter.stock:
                return Response({'error': 'No hay suficiente stock'}, status=status.HTTP_404_NOT_FOUND)
            else:
                remitter.stock -= quantity
                receiver.stock += quantity
                remitter.save()
                receiver.save()
                motion = Motion(to=remitter, fr=receiver, quantity=quantity)
                motion.save()
                return Response({'message': 'Movimiento registrado'}, status=status.HTTP_201_CREATED)
        except:
            return Response({'error': 'Ocurrió un error al realizar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteMotionView(APIView):
    def delete(self, request, id, format=None):
        motion = get_object_or_404(Motion, id=id)
        try:
            id = motion.id
            remitter = get_object_or_404(ProviderMP, id=motion.to.id)
            receiver = get_object_or_404(ProviderMP, id=motion.fr.id)
            remitter.stock += motion.quantity
            receiver.stock -= motion.quantity
            remitter.save()
            receiver.save()
            motion.delete()
            return Response({'message': 'Movimiento eliminado'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Ocurrió un error al eliminar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
