const express = require('express');
var multer = require('multer');
const sessions = require('express-session');
const { validationResult, matchedData } = require('express-validator');
const { Validator } = require('node-input-validator');
var dateTime = require('node-datetime');
const path = require('path');
const knex = require("../db/db.js");

var fileUpload= require('../middlewares/upload-file');
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended:false}));



const list = (req,res, next) => {

    knex.select('id','name', 'email', 'phone').from('user')
      .then( function (result) {
        res.status(200).send(result);
        //   res.json({ success: true, message: 'ok' });     // respond back to request
       })
       .catch((error) => {
        console.log('Error : ' , error);
        });
    
    // if(req.session.user_id!=0 && req.session.loggedIn){
        // dbConn.query('SELECT * FROM brands',(error,results) => {
        //     if(error){
        //         console.log(error);
        //         req.flash('message', 'Flash is back!')
        //         res.redirect('/dashboard');
        //         //res.render('login',{layout:'loginLayout', error: "",invalidErr: "Invalid login Credential",data:req.body});
        //     }else{
        //         if (results.length > 0) {
        //             console.log(results);
        //             res.send(results);
        //             // res.render('brand-list', {brandlist:results,page_name :'brand-list'});
    
        //         }else{
        //             // res.render('brand-list', {brandlist:"",page_name :'brand-list'});
        //         }
        //     }
        // })
        //res.render('brand-list', {page_name :'brand-list'});
    // }else{
    //     res.redirect('/');
    // }
    
}

const add = (req,res, next) => {
    if(req.session.user_id!=0 && req.session.loggedIn){
        res.render('brand-add',{page_name :'brand-add'});
    }else{
        redirect('/')
    }
}
const store = (req,res, next) => {

    
    knex('user').insert({ name: req.body.name , email: req.body.email, phone: req.body.phone, password: req.body.password})
      .then( function (result) {
        res.status(200).send(result);
        //   res.json({ success: true, message: 'ok' });     // respond back to request
       })
       .catch((error) => {
        console.log('Error : ' , error);
        });

        // console.log(req.body);
    // const inputData = [[req.body.name, req.body.image, dateTime.create().format('Y-m-d H:M:S')]];
    // const inputData = [[req.body.name, req.body.email, req.body.phone , req.body.password]];
    //         dbConn.query("INSERT INTO user (name,email,phone,password) VALUES ?", [inputData], function (err, result) {
    //             if (err) throw err;
    //             res.status(200).send(result);
    //         });
    
    // var upload = multer({
    //     storage: fileUpload.brand.storage(),
    //     allowedFile: fileUpload.brand.allowedFile
    // }).single('file');

    // upload(req, res, function (err) {
    //     //console.log(req.file.originalname);
    //     if (err instanceof multer.MulterError) {
    //         res.send(err);
    //     } else if (err) {
    //         res.send(err);
    //     } else {
    //         console.log(req.files)
    //         const inputData = [[req.body.name, req.file.originalname, dateTime.create().format('Y-m-d H:M:S')]];
    //         dbConn.query("INSERT INTO brands (name,image,created_at) VALUES ?", [inputData], function (err, result, fields) {
    //             // if any error while executing above query, throw error
    //             if (err) throw err;
    //             // if there is no error, you have the result
    //             console.log(result);
    //             res.sendStatus(200);
    //         });

    //     }
    // })  
    
}

const edit = (req,res, next) => {
    const editId=req.params.id;

    knex('user').where('id',editId).first()
    .then( function (result) {
        res.status(200).send(result);
        //   res.json({ success: true, message: 'ok' });     // respond back to request
       })
       .catch((error) => {
        console.log('Error : ' , error);
        });

    // if(req.session.user_id!=0 && req.session.loggedIn){
        // dbConn.query('SELECT * FROM brands WHERE id='+editId,(error,results) => {
        //     if(error){
        //         console.log(error);
        //         req.flash('message', 'Flash is back!')
        //         res.redirect('/brand-list');
        //         //res.render('login',{layout:'loginLayout', error: "",invalidErr: "Invalid login Credential",data:req.body});
        //     }else{
        //         if (results.length > 0) {
        //             // console.log(results);
        //             res.status(200).send(results)
        //             // res.render('brand-edit', {brandlist:results,page_name :'brand-list'});
    
        //         }else{
        //             // res.render('brand-list', {brandlist:"",page_name :'brand-list'});
        //         }
        //     }
        // })
        //res.render('brand-list', {page_name :'brand-list'});
    // }else{
    //     res.redirect('/');
    // }
}

const update = (req,res,next) => {

    const editId=req.body.cid;
    // console.log(req.body.id);
    knex('user').where('id', editId).update({name: req.body.name , email: req.body.email, phone: req.body.phone, password: req.body.password}, ['id', 'name', 'email', 'phone', 'password'])
      .then( function (result) {
        // res.status(200).send(result);
          res.json({ success: true, message: result });     // respond back to request
       })
       .catch((error) => {
        // console.log('Error : ' , error);
        res.json({ error: true, message: 'sorry' });
        });
    // var upload = multer({
    //     storage: fileUpload.brand.storage(), 
    //     allowedFile:fileUpload.brand.allowedFile 
    // }).single('file'); 
    // console.log(req.body);
    // upload(req, res, function (err) {
    //     //console.log(req.file.originalname);
    //     if (err instanceof multer.MulterError) {
    //        res.send(err);
    //     } else if (err) {
    //        res.send(err);
    //     }else{
    //         if (req.file !== undefined) {
    //             const inputData = [[req.body.name, req.file.originalname]];
    //             dbConn.query("UPDATE brands SET ? WHERE id=?", [{name:req.body.name,image:req.file.originalname},req.body.id], function (err, result, fields) {
    //                 // if any error while executing above query, throw error
    //                 if (err) throw err;
    //                 // if there is no error, you have the result
    //                 console.log(result);
    //                 res.sendStatus(200);
    //             });
    //         }else{
    //             const inputData = [[req.body.name]];
    //             dbConn.query("UPDATE brands SET ? WHERE id=?", [{name:req.body.name},req.body.id], function (err, result, fields) {
    //                 // if any error while executing above query, throw error
    //                 if (err) throw err;
    //                 // if there is no error, you have the result
    //                 console.log(result);
    //                 res.sendStatus(200);
    //             });
    //         }
           
    //     }    
    // })
    
}

const userDelete = (req,res,next) => {

    const editId=req.body.id;
    // console.log(req.body.id);
    knex('user').where('id', editId).del()
      .then( function (result) {
        // res.status(200).send(result);
          res.json({ success: true, message: result });     // respond back to request
       })
       .catch((error) => {
        console.log('Error : ' , error);
        });
    
}

module.exports = {
    list,
    add,
    store,
    edit,
    update,
    userDelete
}