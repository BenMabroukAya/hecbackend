const express=require('express');
const mongoose =require("mongoose")
const dotenv =require('dotenv')
const cors = require('cors')
const app = express();



//const appointmentsRouter=require("./routes/appointment.route")
const projectsRouter=require("./routes/project.route")
const userRouter =require("./routes/user.route")
const categorieRouter =require("./routes/categorie.route")
const scategorieRouter =require("./routes/scategorie.route")
const messageRouter =require("./routes/message.route")



const path = require('path'); // Ajout de l'importation de path


//config dotenv
dotenv.config()


//Les cors
app.use(cors())


//BodyParser Middleware
app.use(express.json());


// Connexion à la base données
mongoose.connect(process.env.DATABASE)
.then(() => {console.log("DataBase Successfully Connected");})
.catch(err => { console.log("Unable to connect to database", err);
process.exit(); });
  


//app.use("/api/appointments",appointmentsRouter)
app.use("/api/projects",projectsRouter)
app.use('/api/users', userRouter);
app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.use('/api/messages', messageRouter);


//dist reactjs
//app.use(express.static(path.join(__dirname, './client/build'))); 

//app.get('*', (req, res) => { res.sendFile(path.join(__dirname,'./client/build/index.html')); });

//app.listen(process.env.PORT,()=>
    
//console.log(`application exécutée sur le port ${process.env.PORT}`))



// requête
app.get("/",(req,res)=>{
res.send("Welcome To HEC Society!");
});

//middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  

// démarrage du serveur
app.listen(process.env.PORT, () => {
console.log(`Server is listening on port ${process.env.PORT}`); });
module.exports = app;