import React, { useState, useEffect } from "react";
import { createBankAccount } from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Account() {
  const [accountTypes, setAccountTypes] = useState([]); // Liste des types de compte
  const [selectedAccountType, setSelectedAccountType] = useState(""); // Type de compte sélectionné
  const [error, setError] = useState(""); // Message d'erreur
  const [success, setSuccess] = useState(""); // Message de succès
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const navigate = useNavigate();

  // Récupération des types de compte à partir de l'API
  useEffect(() => {
    const fetchAccountTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/account/types/");
        if (Array.isArray(response.data)) {
          setAccountTypes(response.data); // Stocke les types dans l'état
        } else {
          console.error("La réponse de l'API n'est pas un tableau:", response.data);
          setError("Impossible de charger les types de compte.");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des types de comptes:", err);
        setError("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    };

    fetchAccountTypes();
  }, []);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialise les erreurs
    setSuccess(""); // Réinitialise les messages de succès
    setLoading(true); // Active le chargement

    if (!selectedAccountType) {
      setLoading(false);
      setError("Veuillez sélectionner un type de compte.");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      setError("Vous devez être connecté pour créer un compte bancaire.");
      return;
    }

    try {
      const response = await createBankAccount(selectedAccountType, token);
      setSuccess(`Compte bancaire créé avec succès : ${response.account_number}`);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (err) {
      console.error("Erreur lors de la création du compte bancaire:", err);

      // Gestion des erreurs côté serveur
      const errorMessage = err.response?.status === 400
        ? (Array.isArray(err.response?.data) ? err.response?.data[0] : err.response?.data?.detail) || "Une erreur est survenue lors de la création du compte."
        : err.response?.data?.detail || err.message || "Une erreur inconnue est survenue.";
        
      setError(errorMessage); // Affiche l'erreur côté frontend
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Créez votre compte bancaire 🏦
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="accountType"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Type de compte :
            </label>
            <select
              id="accountType"
              value={selectedAccountType}
              onChange={(e) => setSelectedAccountType(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                -- Sélectionnez un type de compte --
              </option>
              {accountTypes.map((type) => (
                <option key={type.key} value={type.key}>
                  {type.value}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"
            }`}
            disabled={loading}
          >
            {loading ? "Chargement..." : "Créer"}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-sm text-green-600">
            {success}
          </p>
        )}
        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Account;
