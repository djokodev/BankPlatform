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

    def create(self, request, *args, **kwargs):
      print("Données reçues:", request.data)  # Données envoyées par le frontend
      serializer = self.get_serializer(data=request.data)
      if not serializer.is_valid():
          print("Erreurs de validation:", serializer.errors)  # Affiche les erreurs côté backend
      return super().create(request, *args, **kwargs)
    

