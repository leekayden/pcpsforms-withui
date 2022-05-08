from django.contrib import admin
from .models import User, Choices, Questions, Answer, Form, Responses

# Register your models here.
admin.site.register(User)
admin.site.register(Form)