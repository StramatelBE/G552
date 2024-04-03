
const request = require("express");

// Middleware pour permettre à Express de traiter les données JSON
app.use(express.json());

// Route POST pour l'inscription
app.post('/auth/signup', (req, res) => {
  const user = req.body; // Obtenez les données utilisateur à partir de la requête

  // Votre logique pour traiter l'inscription ici
  // Par exemple, vous pouvez enregistrer l'utilisateur dans une base de données

  console.log('Utilisateur inscrit :', user);
});

// Fonction pour envoyer une requête d'inscription
const signUp = async (user) => {
  try {
    const response = await request('http://localhost:4000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log('Réponse du serveur :', data);
  } catch (error) {
    console.error(error);
  }
};

// Exemple de plusieurs utilisateurs à inscrire
const users = [
    { username: 'Football', password: 'A1234567', role: 'user' },
    { username: 'Basketball', password: 'A1234567', role: 'user' },
    { username: 'Tennis', password: 'A1234567', role: 'user' },
];

// Boucle pour effectuer les requêtes d'inscription
const signUpMultipleUsers = async () => {
  for (const user of users) {
    await signUp(user);
  }
};

// Appel de la fonction pour tester les requêtes d'inscription
signUpMultipleUsers();

// Point d'écoute pour l'application Express
app.listen(40000, () => {
  console.log('Serveur en cours d\'exécution sur le port 4000');
});
