from django.urls import path

from apps.products.views import ListFruitsView, ListPalletsView, ListBoxSerializers, ListBagsSerializers

app_name = "products"

urlpatterns = [
    path('get-summary', ListFruitsView.as_view()),
    path('get-pallets', ListPalletsView.as_view(), name='get-pallets'),
    path('boxes', ListBoxSerializers.as_view()),
    path('bags', ListBagsSerializers.as_view()),

]
