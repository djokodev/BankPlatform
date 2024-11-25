from django.db import models
import uuid

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('DEPOSIT', 'Dépôt'),
        ('WITHDRAWAL', 'Retrait'),
        ('TRANSFER', 'Transfert'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey('account.BankAccount', on_delete=models.PROTECT, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    recipient_account = models.ForeignKey('account.BankAccount', on_delete=models.PROTECT, 
                                        related_name='received_transactions', null=True, blank=True)
    status = models.CharField(max_length=20, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)
