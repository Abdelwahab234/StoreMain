import express, { Request, Response } from "express";
import { generateFakeProducts } from "./utils/fakeData";
import { Product } from "./interfaces";
import ProductController from "./controllers/productController";
import ProductService from "./services/ProductService";
import path from "path";
import router from "./routs/products";
import ProductViewController from "./controllers/productViewController";
import UserController from "./controllers/userController";
import errorhandle from "./middlewares/error"
import NotFoundMiddleWare from "./middlewares/notfound";
import helmet from "helmet";
import morgan from "morgan";
import cookieeparser from "cookie-parser";
import { model as Model  } from "./models/model"; 

import {rateLimit} from "express-rate-limit";
export let fakeProductsData :Product[] =[];
export let productService  : ProductService; 
export let productViewController : ProductViewController ; 
export let productController :  ProductController; 
let model  = new Model();

(async _=>{


  
  fakeProductsData= await generateFakeProducts();
  productService = new ProductService( fakeProductsData);
  
  productViewController = new ProductViewController(productService);
  productController = new ProductController(productService);
  console.log("hi")
  console.log("hi 2") 
  // middle ware of pre fix 
  // use check the first of route if true wi
  
  serverRun();
}



)() 

function serverRun(){ 
  let userController  = new UserController() 
  const app = express();
  app.use(express.json());

  app.use(cookieeparser(process.env.COOKIESECRET));
  app.use(express.static(path.join(__dirname , "public")))
  app.get("/login" ,userController.userLoginPage)
  app.post("/api/login" ,userController.userLoginApi);
  app.post("/api/singin" ,userController.usersingApi);





  
  // alot of modes or propertes of futures you can use it and show her futures in doc 
  // you can use custum reques (
  // {tokens.staus(req ,res )})
  app.use(morgan("dev"));
  
  app.use("/api/products",userController.CookieChecker,rateLimit({ 
    windowMs: 15 *60 * 1000,
    limit : 100,
    message:"You Crossed the line of Reaquests :D "    






  }))
  app.set("view engine", "pug");
  // app.use(helmet({ 
  //   contentSecurityPolicy:false
  //   ,
  //   xFrameOptions:{action:"deny"},
    

  // }));
  
  app.set("views", path.join(__dirname , "views"))
  app.use("/api/products" , router);
  
  app.get("/", userController.CookieChecker,(req, res) => res.render("componants/main.pug"));
  app.get("/products", userController.CookieChecker,productViewController.getProducts);
  app.get("/product/:id", userController.CookieChecker,(req, res, next) => productViewController.getProductById(req, res,next));
  app.get("/manage",userController.CookieChecker , (req :Request , res :Response )=> res.render("componants/manage" , { 
    link :`view/${req.signedCookies.UserCookie.id}`
  } ));
  app.get("/clear",userController.CookieChecker ,userController.clearCookie);
  app.get("/view/:iduser" ,productViewController.ViewUser);
  app.get("/product/view/:idUser/:idProduct" ,productViewController.ViewProductUser);
   
  app.use(express.json());

  // api 
  
  
  app.get("*", (req , res)=>{
    console.log("im worked")
    res.render("componants/notFound.pug");
  }); 
  // app.use(errorhandle.handle);
  // app.use(NotFoundMiddleWare.handle);
  const PORT: number = 4000;
  app.listen(PORT, () => {
    console.log(`Server running at => http://localhost:${PORT}/products`);
    
  });

  
}