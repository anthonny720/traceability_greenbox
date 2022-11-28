from django.urls import path

from apps.quality.views import ListCutTestView, DetailCutTestView, ListAnalysisPineappleView, \
    ListAnalysisBananoView, ListAnalysisMangoView, ListAnalysisBlueberryView, ListAnalysisAguaymantoView, \
    DetailAnalysisPineappleView, DetailAnalysisBananoView, DetailAnalysisMangoView, DetailAnalysisBlueberryView, \
    DetailAnalysisAguaymantoView

app_name = "quality_control"
urlpatterns = [
    path('cut-test', ListCutTestView.as_view()),
    path('cut-test/<id>', DetailCutTestView.as_view()),

    path('analysis-pineapple', ListAnalysisPineappleView.as_view()),
    path('analysis-blueberry', ListAnalysisBlueberryView.as_view()),
    path('analysis-aguaymanto', ListAnalysisAguaymantoView.as_view()),

    path('analysis-banano', ListAnalysisBananoView.as_view()),
    path('analysis-mango', ListAnalysisMangoView.as_view()),

    path('analysis-pineapple/<id>', DetailAnalysisPineappleView.as_view()),
    path('analysis-banano/<id>', DetailAnalysisBananoView.as_view()),
    path('analysis-mango/<id>', DetailAnalysisMangoView.as_view()),
    path('analysis-blueberry/<id>', DetailAnalysisBlueberryView.as_view()),
    path('analysis-aguaymanto/<id>', DetailAnalysisAguaymantoView.as_view()),

]
