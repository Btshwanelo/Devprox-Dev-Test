const url = '/api/v1/records'

window.onload = function(e){
  var tbody=document.getElementById('container1');
  fetch(url)
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

  fetch(url, {
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