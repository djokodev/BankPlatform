from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings



class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, phone_number, password=None, **extra_fields):
        if not email:
            raise ValueError("L'utilisateur doit avoir une adresse email.")
        if not username:
            raise ValueError("L'utilisateur doit avoir un nom d'utilisateur.")
        if not phone_number:
            raise ValueError("L'utilisateur doit avoir un numéro de téléphone.")
        
        email = self.normalize_email(email)
        user = self.model(
            email=email, username=username, phone_number=phone_number, **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, phone_number, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Le superutilisateur doit avoir is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Le superutilisateur doit avoir is_superuser=True.")
        
        return self.create_user(email, username, phone_number, password, **extra_fields)
    

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = PhoneNumberField(unique=True)
    country = CountryField()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "phone_number", "first_name", "last_name"]
    
    objects = CustomUserManager()

    def __str__(self):
        return self.username


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile"
    )
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f'Profile de {self.user.username}'
