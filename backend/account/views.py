from rest_framework.generics import CreateAPIView
from .models import BankAccount
from .serializers import BankAccountSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny



class BankAccountCreateView(CreateAPIView):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise ValidationError("Vous devez être connecté pour créer un compte bancaire.")
        if BankAccount.objects.filter(user=self.request.user).exists():
            raise ValidationError("Un compte bancaire existe déjà pour cet utilisateur.")
        serializer.save(user=self.request.user)


class AccountTypeListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        account_types = [{"key": key, "value": value} for key, value in BankAccount.ACCOUNT_TYPE_CHOICES]
        return Response(account_types)