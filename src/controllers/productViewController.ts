import { NextFunction, Request , Response}  from "express";
import ProductService from "../services/ProductService";
import { json } from "stream/consumers";
import dotenv from "dotenv";
dotenv.config({path : "W:/continue_from we start D/express mvc/nodejs-course-chapter-recording-mvc/nodejs-course-chapter-recording-mvc/src/.env"})
class ProductViewController{ 

    productService : ProductService;
    constructor(productService: ProductService){
        this.productService =productService;
        this.getProductById = this.getProductById.bind(this)
        this.getProducts= this.getProducts.bind(this)
        
        this.loginController= this.loginController.bind(this)
        this.ViewUser= this.ViewUser.bind(this)
        this.ViewProductUser= this.ViewProductUser.bind(this)

}
   loginController(req :Request , res :Response){
    console.log("###((((");
    res.render("./componants/login.pug");
    
  };

 async getProducts(req: Request, res:Response) {
  
  console.log(process.env.developmode);
  if(process.env.developmode != "1"){

    console.log(req.signedCookies.UserCookie.Accesstoken , req.cookies)
    }
    const filterQuery = req.query.filter as string;
 
    if (filterQuery) {
      res.send(await this.productService.filterByQuery(  req.signedCookies.UserCookie.id,filterQuery));
    } 
  
    res.render("products.pug",{products:(await this.productService.findAll( 0, req.signedCookies.UserCookie.id))});


  }

    async getProductById(req: any, res: any , next:NextFunction) {
      const productId = +req.params.id;
      let product = await this.productService.getProductById(productId);
       
      console.log(productId);
      if (isNaN(productId)) {
        res.status(404).send({ message: "Invalid product ID" });
        return ;

      }
  
    //   need render the return of servece edit on it pleat

      res.render("componants/viewProduct.pug",{products:(await this.productService.findAll( 0, req.signedCookies.UserCookie.id)) ,name:product.title , description:product.description , price:product.price , imgurl:product.imageurl});

    // will get the data of the product from this service 
      // res.send(await this.productService.getProductById(productId));

      
    }

    
      async ViewUser(req:Request,res:Response) {
          let idUser= +req.params.iduser ;
          console.log("#$#@$#@$", idUser); 
          // this in product view 
                // res.render("componants/viewProduct.pug",{products:(await this.productService.findAll( 0, idUser)) ,name:product.title , description:product.description , price:product.price , imgurl:product.imageurl});

    res.render("productUser.pug",{products:(await this.productService.findAll( 0, idUser)) , userid:idUser});


              }


      async ViewProductUser(req:Request , res:Response){
        console.log("im here #@")
        let productId = +req.params.idProduct 
        let userId = +req.params.idUser 
      let product = await this.productService.getProductById(productId);
       
      console.log(productId, product);
      if (isNaN(productId) ||isNaN(userId)|| product == undefined ) {
        res.render("componants/notFound.pug")
        return ;

      }
  
    //   need render the return of servece edit on it pleat

      res.render("componants/viewCustumer.pug",{products:(await this.productService.findAll( 0, userId)) ,name:product.title , description:product.description , price:product.price , imgurl:product.imageurl , userid:userId});



      }
}
export default ProductViewController; 
