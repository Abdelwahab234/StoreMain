const { json } = require("stream/consumers");

  var data = {email : "hopaover@gmail.com" , 
    password : "godkfgopkdfg"
   }


   console.log(data);

async function  f(){   

   console.log(await fetch(`http://localhost:4000/api/login` , { 
    method:"POST",
    
    headers:{
      "Content-Type":"application/json"
    }
    ,
      body:JSON.stringify({"h":"csd"})

   }))
  
  }

f()