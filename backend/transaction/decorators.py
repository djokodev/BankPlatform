from functools import wraps
from rest_framework.response import Response
from rest_framework import status

def require_bank_account(view_func):
    @wraps(view_func)
    def wrapper(self, request, *args, **kwargs):
        if not hasattr(request.user, 'bank_account'):
            return Response(
                {"error": "Vous devez d'abord créer un compte bancaire"},
                status=status.HTTP_400_BAD_REQUEST
            )
        return view_func(self, request, *args, **kwargs)
    return wrapper