require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

// Import des routes
const projectsRouter = require("./routes/project.route");
const userRouter = require("./routes/user.route");
const categorieRouter = require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const messageRouter = require("./routes/message.route");

// Middleware globaux
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE)
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas"))
  .catch(err => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  });

// Routes principales
app.use("/api/projects", projectsRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categorieRouter);
app.use("/api/scategories", scategorieRouter);
app.use("/api/messages", messageRouter);

// Route test
app.get("/", (req, res) => {
  res.send("Welcome To HEC Society!");
});

// Middleware d'erreur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;



/*
const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Routes
const projectsRouter = require("./routes/project.route");
const userRouter = require("./routes/user.route");
const categorieRouter = require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const messageRouter = require("./routes/message.route");

// Config dotenv
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à la base de données
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Successfully connected to MongoDB Atlas"))
.catch(err => {
  console.error("Database connection error:", err);
  // process.exit(1);
});

// Routes
app.use("/api/projects", projectsRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.use('/api/messages', messageRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome To HEC Society!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



module.exports = app;


/*const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Routes
const projectsRouter = require("./routes/project.route");
const userRouter = require("./routes/user.route");
const categorieRouter = require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const messageRouter = require("./routes/message.route");

// Config dotenv
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à la base de données (version corrigée)
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Successfully connected to MongoDB Atlas"))
.catch(err => {
  console.error("Database connection error:", err);
  process.exit(1);
});

// Routes
app.use("/api/projects", projectsRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.use('/api/messages', messageRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome To HEC Society!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;

/*const express=require('express');
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

  const mongoose = require('mongoose');
require('dotenv').config(); // Charge les variables d'environnement

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Connection error:", err));
  

// démarrage du serveur
app.listen(process.env.PORT, () => {
console.log(`Server is listening on port ${process.env.PORT}`); });
module.exports = app;*/