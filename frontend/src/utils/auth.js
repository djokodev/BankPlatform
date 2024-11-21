import axios from 'axios';

export const validateToken = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/token/verify/', {
            token: token,
        });
        console.log("Token valide");
        return true;
    } catch (error) {
        console.error("Token invalide ou expiré :", error.response?.data);
        return false;
    }
};
