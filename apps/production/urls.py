from django.urls import path

from .views import *

app_name = 'production'

urlpatterns = [
    path('pineapple', ProcessPineappleList.as_view(), name='process_pineapple'),
    path('report', GetReportView.as_view(), name='report_process'),
    path('pineapple/crown', CreateCrownView.as_view(), name='crown_pineapple'),
    path('pineapple/peel', CreatePeelView.as_view(), name='peel_pineapple'),

    path('pineapple/<str:slug>', ProcessDetailPineappleList.as_view(), name='process_pineapple_detail'),
    path('pineapple/crown/<int:id>', DeleteCrownView.as_view(), name='crown_pineapple_delete'),
    path('pineapple/peel/<int:id>', DeletePeelView.as_view(), name='peel_pineapple_delete'),
]
