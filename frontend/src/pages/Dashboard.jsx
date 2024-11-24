import React, { useState, useEffect } from 'react';
import { FaWallet, FaExchangeAlt, FaMoneyBillWave, FaPlus, FaUser} from 'react-icons/fa';
import axios from 'axios';


const BankDashboard = () => {
  const [balance, setBalance] = useState(0); // Solde de l'utilisateur
  // const [recentTransactions, setRecentTransactions] = useState([]); // Transactions récentes
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(''); // Message d'erreur

  const recentTransactions = [
    {
      id: 1,
      type: 'Virement',
      amount: 1200,
      recipient: {
        name: 'Jean Dupont',
        accountNumber: 'FR7612345678901234'
      }
    },
    {
      id: 2,
      type: 'Paiement',
      amount: -350,
      recipient: {
        name: 'Supermarché Carrefour',
        accountNumber: 'FR7698765432109876'
      }
    },
    {
      id: 3,
      type: 'Transfert',
      amount: -85,
      recipient: {
        name: 'Marie Martin',
        accountNumber: 'FR7687654321098765'
      }
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-indigo-800">
            SwiftPay
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="bg-indigo-600 text-white px-4 py-2 rounded-full 
              flex items-center space-x-2 hover:bg-indigo-700 transition"
            >
              <FaUser />
              <span>Mon profil</span>
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-xl flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Solde Actuel
              </h2>
              <h3 className="text-5xl font-bold text-indigo-700">
                0 XFA
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-white rounded-2xl p-6 shadow-xl">
            {[
              { icon: <FaMoneyBillWave />, title: 'Dépôt', color: 'bg-green-500' },
              { icon: <FaExchangeAlt />, title: 'Transfert', color: 'bg-blue-500' },
              { icon: <FaWallet />, title: 'Retrait', color: 'bg-red-500' }
            ].map((action, index) => (
              <button 
                key={index}
                className={`flex flex-col items-center justify-center 
                p-4 rounded-xl transition-all duration-300 
                hover:scale-105 ${action.color} text-white`}
              >
                {action.icon}
                <span className="mt-2 text-xs">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Transactions Récentes
            </h2>
            <button className="text-indigo-600 hover:underline">
              Voir tout
            </button>
          </div>

          <div className="space-y-4">
            {recentTransactions.map(transaction => (
              <div 
                key={transaction.id}
                className="flex justify-between items-center 
                p-4 bg-gray-50 rounded-lg hover:bg-gray-100 
                transition duration-300"
              >
                <div>
                  <h3 className="font-medium">{transaction.type}</h3>
                  <p className="text-gray-500 text-sm">
                    {transaction.recipient.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {transaction.recipient.accountNumber}
                  </p>
                </div>
                <span 
                  className={`font-bold ${
                    transaction.amount > 0 
                    ? 'text-green-600' 
                    : 'text-red-600'
                  }`}
                >
                  {transaction.amount}€
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDashboard;