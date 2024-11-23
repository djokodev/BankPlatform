import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await loginUser(credentials);
            console.log('Utilisateur connecté:', response);
            navigate('/account');
            localStorage.setItem('access_token', response.access);
        } catch (error) {
            setError(error.response?.data?.detail || 'Une erreur est survenue');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">
                            {error}
                        </p>
                    )}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>

               {/* Texte et lien vers l'écran d'inscription */}
                <div className="text-center mt-4">
                    <span className="text-gray-600">Don't have an account? </span>
                    <button 
                        onClick={() => navigate('/register')}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Create one
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
