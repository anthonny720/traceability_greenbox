from django.urls import path

from apps.warehouse.views import ListReceptionView, PackingListView, IReceptionListView, IReceptionDetailView, \
    AddIReceptionView, GetReceptionView, GetPackingListView, GetLotView, AddLotPackingView, DetailLotPackingView, \
    DataPackingListView

urlpatterns = [
    path('programs', ListReceptionView.as_view()),
    path('packing-list/data', AddLotPackingView.as_view()),
    path('packing-list/data/<int:id>', DetailLotPackingView.as_view()),
    path('packing-list/<str:slug>/data', DataPackingListView.as_view()),
    path('programs/data', AddIReceptionView.as_view()),
    path('programs/<str:slug>', GetReceptionView.as_view()),
    path('programs/<str:slug>/data', IReceptionListView.as_view()),
    path('programs/data/<int:pk>', IReceptionDetailView.as_view()),
    path('packing-list', PackingListView.as_view()),
    path('packing-list/<str:slug>', GetPackingListView.as_view()),
    path('packing-list/<str:slug>/lots', GetLotView.as_view()),

]
