const express = require('express');
var multer = require('multer');
var dateTime = require('node-datetime');
const path = require('path');
const knex = require("../db/db.js");
var bodyParser = require("body-parser");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");
const SECRET_KEY=process.env.SECRET_KEY;

const app = express();

// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended:false}));

var date_time = new Date();




const signup = async (req,res) => {
    //Existing User Check
    //Hashed Password
    //User Creation
    //Token Generate

    const {name ,email ,phone , password}=req.body;
    
    try {
        const existingUser=await knex('user').where('email', email);
        
    //    console.log(existingUser.length);
        if(existingUser.length!=0)
        {
            return res.status(400).json({status: 400,user : null ,message :"User already exist!"});
        }

        const hashedPassword= await bcrypt.hash(password ,10);
        const objectValue= await knex('user').insert(
            { name: name , 
              email: email, 
              phone: phone, 
              password: hashedPassword , 
              createdAt: date_time, 
              updatedAt: date_time});

        const insertId = JSON.parse(objectValue);
        const Uservalue=await knex('user').where('id', insertId);
        const Newresult=JSON.stringify(Uservalue[0]);
        const result = JSON.parse(Newresult);
        // console.log(result.email);

        const token=jwt.sign({email : result.email , id : result.id}, SECRET_KEY);
        return res.status(201).json({status: 201 ,user : result ,token :token , message : "You have registered successfully"});
        
    } catch (error) {
        return res.status(500).json({status: 500 ,user : null , message : "Something went wrong"});
    }
}

const signin = async (req,res) => {

    const {email , password}=req.body;
    
    try {

        
        const existingUser=await knex('user').where('email', email);
        
    //    console.log(existingUser.length);
        if(existingUser.length==0)
        {
            return res.status(400).json({status: 400 ,message :"Invalid User!"});
        }

        const result=JSON.stringify(existingUser[0]);
        const objectValue = JSON.parse(result);
        const userPass=objectValue.password;
        // console.log(objectValue.password);
        const matchPassword= await bcrypt.compare(password , userPass);
        
        if(matchPassword==false)
        {
            return res.status(400).json({status: 400 ,message :"Invalid Credentials!"});
        }

        // console.log(objectValue.id);
        const token=jwt.sign({email : objectValue.email , id : objectValue.id}, SECRET_KEY);
        return res.status(201).json({status: 201 ,user : existingUser ,token :token});
        
    } catch (error) {
        return res.status(500).json({status: 500 ,message : "Something went wrong"});
    }
}


const notes = async (req,res) =>{
    // console.log("success");
    console.log(req.userId);
    return res.status(200).json({message :"Success"});
}

module.exports = {
    signup,
    signin,
    notes
}