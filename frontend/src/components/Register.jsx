import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import parsePhoneNumber from 'libphonenumber-js'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        country: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validatePhoneNumber = (phoneNumber, country) => {
        const phoneData = parsePhoneNumber(phoneNumber, country);
        if (!phoneData || !phoneData.isValid()) {
            return `Le numéro doit commencer par l'indicatif du pays (ex: +237 pour le Cameroun).`;
        }
        return null;
    };

    const validateCountryCode = (countryCode) => {
        const validCountryCodes = ['CM', 'FR', 'CI', 'US'];

        if (!validCountryCodes.includes(countryCode)) {
            return `Veuillez entrer un code ISO valide (ex: CM pour le Cameroun, FR pour la France).`;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const phoneError = validatePhoneNumber(formData.phone_number, formData.country);
        if (phoneError) {
            setError(phoneError);
            setIsLoading(false);
            return;
        }

        const countryError = validateCountryCode(formData.country);
        if (countryError) {
            setError(countryError);
            setIsLoading(false);
            return;
        }

        try {
            const response = await registerUser(formData);
            console.log('Utilisateur inscrit avec succès:', response);
            navigate('/login');
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
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="First name"
                            required
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Phone number"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country (Code ISO)"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
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
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                </form>

                 {/* Texte et lien vers l'écran de connexion */}
                <div className="text-center mt-4">
                    <span className="text-gray-600">Do you already have an account? </span>
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Connect
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;