from rest_framework import serializers
from .models import BankAccount
import uuid
from django.contrib.auth.decorators import login_required


@login_required
class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ["id", "account_number", "balance"]
        read_only_fields = ["balance", "account_number"]

    def create(self, validated_data):
        user = self.context["request"].user
        print("Validated Data: ", validated_data)
        validated_data["account_number"] = f"ACC{uuid.uuid4().hex[:10].upper()}"
        validated_data["user"] = user
        return super().create(validated_data)
