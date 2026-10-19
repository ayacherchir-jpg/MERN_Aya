const User = require('../models/userModel');

// 1. Créer un nouvel utilisateur (POST /api/users)
const createUser = async (req, res) => {
  try {
    const { name, email, age, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Le nom et l'email sont requis"
      });
    }
//"_id": "6ad552dd270d4a1714dc02de",
    // Vérification de doublon d'email
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({
        message: "Cet email est deja utilise"
      });
    }

    const user = await User.create({ name, email, age, role });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Obtenir tous les utilisateurs (GET /api/users)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Obtenir un utilisateur par son identifiant (GET /api/users/:id)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouve"
      });
    }

    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({message: 'Identifiant de ressource invalide (format ObjectId attendu)'});
    }
    res.status(500).json({message: err.message});
    }
};

const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({message: 'Utilisateur non trouve'});
    }

    const article = await Article.findOne({ author: id });

    if (article) {
      return res.status(400).json({message: 'Impossible de supprimer un utilisateur ayant des articles publies'});
    }
    await User.findByIdAndDelete(id);

    return res.status(200).json({message: 'Utilisateur supprime avec succes',id: id});

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({message: 'Identifiant de ressource invalide (format ObjectId attendu)'});
    }

    return res.status(500).json({message: err.message});
  }
};


module.exports = { createUser, getUsers, getUserById,deleteUser };