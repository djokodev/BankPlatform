import axios from 'axios';

// Créer l'instance axios
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Fonction d'inscription
export const registerUser = async (userData) => {
  try {
    const response = await api.post('api/user/register/', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error.response?.data || error.message);
    throw new Error('Erreur lors de l\'inscription');
  }
};

// Fonction de connexion
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('api/user/login/', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la connexion');
  }
};

// Fonction pour rafraîchir le token
export const refreshToken = async (refreshToken) => {
  try{
    const response = await api.post('user/refresh/', { refresh: refreshToken });
    return response.data;
  }catch(error) {
    throw new Error('Erreur lors du rafraîchissement token');
  }
 
};

// Fonction pour créer un compte bancaire
export const createBankAccount = async (accountType, token) => {
  try {
    const response = await api.post(
      'api/account/create-bank-account/',
      { account_type: accountType }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du compte bancaire:', error.response?.data || error.message);
    throw new Error('Erreur lors de la création du compte bancaire');
  }
};

export default api;