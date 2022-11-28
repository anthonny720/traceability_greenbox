from django.urls import path

from apps.process_line.views import ListConditioningView, ListTerminatedView, ListLiberatedView, \
    ListGeneralConditioningView, ListGeneralReleasedView, ListGeneralTerminatedView, DetailReleasedView, \
    DetailTerminatedView, DetailConditioningView, CreateConditioningView, CreateTerminatedView, CreateReleasedView, \
    ListTypeCut, ListReleasedReceptionView

urlpatterns = [
    path('list-cuts', ListTypeCut.as_view(), name='list-type-cut'),
    path('list-conditioning', ListGeneralConditioningView.as_view(), name='list-conditioning-general'),
    path('list-terminated', ListGeneralTerminatedView.as_view(), name='list-terminated-general'),
    path('list-released', ListGeneralReleasedView.as_view(), name='list-released-general'),
    path('list-released-reception', ListReleasedReceptionView.as_view(), name='list-released-reception'),
    path('add-conditioning', CreateConditioningView.as_view(), name='add-conditioning'),
    path('add-terminated', CreateTerminatedView.as_view(), name='add-terminated'),
    path('add-released', CreateReleasedView.as_view(), name='add-released'),
    path('list-conditioning/<str:lot>', ListConditioningView.as_view(), name='list-conditioning'),
    path('list-terminated/<str:lot>', ListTerminatedView.as_view(), name='list-terminated'),
    path('list-released/<str:lot>', ListLiberatedView.as_view(), name='list-released'),
    path('detail-conditioning/<int:id>', DetailConditioningView.as_view(), name='detail-conditioning'),
    path('detail-terminated/<int:id>', DetailTerminatedView.as_view(), name='detail-terminated'),
    path('detail-released/<int:id>', DetailReleasedView.as_view(), name='detail-released'),
]
