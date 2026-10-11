let users=[
    {id:1,name:'Aya',email:'aya@gmail.com',role:'admin'},
    {id:2,name:'Ahmed',email:'Ahmed@gmail.com',role:'IT'}
   
];
let prochainId=users.length +1;
const getAllUsers=(req,res)=>{
    const { role }=req.query;
    let resultat=users;
    if (role){
        resultat=users.filter(u=> u.role === role);
    }
    res.json({total: resultat.length, users: resultat});
};
const getUserById=(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(u=> u.id === id);
    if(!user){
        return res.status(404).json({error:`User ${id} not found`})
    }
    res.json(user);
    res.status(200).json({user:user});
};
const createUser=(req,res)=>{
    const {name,email,role}=req.body;
    if(!name || !email || !role){
        return res.status(400).json({error:`Name and email and role are required`});
    }
    const nouvelUser={id:prochainId,name:name,email:email,role:role};
    prochainId=prochainId +1;
    res.status(201).json({message:'User created',user:nouvelUser});
};
const deleteUser=(req,res)=>{
    const id = Number ( req. params .id) ;
    const userExiste = users.some (u => u.id === id) ;
    if (! userExiste ) {
    return res.status (404).json ({ error: `Impossible de supprimer : user ${id} introuvable` }) ;
    }
    // On filtre pour ne garder que les articles ayant un ID diff é rent
    users = users.filter (u => u.id !== id) ;
    res.status(200).json ({ message : `User ${id} supprimé avec succès` }) ;
};
module.exports={
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}
