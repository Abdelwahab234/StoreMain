import { NextFunction ,Response , Request as t } from "express";
import dotenv from "dotenv";
import path from "path";
export default  class  NotFoundMiddleWare { 
// working in api % views 
static handle(req: t , res :Response , next : NextFunction){
    console.log("heloo mmmmm", req.originalUrl) 
    console.log(process.env.NODE_ENV);
    dotenv.config({
        path: path.join(__dirname,"..",".env")
    });
    if(req.originalUrl.startsWith("/api"))return res.status(500).render("componants/error.pug" , {title:`Api "${req.originalUrl}" Not Found` , status :500});
    
    
    res.status(404).render("componants/error.pug" , {title:`Not Found` , status:404});
    // if(req.originalUrl.startsWith("/product"))return res.status(500).json({
    //     message:"Error internal the Server",
    //     Stack :{ 
    //         "mode":process.env.NODE_ENV,
    //         "error Details": process.env.NODE_ENV =="development"  ? error.stack  : "no Details in Production Mode"
    //      }
    // });

        next();
}


}    