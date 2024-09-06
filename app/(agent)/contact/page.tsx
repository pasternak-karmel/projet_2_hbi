"use client";
import React, { useState } from "react";

const ContactAdminPage = () => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Problème de livraison",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Votre message a été envoyé avec succès !");
    setShowMessageBox(false); // Ferme la boîte de message après soumission
    setFormData({ name: "", email: "", subject: "Problème de livraison", message: "" }); // Réinitialise le formulaire
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-r from-blue-100 to-teal-100 pt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Contactez l'Admin</h1>

        <div className="flex flex-col items-center">
          <button
            onClick={() => setShowMessageBox(!showMessageBox)}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-full ring-4 ring-blue-300 hover:bg-blue-700 transition mb-8 shadow-lg"
          >
            {showMessageBox ? "Fermer la boîte de message" : "Envoyer un message"}
          </button>

          {showMessageBox && (
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 scale-105">
              <h2 className="text-3xl font-semibold mb-6 text-center text-teal-600">Envoyer un Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Votre email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Sujet</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="Problème de livraison">Problème de livraison</option>
                    <option value="Retard de livraison">Retard de livraison</option>
                    <option value="Changement de trajet">Changement de trajet</option>
                    <option value="Demande de congé">Demande de congé</option>
                    <option value="Problème avec le véhicule">Problème avec le véhicule</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Votre message..."
                    rows={5}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full ring-4 ring-green-300 hover:bg-green-600 transition shadow-lg"
                  >
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ContactAdminPage;
