from rest_framework.generics import CreateAPIView
from .models import BankAccount
from .serializers import BankAccountSerializer


class BankAccountCreateView(CreateAPIView):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)