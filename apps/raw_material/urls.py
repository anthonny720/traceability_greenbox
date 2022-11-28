from django.urls import path

from apps.raw_material.views import ListCreateLotView, DetailEntryView, ListILotView, CreateInformationView, DetailInformationView, ListLotProductionView

urlpatterns = [

    path('lot/', ListCreateLotView.as_view()),
    path('lot-list', ListLotProductionView.as_view()),
    path('lot/data', CreateInformationView.as_view()),
    path('lot/<str:lot>', DetailEntryView.as_view()),
    path('lot/data/<str:lot>', ListILotView.as_view()),
    path('lot/data/detail/<int:id>', DetailInformationView.as_view())

]