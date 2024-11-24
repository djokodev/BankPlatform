from django.urls import path
from account.views import BankAccountCreateView, AccountTypeListView


urlpatterns = [
    path('create-bank-account/', BankAccountCreateView.as_view(), name='create-bank-account'),
    path('types/', AccountTypeListView.as_view(), name='account-types'),
]
