import {NextFunction, Request , Response} from "express";
import path from "path"
import {UserService} from "../services/UserService";
import { model as Model } from "../models/model";
 class UserController{


  url:string ; 
  userService :UserService;
  model  = new Model();
  constructor(){ 

    this.url = path.join(__dirname,".." , "dataBase" , "user.json");
    console.log(`data base url ${this.url}`);
    this.userService = new UserService() ; 
    this.userLoginApi = this.userLoginApi.bind(this);

    this.userLoginPage= this.userLoginPage.bind(this);
    this.CookieChecker= this.CookieChecker.bind(this);
    this.createCookie= this.createCookie.bind(this);
    this.usersingApi= this.usersingApi.bind(this);
    this.clearCookie= this.clearCookie.bind(this);
    

  }
  async userLoginApi(req:Request  , res:Response){ 
    console.log("im hereeee ")


  // let result = await this.userService.serachUser(this.url,{"email":req.body.email , "password":req.body.password});
  let rs = (await this.model.SearchAcount(req.body.email ,req.body.password));
   let result = rs.rowCount;
  
  if(result){
       let AccessCookie =  this.createCookie(rs.rows[0].id,req);


       res.cookie("UserCookie" ,{ id :rs.rows[0].id,...AccessCookie} , {signed:true})
        // we will send resbonse but the resbonse packet have the cookie  and the cookie have the data  
      res.json({message:"found"} );

    }else { 
      res.send({message:"not found"})
    }
 
    
  }

  userLoginPage(req : Request,res:Response){ 
    res.render("./componants/login")
  }
  CookieChecker(req:Request , res : Response  , next : NextFunction){ 
    // untill we in develop mode dont forgot delete it
    if (process.env.developmode == "1"){ 
    return  next();
    } 
    console.log('im here cooke' , req.url)
    let cookie = req.signedCookies ; 
    console.log(cookie) 
    if (( Object.keys(cookie).length === 0) && req.url !="/login"){ 
       res.redirect("/login");
      console.log('im here cooke333' , )

      
    }else { 
      console.log("hello wroldddd")
      let checktoken  = this.userService.tokenVertify(cookie);
      if(checktoken) return next();
      
      return res.redirect("/login")

    }
  }
  async usersingApi(req :Request  , res :Response) {


   
    console.log(req.body , " :: this is request body");
    if(await this.model.checkEmail(req.body.email)){
      console.log("im heemail")
 
      res.json({message:"ChangeTheEmail"});
    }else { 
   
// in here will call model method add the email to the data base because its not found in db 
    let id =  await  this.model.addAcount(req.body)
      res.cookie( "UserCookie",{ id :id, ...this.createCookie(id , req)}, {signed:true} );
      res.json({message:"Done"});

    }

  }

  createCookie(id:number, req:Request){
     let f = {"Accesstoken":this.userService.createToken({id:id,email:req.body.email , password:req.body.password})}
     return f ;
  }

      clearCookie(req:Request , res:Response){
      res.clearCookie("UserCookie" , {signed:true}) ;
        res.send("logedout");
    }
      getTheid(req:Request , res:Response){

        let id = req.signedCookies.UserCookie.id
        res.send({id:id});
    }

}


  export default UserController ; 
