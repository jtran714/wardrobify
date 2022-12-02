from django.urls import path

from .views import list_shoes

urlpatterns = [
    path("shoes/", list_shoes, name="list_shoes"),
    path("bins/<int:bin_id>/shoes/",list_shoes, name="list_shoes"),
]
