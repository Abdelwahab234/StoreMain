import { Pool, QueryResult} from "pg"
import dotenv from "dotenv"
import path from "path";
import { Product } from "../interfaces";
dotenv.config({path: "W:/continue_from we start D/express mvc/nodejs-course-chapter-recording-mvc/nodejs-course-chapter-recording-mvc/src/.env"}
)

export class model {

   async deleteProduct(id:number , id_user:number ) {
      this.deletetoJoin(id_user, id)
      await  this.pool.query("delete from products where id = $1" , [id]);
   }  
   async getPbyId(id:any){
      return (await this.pool.query("select * from products where id = $1" , [id])).rows[0]



   }

   addtoJoin(id:number,  id_p :number){
      this.pool.query("insert into join_products (user_id , product_id) VALUES($1 ,$2)" , [id ,id_p])
      console.log(id,  id_p , "<<< join data added ");

   }
   deletetoJoin(id:number,  id_p :number){
      this.pool.query("delete from join_products where user_id = $1 and  product_id = $2" , [id ,id_p])
      console.log(id,  id_p , "<<< join data added ");

   }

   async addProduct(id:number,data:any){ 
      let keys = Object.keys(data); 
      for( let i = 0 ; i < data.length ; i++)if(data[keys[0]]== undefined) return 

      let rs = await this.pool.query("insert into products (title , price , description ,  imageUrl) values($1 , $2 ,$3 ,$4) RETURNING id  " , [data["title" ] ,data["price"] , data["description"] ,data["imageUrl"]]);
      this.addtoJoin(id , rs.rows[0].id);
   }


  async countProducts(): Promise<number> {
    return   (await this.pool.query("select count(*) from products")).rows[0].count 
  } 

   pool: Pool  = new Pool({
      database :process.env.database, 
      user : process.env.user, 
      password : process.env.password
      ,
      host:process.env.host 
   }) ;
  constructor() {
   
    
  }
  async connect(){
     console.log (await this.pool.connect());
    console.log( (await this.pool.query("select * from products ; ")).rows);
  }
  reto():Pool{ 
   return this.pool ;
  }
  public async getAllProducts(idUser:number){ 
   return (await this.pool.query("select * from products where id in (select product_id from join_products where  user_id = $1  )",[idUser])).rows;
  }
//   you must make sure you send to update the full product obj
  async updateProductsDatabase( id : number, data :any ){

   await this.pool.query("update products set title = $1 , price = $2 ,  description = $3 , imageUrl = $4 where id = $5", [data.title , data.price, data.description ,data.imageUrl , data.id])
   

  }

  async SearchAcount(email : string , password :string ):Promise<QueryResult<any>> { 

   return await this.pool.query(`select * from users where  email=$1 AND password = $2 ` , [email  , password]);




  }
  async checkEmail(email:string):Promise<number | null>{

   return (await this.pool.query("select * from users where email = $1 " , [email])).rowCount;


  

  }
   async  addAcount(data:any) {

   let res =   (await this.pool.query("insert into users  (email , password ) values($1 ,$2 ) RETURNING id " , [data.email , data.password])).rows[0].id;
      return res;
  }   

  
}

