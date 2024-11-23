from django.db import models
from django.contrib.auth.models import AbstractUser
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings




class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = PhoneNumberField(unique=True)
    country = CountryField()

    # Rendre `username` facultatif
    username = models.CharField(max_length=150, blank=True, null=True, unique=True)

    # Utiliser `email` comme champ de connexion
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['phone_number','first_name','last_name']

    def full_name(self):
        """
        Retourne le nom complet de l'utilisateur.
        """
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return self.username
    

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)