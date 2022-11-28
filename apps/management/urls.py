from django.urls import path

from apps.management.views import ListKardexView, CreateKardexView, ListMotionView, AddMotionView, DeleteMotionView, \
    ListPaymentsView, DetailPaymentView, ListLocationView, ListDataForLocationView

urlpatterns = [
    path('get-kardex', ListKardexView.as_view()),
    path('get-locations', ListLocationView.as_view()),
    path('get-locations/<int:id>', ListDataForLocationView.as_view()),
    path('create-kardex', CreateKardexView.as_view()),
    path('get-motions', ListMotionView.as_view(), name='get-motions'),
    path('add-motions', AddMotionView.as_view(), name='add-motions'),
    path('delete-motion/<id>', DeleteMotionView.as_view(), name='delete-motion'),
    path('payments', ListPaymentsView.as_view()),
    path('payments/<int:id>', DetailPaymentView.as_view()),
]
