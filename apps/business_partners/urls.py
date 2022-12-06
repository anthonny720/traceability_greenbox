from django.urls import path

from apps.business_partners.views import ListProviderView, ListContactView, AddContactView, UpdateContactView, \
    DeleteContactView, ListClientView, DetailClientView, DetailProviderView, SalesProviderView, SalesClientView, \
    DeleteCarrierView, UpdateCarrierView, AddCarrierView, ListCarrierView, ListFullProviderView

app_name = "business_partners"
urlpatterns = [
    path('get-contacts', ListContactView.as_view()),
    path('add-contact', AddContactView.as_view()),
    path('update-contact/<id>', UpdateContactView.as_view()),
    path('delete-contact/<id>', DeleteContactView.as_view()),
    path('get-carriers', ListCarrierView.as_view()),
    path('add-carrier', AddCarrierView.as_view()),
    path('update-carrier/<id>', UpdateCarrierView.as_view()),
    path('delete-carrier/<id>', DeleteCarrierView.as_view()),
    path('clients', ListClientView.as_view()),
    path('clients/<str:slug>', DetailClientView.as_view()),
    path('providers', ListProviderView.as_view()),
    path('full-providers', ListFullProviderView.as_view()),
    path('providers/<str:slug>', DetailProviderView.as_view()),
    path('providers/sales/<str:slug>', SalesProviderView.as_view()),
    path('clients/sales/<str:slug>', SalesClientView.as_view(), name='sales-client'),
]
