let productsec = document.querySelector(".productsec"); 

let button_productsec = document.querySelector(".manageButton");
 let infosec = document.querySelector(".profilesec"); 
 let button_info = document.querySelector(".infoButton");
 
 let ProductsManage = document.querySelector(".ProductsManage");
async function main (){

  button_productsec.onclick = (e)=> {
    
    infosec.style.display = "none"; 
    productsec.style.display= "block"; 


  }


   button_info.onclick = (e)=> { 
    
    infosec.style.display = "block";
    
    productsec.style.display= "none" 
  }
  let product = await get_products()



}

async function get_products(){ 
  let data = await ( await fetch("http://localhost:4000/api/products")).json();

  console.log(data); 

}
main()