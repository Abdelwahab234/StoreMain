import ProductService from "../services/ProductService";
import { NextFunction, Request, Response } from "express";
import { Product } from "../interfaces";
import { error } from "console";
import { model as Model} from "../models/model";
import { Pool } from "pg";

class ProductController {

  constructor(private productService: ProductService) {
    this.ApiProducts = this.ApiProducts.bind(this)
    this.createProduct= this.createProduct.bind(this)
    this.deleteProduct= this.deleteProduct.bind(this)   
    this.updateProduct= this.updateProduct.bind(this)
    this.getProductById= this.getProductById.bind(this)


  }

 


  

   async getProductById(req: any, res: any ) {
     const productId = +req.params.id;
     if (isNaN(productId)) {
       res.status(404).send({ message: "Invalid product ID" });
       return ;
      }
      let product = await this.productService.getProductById(productId);
      if (product){ 

        res.send({
          message : product
        });
      }else { 
        res.send({
          message : "Not Found"
        })
      }
      
      
      
      
    }



    


    async ApiProducts(req :Request , res :Response,next:NextFunction){

      let products = (await this.productService.findAll(0,req.signedCookies.UserCookie.id)); 

      res.json({Products:products, 
        count : products.length 
      } );
  }
  



 async createProduct(req: Request, res: Response) {
    const productBody = req.body;
    console.log(productBody , "hii$#$%#$%#%#$  " , req.signedCookies.UserCookie.id);

    res.status(201).send(await this.productService.createProduct(productBody,req.signedCookies.UserCookie.id));
  }




  async updateProduct(req: Request, res: Response) {
    const productId = +req.params.id;

    if (isNaN(productId)) {
      return res.status(404).send({
        message: "Product not found!",
      });
    }




    const productIndex: number | undefined = (await this.productService
      .findAll( 0, req.signedCookies.UserCookie.id ))
      .findIndex(product => product.id === productId)+1;
    const productBody = req.body;
    console.log("im here " , productBody);

    if (productIndex !== -1) {
      let prod = await this.productService.updateProductByid(productIndex, productBody , req.signedCookies.UserCookie.id);

      return res.status(200).send({
        message: "Product has been updated!",
        product : prod
      });
    } else {
      return res.status(404).send({
        message: "Product not found!",
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const productId = +req.params.id;

    if (isNaN(productId)) {
      return res.status(404).send({
        message: "Product not found!",
      });
    }

    const productIndex: number | undefined = (await this.productService
      .findAll(0 , req.signedCookies.UserCookie.id))
      .findIndex(product => product.id === productId);

    if (productIndex !== -1) {
      const filteredProduct = await this.productService.deleteProduct(productId,req.signedCookies.UserCookie.id);
      res.status(200).send(filteredProduct);
    } else {
      return res.status(404).send({
        message: "Product not found!",
      });
    }
  }

  
}

export default ProductController;
