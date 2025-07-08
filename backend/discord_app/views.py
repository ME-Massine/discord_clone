from rest_framework import generics, permissions
from .models import Channel, Message
from .serializers import RegisterSerializer, ChannelSerializer, MessageSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class ChannelListCreateView(generics.ListCreateAPIView):
    queryset = Channel.objects.all().order_by('-created_at')
    serializer_class = ChannelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        channel_id = self.kwargs['channel_id']
        return Message.objects.filter(channel_id=channel_id).order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
