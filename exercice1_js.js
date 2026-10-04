const express=require("express");
const app=express();
const PORT =3000;

app.get("/about", (req, res) => {
    res.json({
        application: "application",
        nom: "Aya",
        version: "1.0.0"
    });
});
const users = [
    { id: 1, name: "Aya", email: "aya@gmail.com" },
    { id: 2, name: "Ahmed", email: "ahmed@gmail.com" },
    { id: 3, name: "Admin", email: "admin@gmail.com" }
];
app.get("/api/users",(req,res)=>{
    const { name }=req.query;
    let resultat=users;
    if (name){
        resultat=users.filter(u=> u.name === name)
    }
    res.json({total: resultat.length, users: resultat})
});
app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(u=> u.id === id);
    if(!user){
        return res.status(404).json({error:`User ${id} not found`})
    }
    res.json(user);
});

app.use(express.json());
app.post("/contact",(req,res)=>{
    const { email, message } = req.body;
    if (!email || !message){
        return res.status(400).json({error:"email and message are required"});
    }
      res.status(200).json({message:"Merci, votre message a bien été reçu"});
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});