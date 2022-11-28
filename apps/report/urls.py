from django.urls import path

from apps.report.views import ListReportView, \
    ProviderListView, SummaryView, ReportView

urlpatterns = [
    path('<int:id>', ReportView.as_view(), name='update-report'),
    path('<category>', ListReportView.as_view(), name='get-report'),
    path('summary/<category>', SummaryView.as_view(), name='get-summary-category'),
    path('providers/<category>', ProviderListView.as_view(), name='get-providers-category'),

]
