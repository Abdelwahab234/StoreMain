
let logoutSpan = document.querySelector(".logoutSpan");
let imglogout = document.querySelector(".imglogout");
let ulpar = document.querySelector(".ulpar");

window.onload = ()=> { 
  if (document.cookie.includes("UserCookie=")) { 
    logoutSpan.style.display = "inline"; 
    imglogout.style.display = "inline"; 
    // ulpar.style.display = "block "; 
  }else { 
    logoutSpan.style.display = "none"; 
    imglogout.style.display = "none"; 
    ulpar.style.display = "none"; 

  }
}

function main(){
console.log(logoutSpan);
  logoutSpan.onclick = logout;
  imglogout.onclick = logout;



} 








async function logout(){ 

  console.log(await fetch(`${window.location.origin}/clear`));
  window.location.href ="/login";



}













main()