# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()


# Create your views here.
class DeleteUserView(APIView):
    def delete(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un numero entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(id=id)
        except:
            return Response({'error': 'No se encontro el usuario'}, status=status.HTTP_404_NOT_FOUND)
        if user.id == request.user.id:
            return Response({'error': 'Solicitud incorrecta, intentelo otra vez!'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            name = user.first_name
            user.delete()
            return Response({'message': 'Usuario eliminado'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'No se pudo eliminar el usuario'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserView(APIView):
    def patch(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            return Response({'error': 'No tiene permisos para realizar esta acción'},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            id = int(kwargs['id'])
        except:
            return Response({'error': 'El id debe ser un numero entero'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(id=id)
        except:
            return Response({'error': 'No se encontró el usuario'}, status=status.HTTP_404_NOT_FOUND)
        try:
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']
            user.last_name = request.data['last_name']
            user.role = request.data['role']
            if request.data['password'] != '':
                user.set_password(request.data['password'])
            user.save()
            return Response({'message': 'Usuario actualizado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
