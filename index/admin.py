from django.contrib import admin
from .models import User, Choices, Questions, Answer, Form, Responses
from django.contrib.admin import AdminSite
from django.utils.translation import gettext_lazy

class MyAdminSite(AdminSite):
    site_title = gettext_lazy('PCPSForms Admin')
    site_header = gettext_lazy('PCPSForms Admin Secure Login')
    index_title = gettext_lazy('PCPSForms Administration')

admin_site = MyAdminSite()

# Register your models here.
admin.site.register(User)
admin.site.register(Form)
admin.site.register(Responses)