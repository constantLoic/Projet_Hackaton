import React, { useState } from "react";

export default function Collaborateurs() {
  const [collaborateurs, setCollaborateurs] = useState([
    { id: 1, nom: "Marie Teuw", poste: "Développeuse" },
    { id: 2, nom: "Ismaila", poste: "Chef de projet" },
  ]);
  const [nouveauNom, setNouveauNom] = useState("");
  const [nouveauPoste, setNouveauPoste] = useState("");

  function ajouterCollaborateur() {
    if (!nouveauNom.trim() || !nouveauPoste.trim()) return;
    setCollaborateurs([
      ...collaborateurs,
      { id: Date.now(), nom: nouveauNom, poste: nouveauPoste },
    ]);
    setNouveauNom("");
    setNouveauPoste("");
  }

  function supprimerCollaborateur(id) {
    setCollaborateurs(collaborateurs.filter(c => c.id !== id));
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Collaborateurs</h2>
      <div className="mb-4 flex gap-2">
        <input
          className="border px-3 py-1 rounded"
          placeholder="Nom"
          value={nouveauNom}
          onChange={(e) => setNouveauNom(e.target.value)}
        />
        <input
          className="border px-3 py-1 rounded"
          placeholder="Poste"
          value={nouveauPoste}
          onChange={(e) => setNouveauPoste(e.target.value)}
        />
        <button
          onClick={ajouterCollaborateur}
          className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700"
        >
          Ajouter
        </button>
      </div>

      <ul className="space-y-3">
        {collaborateurs.map(({ id, nom, poste }) => (
          <li
            key={id}
            className="flex justify-between items-center border p-3 rounded shadow-sm"
          >
            <span>
              <strong>{nom}</strong> — {poste}
            </span>
            <button
              onClick={() => supprimerCollaborateur(id)}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
