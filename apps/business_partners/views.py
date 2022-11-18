from datetime import datetime

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.business_partners.models import ProviderMP, Contact, Client
from apps.business_partners.serializers import ProviderMPSerializer, ContactSerializer, ClientsListSerializer, \
    ClientsDetailSerializer, ProviderDetailSerializer
from apps.raw_material.models import Lot
from apps.raw_material.serializers import SalesSerializer


# Create your views here.
class ListProviderView(APIView):
    def get(self, request):
        if ProviderMP.objects.exists():
            providers = ProviderMP.objects.all()
            serializer = ProviderMPSerializer(providers, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron proveedores'}, status=status.HTTP_404_NOT_FOUND)


class ListContactView(APIView):
    def get(self, request):
        if Contact.objects.exists():
            contacts = Contact.objects.all()
            serializer = ContactSerializer(contacts, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encontraron contactos'}, status=status.HTTP_404_NOT_FOUND)


class AddContactView(APIView):
    def post(self, request):
        try:
            serializer = ContactSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Contacto registrado'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Ocurrió un error al registrar el contacto'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateContactView(APIView):
    def patch(self, request, *args, **kwargs):
        data = request.data
        try:
            product = get_object_or_404(Contact, id=kwargs['id'])
            serializer = ContactSerializer(product, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Contacto actualizado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error', 'Ocurrió un error al actualizar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteContactView(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            contact_id = int(kwargs['id'])
        except:
            return Response({'error': 'El ID del contacto debe ser un número entero'}, status=status.HTTP_404_NOT_FOUND)
        try:
            contact = Contact.objects.get(id=contact_id)
            contact.delete()
            return Response({'message': 'Contacto eliminado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error', 'Ocurrió un error al eliminar el registro'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListClientView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            clients = Client.objects.all()
            serializer = ClientsListSerializer(clients, many=True)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se encontraron registros'}, status=status.HTTP_404_NOT_FOUND)


class DetailClientView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            client_slug = kwargs.get('slug')
            qr = get_object_or_404(Client, slug=client_slug)
            serializer = ClientsDetailSerializer(qr, many=False)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se encontró información sobre este cliente'},
                            status=status.HTTP_404_NOT_FOUND)


class DetailProviderView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            provider_slug = kwargs.get('slug')
            qr = get_object_or_404(ProviderMP, slug=provider_slug)
            serializer = ProviderDetailSerializer(qr, many=False)
            return Response({'result': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'No se encontró información sobre este proveedor'},
                            status=status.HTTP_404_NOT_FOUND)


class SalesProviderView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            provider_slug = kwargs.get('slug')
            current_date = datetime.date(datetime.now())
            qr = Lot.objects.filter(provider__slug=provider_slug, entryDate__year=current_date.year)
            if qr.exists():
                serializer = SalesSerializer(qr, many=True)
                return Response({'result': serializer.data}, status=status.HTTP_200_OK)
            else:
                raise Exception
        except Exception as e:
            return Response({'error': 'No se encontró información sobre este proveedor'},
                            status=status.HTTP_404_NOT_FOUND)
