 var productNameInput = document.getElementById('productNameInput');
 var productPriceInput = document.getElementById('productPriceInput');
 var productCategoryInput = document.getElementById('productCategoryInput'); 
 var addbtn= document.getElementById('addbtn');
 var updatabtn= document.getElementById('updatabtn');
 var productContainer ;
  if(localStorage.getItem('myProducts')!=null){
    productContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProduct(productContainer); 
  }else{
    productContainer=[];
 }
 function addProduct(){
    var product ={
        name : productNameInput.value,
        price : productPriceInput.value,
        category:productCategoryInput.value,
    }
    productContainer.push(product);
    console.log(productContainer);
    localStorage.setItem('myProducts',JSON.stringify(productContainer));
    clearForm();
    displayProduct(productContainer);
 }
 function clearForm(){
    productNameInput.value ="";
    productPriceInput.value ="";
    productCategoryInput.value ="";
 }
 function displayProduct(productList){
   var cartona=``;
   for(var i=0;i<productList.length;i++){
      cartona+=`
      <tr>
      <td>${i+1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td><button onclick="setFormForUpdate(${i}) "; class="btn btn-outline-warning">Update</button></td>
      <td><button onclick="deleteProduct(${i}) "; class="btn btn-outline-info">Delete</button></td>
      </tr>`

   }
   document.getElementById("tbodyTable").innerHTML = cartona;
 }
 
 function searchProducts(searchTerm){
   var searchResult = [];
  for(var i =0;i<productContainer.length;i++){
   if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true){
      searchResult.push(productContainer[i]);
      
   }
  }
  displayProduct(searchResult);
 } 
 function deleteProduct(deleteItem){
   productContainer.splice(deleteItem,1);
   localStorage.setItem('myProducts',JSON.stringify(productContainer));
    displayProduct(productContainer);

 }
 var x;
 function setFormForUpdate(updateIndex){
    x = updateIndex;
productNameInput.value=productContainer[updateIndex].name;
productPriceInput.value=productContainer[updateIndex].price;
productCategoryInput.value=productContainer[updateIndex].category;
updatabtn.classList.replace('d-none','d-inline-block');
addbtn.classList.add('d-none');

 }
 function updateProduct(){
//console.log(productContainer[u]);
productContainer[x].name=productNameInput.value;
productContainer[x].price=productPriceInput.value;
productContainer[x].category=productCategoryInput.value;
   localStorage.setItem('myProducts',JSON.stringify(productContainer));
   clearForm();
   displayProduct(productContainer);
   updatabtn.classList.replace('d-inline-block','d-none');
   addbtn.classList.replace('d-none','d-inline-block');
 }
 function validateProductName(){
   var regex =/^[A-Z][a-z]{3,8}$/;
   if(regex.test(productNameInput.value)==true){
      productNameInput.classList.replace('is-invalid','is-valid');
      return true;
   }
   else{
      productNameInput.classList.add('is-invalid');
      return true;
   }
 }