
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");


var productNameAlert = document.getElementById("productNameAlert");
var productPriceAlert = document.getElementById("productPriceAlert");

var productList;

if(localStorage.getItem("ourProducts") == null)
    {
        productList = [];
    }
else
{
    productList = JSON.parse( localStorage.getItem("ourProducts"));
    displayProducts(productList);
}



function addProduct() {
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    productList.push(product);
    localStorage.setItem("ourProducts" , JSON.stringify( productList) );
    displayProducts(productList);
    clearForm();
}

function clearForm( ) 
{
    productNameInput.value = "";
    productPriceInput.value = "";
    productDescInput.value = "";
    productCategoryInput.value = "";

}
function displayProducts(anyArray) 
{
    var cartoona = "";
    for (var i = 0; i < anyArray.length; i++)
    {
        cartoona += `<tr>
                                <td>${i}</td>
                                <td>${anyArray[i].name}</td>
                                <td>${anyArray[i].price}</td>
                                <td>${anyArray[i].category}</td>
                                <td>${anyArray[i].desc}</td>
                                <td><button class="btn btn-warning">update</button></td>
                                <td><button onclick="deleteProduct(${i})"  class="btn btn-danger">delete</button></td>
                    </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}



function deleteProduct(index) {

    productList.splice( index, 1);
    localStorage.setItem("ourProducts" , JSON.stringify( productList) );
    displayProducts(productList);
}


var searchInput = document.getElementById("searchInput");

function searchProducts() 
{
    var searchTerm = searchInput.value;
    var wantedProducts = [];
    for(var i=0 ; i < productList.length ; i++)
    {
        if(productList[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true)
        {
            wantedProducts.push(productList[i]);
        }
    }
    displayProducts(wantedProducts);
}
function validProductName(productName)
{
    var regex = /^[A-Z][a-z]{3,6}$/
    if(regex.test(productName) == true)
    {
        productNameAlert.classList.replace("d-block" , "d-none")
        productNameInput.classList.remove("is-invalid")
        productNameInput.classList.add("is-valid")
    }
    else
    {
        productNameAlert.classList.replace("d-none" , "d-block")
        productNameInput.classList.remove("is-valid")
        productNameInput.classList.add("is-invalid")
    }
}

productNameInput.addEventListener("blur" , function(){
    validProductName(productNameInput.value)
})




function validProductPrice(productPrice)
{
    var regex = /(^[1-9][0-9]{2,3}|10000)$/
    if(regex.test(productPrice) == true)
    {
        productPriceAlert.classList.replace("d-block" , "d-none")
        productPriceInput.classList.remove("is-invalid")
        productPriceInput.classList.add("is-valid")
    }
    else
    {
        productPriceAlert.classList.replace("d-none" , "d-block")
        productPriceInput.classList.remove("is-valid")
        productPriceInput.classList.add("is-invalid")
    }
}

productPriceInput.addEventListener("blur" , function(){
    validProductPrice(productPriceInput.value)
})








