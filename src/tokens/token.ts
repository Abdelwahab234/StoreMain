import  express from "express";
import { setgroups } from "process";
const user_db = [
    {_id : 1 , email :"acvvfddf@gmail.com" , password :"30044534hopa#" , role:"user"},
    {_id : 2 , email :"hodacdee@gmail.com" , password :"gdfop34432#" , role:"user"}
]
class tokens { 
    app :typeof express | undefined; 
    rout :any ; 
    constructor(ex : typeof express){
        this.app = ex ; 

        this.rout = this.app.Router()


    }
    setup(){ 
        this.rout.route("/login").post((req:express.Request ,res:express.Response, next:express.NextFunction)=> {
            let {email , pass } =  req.body ;

           let user = user_db.filter( user=> user.email == email && user.password == pass)

            if (user.length === 0 ){ 
                res.send 
            }
        })
    }


}
