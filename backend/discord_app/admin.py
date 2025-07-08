from django.contrib import admin
from .models import CustomUser, Channel, Message
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(CustomUser, UserAdmin)
admin.site.register(Channel)
admin.site.register(Message)