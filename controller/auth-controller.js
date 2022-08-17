const { Profile, User } = require('../models')
const bcrypt = require('bcrypt')

class userController {
    static register(req,res){
        const errors = req.query
        res.render('register', {errors})
    }
    static postRegister(req,res){
        const {
            firstName,
            lastName,
            role,
            email,
            password
        } = req.body
        User.create({email, password, role})
        .then(newUser=>{
            console.log({firstName,lastName, userId: newUser.id});
            return Profile.create({firstName,lastName, UserId: newUser.id})
        })
        .then(result=>{
            res.redirect('/login')
        })
        .catch(err=>{
            let errors = err
            if(err.name == "SequelizeValidationError"){
                errors = err.errors.map(el=>{
                    return el.message
                })
            }
            res.redirect(`/register/?err=${errors}`)
        })

    }
    static login(req,res){
        const errors = req.query
        res.render('login', {errors})
    }
    static postLogin(req,res){
        const { email, password } = req.body
        User.findOne({where:{email}})
        .then(user=>{
            console.log(user);
            if(user){
                const isValidPassword = bcrypt.compareSync(password,user.password)
                if(isValidPassword){
                    req.session.UserId = user.id
                    req.session.role = user.role
                    console.log(req.session);
                    return res.redirect(`/`)
                } else {
                    const error = `invalid password and email`
                    return res.redirect(`/login?err=${error}`)
                }
            } else {
                const error = `account not registered`
                    return res.redirect(`/login?err=${error}`)
            }
        })
        .catch(err=>{
            res.send(err)
        })
    }
}

module.exports = userController