const express=require("express");
const dotenv = require ("dotenv") ;
const connectDB = require ("./config/db") ;
const articleRouter=require("./routes/articleRoutes");
const userRouter=require("./routes/userRoutes");

dotenv.config();

const app=express();
const PORT =process.env.PORT || 3000;


app.use(express.json());

app.use("/api/articles",articleRouter);
app.use("/api/users",userRouter);

app.get("/",(req,res)=>{
    res.json ({ message : " API du Blog - Serveur Modulaire Opé rationnel ( SoC)" }) ;

});
(async()=>{
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`)
        });
    }catch (err){
        console.error('Erreur critique de demarrage du serveur :',err.message);
        process.exit(1);
    }
})();



