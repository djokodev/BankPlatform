from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet

# Créer un router
router = DefaultRouter()
router.register('', TransactionViewSet, basename='transaction')

urlpatterns = router.urls