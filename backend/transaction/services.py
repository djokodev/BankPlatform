from django.db import transaction as db_transaction
from rest_framework.exceptions import ValidationError
from account.models import BankAccount
from transaction.models import Transaction


class TransactionService:
    @staticmethod
    def perform_transfer(from_account, recipient_account_number, amount, description=""):
        try:
            recipient_account = BankAccount.objects.get(
                account_number=recipient_account_number
            )
            
            if from_account == recipient_account:
                raise ValidationError("Impossible de transférer vers votre propre compte")
            
            if amount <= 0:
                raise ValidationError("Le montant doit être supérieur à 0")
                
            if from_account.balance < amount:
                raise ValidationError("Solde insuffisant")

            # transaction atomique
            with db_transaction.atomic():
                transaction = Transaction.objects.create(
                    account=from_account,
                    recipient_account=recipient_account,
                    amount=amount,
                    transaction_type='TRANSFER',
                    description=description,
                    status='PROCESSING'
                )
                
                # Mettre à jour les soldes
                from_account.balance -= amount
                recipient_account.balance += amount
                
                from_account.save()
                recipient_account.save()
                
                # Marquer la transaction comme complétée
                transaction.status = 'COMPLETED'
                transaction.save()
                
                return transaction
                
        except BankAccount.DoesNotExist:
            raise ValidationError("Compte destinataire non trouvé")
        

    @staticmethod
    def perform_deposit(account, amount, description=""):
        """
        Effectue un dépôt sur un compte bancaire
        """
        try:
            if amount <= 0:
                raise ValidationError("Le montant du dépôt doit être supérieur à 0")

            with db_transaction.atomic():
                # Créer la transaction
                transaction = Transaction.objects.create(
                    account=account,
                    amount=amount,
                    transaction_type='DEPOSIT',
                    description=description,
                    status='PROCESSING'
                )

                # Mettre à jour le solde
                account.balance += amount
                account.save()

                # Marquer la transaction comme complétée
                transaction.status = 'COMPLETED'
                transaction.save()

                return transaction

        except Exception as e:
            raise ValidationError(f"Erreur lors du dépôt: {str(e)}")
        
    @staticmethod
    def perform_withdrawal(account, amount, description=""):
        """
        Effectue un retrait sur un compte bancaire
        """
        try:
            # Vérifications
            if amount <= 0:
                raise ValidationError("Le montant du retrait doit être supérieur à 0")

            if account.balance < amount:
                raise ValidationError("Solde insuffisant pour ce retrait")

            with db_transaction.atomic():
                # Créer la transaction
                transaction = Transaction.objects.create(
                    account=account,
                    amount=amount,
                    transaction_type='WITHDRAWAL',
                    description=description,
                    status='PROCESSING'
                )

                # Mettre à jour le solde
                account.balance -= amount
                account.save()

                # Marquer la transaction comme complétée
                transaction.status = 'COMPLETED'
                transaction.save()

                return transaction

        except ValidationError as e:
            raise e
        except Exception as e:
            raise ValidationError(f"Erreur lors du retrait: {str(e)}")