from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

admin.site.site_header = 'PCPSForms Administration Center'
admin.site.index_title = 'Database & Security management'
admin.site.site_title = 'PCPSForms Admin'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('index.urls')),
    path('favicon.ico', RedirectView.as_view(url = staticfiles_storage.url('favicon.ico')))
]
