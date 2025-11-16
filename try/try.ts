import { model } from "../src/models/model";

 let mm= (new model()).reto();
 let m= (new model());
async function tr (){ 

  console.log((await m.getAllProducts(1)))
} 

tr()