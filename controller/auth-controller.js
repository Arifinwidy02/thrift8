const { Profile, User } = require('../models')
const bcrypt = require('bcrypt')

class userController {
    static register(req,res){
        res.render('register')
    }
    static postRegister(req,res){
        const {
            firstName,
            lastName,
            role,
            email,
            password
        } = req.body
        User.create({email, password})
        .then(newUser=>{
            console.log({firstName,lastName,role, userId: newUser.id});
            return Profile.create({firstName,lastName,role, UserId: newUser.id})
        })
        .then(result=>{
            res.redirect('/')
        })
        .catch(err=>{
            res.send(err)
            console.log(err);
        })

    }
    // static posRegister(req,res){
    //     // console.log(req.body);
    //     let{email,password,role,DepartmentId} = req.body
    //     let {name,gender,dateOfBirth,status} = req.body

    //     User.create({email,password,role,DepartmentId})
    //     .then((result) => {
    //         console.log(result);
    //         return Profile.create({name,gender,dateOfBirth,status,UserId:result.id})
    //     })
    //     .then((result)=>{
    //         // console.log(result,'result 2');
    //         // res.send(result)
    //         res.redirect('/login')

    //     })
    //     .catch((err) => {
    //         if (err.name === "SequelizeValidationError") {
    //             err = err.errors.map((e=>e.message))
    //             res.redirect(`/register?err=${err}`)
    //         } else{
    //         res.send(err)
    //         }
    //     });

}

module.exports = userController