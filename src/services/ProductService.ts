import { Request } from "express";
import { Product } from "../interfaces";
import { generateFakeProducts } from "../utils/fakeData";
import * as fs from "fs";
import {pathdata} from "./../utils/fakeData"
import { Pool } from "pg";
import { model as Model } from "../models/model";
// add data and return it
type ProductBody = {
  title: string;
  price: number;
  description: string;
  imageUrl: string ;
};
export default class ProductService {
    model : Model = (new Model( ) );
  cll = this; 
   constructor(private products: Product[]=[]) {
    let datac :Product[];
    this.products =  products
   
  }  

 async  findAll(acc:number = 0,id:number): Promise<Product[]> {
  // to refresh the data from the data base :D "json"

    await this.refresh(acc , id );
    return this.products;
  }



 async  filterByQuery(user_id:number,filterQuery?: string ) {


    if (filterQuery) {
      const propertiesToFilter = filterQuery.split(",");
      
      let filteredProducts = [];
      filteredProducts = (await this.findAll(0 ,user_id )).map(product => {
        const filteredProduct: any = {};
        propertiesToFilter.forEach(property => {
          if (product.hasOwnProperty(property as keyof Product)) {
            filteredProduct[property] = product[property as keyof Product];
          }
        });
        return { id: product.id, ...filteredProduct };
      });
      return filteredProducts;
    }

    return await this.findAll(0 , user_id);
  }





async   getProductById(productId: number) {

    return await this.model.getPbyId(productId); 
  }

  
 async  createProduct(productBody: ProductBody , user_id:number) {
 
   
   let Newproduct = { ...productBody };
   await this.model.addProduct(user_id,Newproduct )

   await  this.findAll(0 , user_id);
    let len = this.products.length
   console.log("hello" , productBody ,len , (await this.findAll(0 , user_id))[len-1]);

   return  this.products[len-1];

  }

  
  async updateProductByid(id: number, productBody: ProductBody , user_id:number) {

    let updated= { ...(this.products[id-1]), ...productBody };
    this.model.updateProductsDatabase(id,updated)

    await  this.findAll(0, user_id)
    return this.products[id]

  }

 async  deleteProduct(id: number , user_id:number) {
  await   this.model.deleteProduct(id, user_id) ;
  
   return await this.findAll(0,user_id);


  }


   async refresh(acc:number = 0 , id :number):Promise<any>{ 

    if(! acc){
      // here we got the data and we will change it to sql querys ;
  let data =    await this.model.getAllProducts(id); 
  this.products = data ; 
}

  }

  async get_data(){ 
    return 
      // return await this.findAll();
      
  }
}
