from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
# from apps.users.models import UserActivity

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'get_full_name',
            'get_short_name',
            'get_admin',
            'password',
            'role','get_role_name')


# class UserActivitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserActivity
#         fields = ('user', 'activity', 'created_at')
#         read_only_fields = ('created_at',)
#         extra_kwargs = {'user': {'write_only': True}}
