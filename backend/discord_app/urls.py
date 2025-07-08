from django.urls import path
from .views import RegisterView, ChannelListCreateView, MessageListCreateView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('channels/', ChannelListCreateView.as_view(), name='channels'),
    path('channels/<int:channel_id>/messages/', MessageListCreateView.as_view(), name='channel-messages'),
]
