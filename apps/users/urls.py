from django.urls import path

from .views import DeleteUserView, UpdateUserView

app_name = "users"

urlpatterns = [
    path('delete-user/<id>', DeleteUserView.as_view(), name='delete-user'),
    path('update-user/<id>', UpdateUserView.as_view(), name='update-user'),
]
