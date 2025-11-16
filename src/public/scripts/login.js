
let login_button = document.querySelector(".loginButton");

let form = document.querySelector(".loginForm");

let loginMode = 1;

let repassword = document.querySelector("#repassword");

let labelpass = document.querySelector(".labelpass");

let signInButton= document.querySelector(".signInButton");
 
let signAccP =  document.querySelector(".signAccP");

let emailLabel =  document.querySelector(".emailLabel");


console.log("im here" , login_button , form)
login_button.onclick= _=>{ 
  console.log("clicked");
} 

form.addEventListener("submit" ,async (e)=>{ 
  e.preventDefault()
  let data = {email : form.email.value , 
    password : form.password.value
   }
   console.log(data );

  if(loginMode){ 
    
    let resbonse = await fetch(`${window.location.origin}/api/login` , { 
    method:"POST"
    ,
    headers:{
      "Content-Type":"application/json"
    }  
    
    ,

      body:JSON.stringify(data)
   })
   

   if((await resbonse.json()).message =="found"){
    window.location.href = window.origin +"/";
    
   }else{ 

        
    emailMessage("Wrong Email Or Password");


   }
  
  
  }
   
   
   else { 
    if(form.password.value != form.repassword.value){ 
      
      labelpass.innerHTML = `
    Re Password <span style="color:red;" > :Pleasee Type The Same Password </span>
        `;
        form.repassword.style.color ="red";
     setTimeout( () => {
labelpass.innerHTML = `
    Re Password
        `;




      },3000);
       
    }else{
      console.log(`${this.location.origin}/api/singin`);
       let rs=await ( await fetch(`${this.location.origin}/api/singin` ,{ 
           method:"POST" 
            ,
          headers:{
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
           
            email:form.email.value 
            ,
            password:form.password.value 

          })
        }) ).json()

        console.log(rs);
       if(rs.message == "Done"){ 
        
     window.location.href = window.origin +"/";

       }else {
        emailMessage(" This Email Have Already Acount "); 



       }
          
   
       
    }





   }
   
})

signInButton.onclick = (e)=> { 

  if(loginMode){
  labelpass.style.display ="block";
  form.repassword.style.display ="block";
  loginMode = 0 ;
  
    signAccP.value="Have Acount Already  ? ";
    signInButton.innerHTML ="Login Here";
  }else{ 
      labelpass.style.display ="none";
  form.repassword.style.display ="none";
  loginMode = 1;
  
    signAccP.value="Dont have an account? ";
    signInButton.innerHTML ="Sign in here";
  }
}

function emailMessage(message){

  emailLabel.innerHTML = `
    Email <span style="color:red;" > ${message} </span>
        `;

        form.password.style.color ="red";
        form.email.style.color ="red";
     setTimeout(  () => {


emailLabel.innerHTML = `
    Email
        `;
        console.log("hello")
        form.password.style.color ="#000";
        form.email.style.color ="#000";

      
      },3000);    
}