const produits = [
    { nom: 'Clavier', prix: 45 },
    { nom: 'Écran', prix: 320 },
    { nom: 'Souris', prix: 25 }
];
const { nom, prix } = produits[0];
console.log(nom);
console.log(prix);

const souris = produits.find(p => p.nom === 'Souris');
console.log(souris.prix);

const produitsMoins100 = produits.filter(p=>p.prix < 100);
console.log(produitsMoins100);

const avecRemise = prix => prix -prix*0.10;
console.log(avecRemise(320));