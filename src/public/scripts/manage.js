// const { render } = require("pug");

var productsec = document.querySelector(".productsec"); 

var button_productsec = document.querySelector(".manageButton");
 var infosec = document.querySelector(".profilesec"); 
 var button_info = document.querySelector(".infoButton");
 var product ;
 var ProductsManage = document.querySelector(".ProductsManage");
 var titleinput = document.querySelector("#titleinput");
 var DescriptionInput = document.querySelector("#DescriptionInput");
 var imgurlInput = document.querySelector("#imgurlInput");
 var  priceInput= document.querySelector("#priceInput");
 var Editmode = 0 ; 
 var ButtomEdit = document.querySelector("#ButtomEdit");
 var IdIn ;
 var formProductAdd = document.querySelector(".formProductAdd");
 var searchInput = document.querySelector(".searchInput");
 var clear = document.querySelector(".clear");
 var searchForm = document.querySelector(".searchForm");
 var plink = document.querySelector(".ulpar");
 var plink = document.querySelector(".link");

 search = []
async function main (){

plink.innerHTML = `${window.origin}/${plink.innerHTML}`

 
  button_productsec.onclick = (e)=> {
    
    infosec.style.display = "none"; 
    productsec.style.display= "block"; 


  }


   button_info.onclick = (e)=> { 
    
    infosec.style.display = "block";
    
    productsec.style.display= "none" 
  }
  
  formProductAdd.addEventListener("submit" ,  (e)=>{ 
    console.log("im here");
    e.preventDefault();
  })
  
  ButtomEdit.onclick = async ()=> { 
// this button have two conditions add or edit we will find that in editmode 
     let url =`${window.location.origin}/api/products/${IdIn}`;
     console.log(url);
    if(Editmode){ 
      console.log(await fetch( url , {
        headers:{
           "Content-Type": "application/json"
        } , 
        method:"PATCH",
        body:JSON.stringify(getProductInTheForm())
      } ))
      Editmode=0;
      formProductAdd.reset()
      ButtomEdit.innerHTML ="Add Product";
      renderProducts();
      
      
    }else { 
        console.log(await fetch(`${window.location.origin}/api/products` , {
          headers:{
             "Content-Type": "application/json"
          } , 
          method:"PUT",
          body:JSON.stringify(getProductInTheForm())
        } ))
        
        formProductAdd.reset()
        renderProducts();

        

        // add project condition ;
      }

  }


  searchInput.onkeyup = (e)=>{ 
if(searchInput.value.length != 0)
    searchProduct(searchInput.value)
  else renderProducts();


  }
  searchForm.addEventListener("submit" , (e)=> { 
    e.preventDefault();
  })

  clear.onclick = (e)=> { 
    searchForm.reset();
    renderProducts();
  }


  renderProducts()


}


async function get_products(){ 
  url =`${window.location.origin}/api/products`
  console.log("im here ", url)
  let data = await ( await fetch(url)).json();

  console.log(data); 
  return data.Products;

}
async function renderProducts(custum=0){ 
   product = await get_products()
   ProductsManage.innerHTML ="";
  var objs = []
  let len = custum ? search.length : product.length 
  for(let i = 0 ; i < len ; i++ ){ 
    ProductsManage.appendChild(createCard(custum ? search[i] : product[i] , i));
    objs.push(createCard(product[i]));
  }


}
function createCard(data , index){
  let dev = document.createElement("div")
  dev.className ="productcard"
dev.innerHTML = `
  <img src="${data.imageurl}" alt="">
  <h2>${data.title}</h2>
  <p>${data.description}</p>
  <small>${data.price}$</small>
  <div class="buttonscard">
    <button  onclick="deleteProduct(${data.id});">Delete</button>
    <button onclick="editProduct(${index})">Edit</button>

  </div>
`;
return dev

}

async function deleteProduct(e){ 
  product.splice(e-1,1);
  rs = await fetch(`${window.location.origin}/api/products/${e}` , {
    method:"DELETE"
  }) ;
console.log(rs)
renderProducts();

}


function editProduct(e){ 
  IdIn = product[e].id;
  Editmode = 1 ;
  titleinput.value = product[e].title;
  DescriptionInput.value = product[e].description;
  priceInput.value = product[e].price;
imgurlInput.value = product[e].imageurl;
  ButtomEdit.innerHTML ="Edit Product"
  window.scrollTo(0 , 0);
  
}
function getProductInTheForm(){ 
 return    {
  id : IdIn,
  title:  titleinput.value ,
  price :priceInput.value,
 description: DescriptionInput.value ,
imageUrl:imgurlInput.value 
    }
}
function searchProduct(data){ 
  search=[];
  ProductsManage.innerHTML =""
  product.forEach(index => {
    if (index.title.toLowerCase().startsWith(data.toLowerCase())){ 
      search.push(index);

    }
  })

  renderProducts(1);

  console.log(search);


}

main()