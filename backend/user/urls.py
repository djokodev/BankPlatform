from django.urls import path
from .views import UserRegistrationView
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView, TokenVerifyView)


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
