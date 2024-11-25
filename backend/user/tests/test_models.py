import pytest
from django.contrib.auth import get_user_model


User = get_user_model()

@pytest.fixture
def user_data():
    return {
        'username': 'testuser',
        'email': 'test@example.com',
        'phone_number': '+123456789',
        'first_name': 'John',
        'last_name': 'Doe',
        'password': 'password123',
        'country': 'FR'
    }

@pytest.mark.django_db
def test_create_user(user_data):
    User.objects.create_user(**user_data)
    assert User.objects.count() == 1

@pytest.mark.django_db
def test_automatic_creation_user_profile(user_data):
    user = User.objects.create_user(**user_data)
    assert hasattr(user, 'profile')

@pytest.mark.django_db
def test_missing_required_fields(user_data):
    user_data.pop('email')
    with pytest.raises(TypeError):
        User.objects.create_user(user_data)