import { faker } from "@faker-js/faker";
import { Product } from "../interfaces";
import * as fs from "fs";
import path from "path";
export let pathdata :string= path.join(__dirname,"..", "fakedataStore" ,"Products.json") ;
export const generateFakeProducts = async (): Promise<Product[]> => {
    let acc = 0 ;
   
    let dataCheck = JSON.parse(await fs.promises.readFile(pathdata , "utf-8"))["Products"];
    if (dataCheck.length > 0){ 
      return dataCheck;
    }
 
    console.log("im here fuck")

    let data:Product[]= Array.from({ length: 25 }, (_, idx) => {
    return {
      id: idx + 1,
      title: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 100, max: 200 }),
      description: faker.commerce.productDescription(), 
      imageUrl: `https://picsum.photos/seed/${faker.string.alphanumeric(10)}/325/211`

    };



 
  });
  console.log(data)
  fs.writeFile("./src/fakedataStore/Products.json" , JSON.stringify({"Products":data} , null ,2 ),{"flag" : "w"} ,  (err)=>{ console.log(err)}  )
  return data;
};
