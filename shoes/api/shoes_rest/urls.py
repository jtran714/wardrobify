from django.urls import path
from .views import list_shoes, show_shoe

urlpatterns = [
    path("shoes/", list_shoes, name="list_shoes"),
    path("shoes/<int:pk>/",show_shoe,name="show_shoe"),
    path("bins/<int:bin_id>/",show_shoe, name="show_shoe_bin"),
]
