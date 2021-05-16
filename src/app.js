const express = require("express");
const app = express();
const path = require('path');

require("./db/conn");
const Register = require("./models/registers"); 

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/signUp", (req, res)=>{
    res.render("signUp");
})

//create a new user in db
app.post("/signUp", async (req, res)=>{
    try{

        const password = req.body.password;
        const cpassword = req.body.password1;

        if(password === cpassword){
          const registerUser = new Register({ 
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.password1

        })

        const registered = await registerUser.save();
        res.status(201).render(index); 

        }else{
            res.send("password are not matching")
        } 
    
    } catch(error) {
        res.status(400).send(error);
    }
})

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
});

