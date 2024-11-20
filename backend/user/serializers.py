from rest_framework import serializers
from .models import User
from phonenumber_field.serializerfields import PhoneNumberField


def generate_unique_username(first_name, last_name):
    base_username = f"{first_name.lower()} {last_name.lower()}"
    user_count = User.objects.filter(username__startswith=base_username).count()
    if user_count == 0:
        return base_username
    else:
        return f"{base_username} {user_count + 1}"

class UserSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone_number', 'password', 'first_name', 'last_name', 'country')
        extra_kwargs = {
            'password': {'write_only': True}, #Tu peux écrire (envoyer) une valeur pour ce champ lorsque tu crées ou modifies un objet. Mais tu ne peux pas lire (voir) ce champ dans la réponse de l'API.
            'username': {'read_only': True}, #Tu peux lire (voir) ce champ dans les réponses de l'API. Mais tu ne peux pas écrire (envoyer ou modifier) une valeur pour ce champ.
        }

    def create(self, validated_data):
        email = validated_data['email']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        phone_number = validated_data['phone_number']
        password = validated_data['password']
        country = validated_data['country']

        # Générer un username à partir du prénom et du nom
        username = generate_unique_username(first_name, last_name)

        user = User(
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            username=username,
            country=country
        )
        # chiffrer un mot de passe avant de le stocker dans la base de données.
        user.set_password(password)
        user.save()
        return user
