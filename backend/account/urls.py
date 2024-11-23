from django.urls import path
from account.views import BankAccountCreateView


urlpatterns = [
    path('create-bank-account/', BankAccountCreateView.as_view(), name='create-bank-account'),
]
