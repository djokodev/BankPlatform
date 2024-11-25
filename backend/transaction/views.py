from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Transaction
from .serializers import TransactionSerializer, TransferSerializer, DepositSerializer, WithdrawSerializer
from .services import TransactionService
from rest_framework.exceptions import ValidationError
from django.db.models import Q
from .decorators import require_bank_account
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin


class TransactionViewSet(viewsets.GenericViewSet, ListModelMixin, RetrieveModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        queryset = Transaction.objects.filter(
            Q(account=self.request.user.bank_account) |
            Q(recipient_account=self.request.user.bank_account)
        )
        return queryset.order_by('-created_at')
    
    def get_serializer_class(self):
        if self.action == 'transfer':
            return TransferSerializer
        return TransactionSerializer

    @action(detail=False, methods=['post'])
    @require_bank_account
    def deposit(self, request):
        serializer = DepositSerializer(data=request.data)
        if serializer.is_valid():
            try:
                transaction = TransactionService.perform_deposit(
                    account=request.user.bank_account,
                    amount=serializer.validated_data['amount'],
                    description=serializer.validated_data.get('description', '')
                )
                return Response(
                    TransactionSerializer(transaction).data,
                    status=status.HTTP_201_CREATED
                )
            except ValidationError as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=False, methods=['post'])
    @require_bank_account
    def withdraw(self, request):
        serializer = WithdrawSerializer(data=request.data)
        if serializer.is_valid():
            try:
                transaction = TransactionService.perform_withdrawal(
                    account=request.user.bank_account,
                    amount=serializer.validated_data['amount'],
                    description=serializer.validated_data.get('description', '')
                )
                return Response(
                    TransactionSerializer(transaction).data,
                    status=status.HTTP_201_CREATED
                )
            except ValidationError as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=False, methods=['post'])
    @require_bank_account
    def transfer(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                recipient_account = serializer.validated_data['recipient_account']
                amount = serializer.validated_data['amount']
                description = serializer.validated_data.get('description', '')
                
                transaction = TransactionService.perform_transfer(
                    from_account=request.user.bank_account,
                    recipient_account_number=recipient_account,
                    amount=amount,
                    description=description
                )
                
                response_serializer = TransactionSerializer(transaction)
                return Response(
                    {
                        "message": "Transfert effectué avec succès",
                        "transaction": response_serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )
                
            except ValidationError as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except Exception as e:
                return Response(
                    {"error": "Une erreur inattendue s'est produite"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)