
import * as fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import path from "path";
type usertype =   {id:number,"email":string , password:string};
export  class UserService{ 
  constructor(){
    dotenv.config({path:path.join(__dirname,"..",".env")})
  }
  public async  serachUser(path:string , data :usertype):Promise<number>{ 
// will delete it when i configure it to data base sql 
      let database = JSON.parse(await fs.promises.readFile(path , "utf-8" ))["users"];
      let {email , password} =data; 
      console.log(database)
      let found = 0
    console.log(`${  database.forEach((index:any)=>{

      if(index.email == email && index.password == password)found= 1 ;

    })} <<< return find all`)

 
    return found; 


  }
   createToken(data:usertype){ 
    
    console.log(process.env.SECRET);
    return jwt.sign(data , process.env.SECRET as string , {
      expiresIn:"1d"
    })


    }

    tokenVertify(cookie : any):number{
        let token = cookie.UserCookie.Accesstoken
        try{
        if(token) {
          console.log(456456456564565464564 )
          let rs = jwt.verify(token,  process.env.SECRET as string );
          console.log(rs , "<<<jwt Body ")
        }
        else { 
          return 0;
        }
      }catch(error){ 
        console.log(error);
        return 0
      }
      return 1 
    
    }
}
