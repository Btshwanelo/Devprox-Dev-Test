// const url = '/api/v1/products'
// const fileFormDOM = document.querySelector('.file-form')

// const nameInputDOM = document.querySelector('#name')
// const priceInputDOM = document.querySelector('#price')
// const imageInputDOM = document.querySelector('#image')

// const containerDOM = document.querySelector('.container')
// let imageValue;

// // imageInputDOM.addEventListener('change',(e)=>{
// //  const file = e.target.files[0];
// //  console.log(file);
// // })







// imageInputDOM.addEventListener('change',async (e)=>{
//  const imageFile = e.target.files[0];
//  const formData = new FormData();
//  formData.append('image',imageFile)
//  try {
//   const {data:{image:{src}}} = await axios.post(`${url}/uploads`,formData,{
//    headers:{
//     'Content-Type':'multipart/form-data'
//    }
//   })
//   imageValue = src
//  } catch (error) {
//    imageValue = null
//   console.log(error);
//  }
// })


// fileFormDOM.addEventListener('submit',async (e)=>{
// e.preventDefault()
// const nameValue = nameInputDOM.value;
// const priceValue = priceInputDOM.value;
// try {
 
//  const product = {name:nameValue,price:priceValue,image:imageValue}
 
//   await axios.post(url,product);
//   fetchProducts()
// } catch (error) {
//  console.log(error);
// }
// })



// async function fetchProducts () {
//  try {
//   const {data:{products}} = await axios.get(url);
  
//   const productsDOM = products.map((product)=>{
// return `<article class="product">
// <img src="${product.image}" alt="${product.name}" class="img"/>
// <footer>
// <p>${product.name}</p>
// <span>$${product.price}</span>
// </footer>
// </article>`
//   }).join('')
//   containerDOM.innerHTML = productsDOM
//  } catch (error) {
//   console.log(error);
//  }
 
// }

// fetchProducts()


window.onload = function(e){
  var tbody=document.getElementById('container1');
  fetch('http://localhost:5000/api/v1/records')
  .then(res => res.json())
  .then(data =>{
    console.log("data",data.count)
    tbody.innerHTML = `<h1> there are ${data.count} imported records</h1>`
    }).catch((e)=>console.log(e))
}

const addCSV=(e)=>{
  e.preventDefault()
  const input = document.getElementById('fileinput');

  console.log(input.files[0]);

  var formData = new FormData()

  formData.append('file', input.files[0])

  fetch('http://localhost:5000/api/v1/records', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
  .then(data => {
    alert("CSV uploaded successfully");

    window.location.reload();
  })
  .catch((e)=>console.log(e))
}

document.getElementById('upload_form').addEventListener('submit',addCSV)