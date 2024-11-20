from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .serializers import UserSerializer
from .models import User


class UserRegistrationView(CreateAPIView):
    """
      Vue pour gérer l'inscription des utilisateurs
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer