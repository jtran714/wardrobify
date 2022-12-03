from django.contrib import admin
from .models import Hats
from .views import LocationVO

# Register your models here.


admin.site.register(Hats)
admin.site.register(LocationVO)
