import {Router}  from "express"
import e from "express"

import ProductService from "../services/ProductService";
import  productController from "./../controllers/productController";
import {generateFakeProducts} from "./../utils/fakeData";
import * as fs from "fs"
import errorHandle from "./../middlewares/error"
import {pathdata} from "./../utils/fakeData"
import path from "path";
fs.readFile(pathdata , "utf-8",async (error,data)=>{
    
let productServicee = new ProductService( await generateFakeProducts())


 
    init(new  productController(productServicee))



} )


// we prefix and re designd 

//  every method you call will return the same obj this make you make the indit of 3 rout in one line of one rout with diffrent methods 
// router.route("/api/products/:id").patch(updateProduct);
// router.route("/api/products/:id").delete(deleteProduct);
// router.route("/api/product/:id").get(getProductById);
// arrrow function method will not work bec this keyword the address of main obj will delete you can solve it by bynd the methods in constructore bedfore descrete it bind it when we make new obj from the class 
// this.updataProduct = this.updateProduct.bind(this)
// or make the methods like property and functions like arrow 
// like 
// updateProduct = ()=>{...}
// now we save a clean code 
let router = Router()
function init({updateProduct ,deleteProduct , getProductById , ApiProducts ,createProduct}:{
  getProductById: any;
  deleteProduct: any;
  updateProduct: any;
  ApiProducts: any;
  createProduct:any ;
}){
    
router.route("/:id").get(getProductById).delete(deleteProduct).patch(updateProduct);
router.route("/").get(ApiProducts).put(createProduct);
router.use(errorHandle.handle);
} 
export default router ;     