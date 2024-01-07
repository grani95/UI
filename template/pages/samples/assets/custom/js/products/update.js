async function getById(url){
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    var options= {
    method: 'Get',
    headers:myHeaders,
   // redirect: 'follow',
    origin:"https://localhost:7168",
  };
  
    try {
          let res = await fetch(url,options);
      //   return await res.json();
  return await res;
      } catch (error) {
          console.log(error);
      }
      //return await res;
  }

  function _(element)
  {
  return document.getElementById(element)
  }
  function open_modal(elemId)
  {
  _('modal_backdrop').style.display='block';
  _(elemId).style.display='block';
  _(elemId).classList.add('show');
  }
  function close_modal(elemId)
  {
  _(elemId).style.display='none';
  _(elemId).classList.remove('show');
  _('modal_backdrop').style.display='none';

  
  }
  
  async function updat(url,row) {
  
      var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: row,
    redirect: 'follow',
    origin:"https://localhost:7168"
  
  };
  var result =await fetch(url, requestOptions)
    .then(async response => await response.text())
    .then(async result => console.log(await result))
    .catch(error => console.log('error', error));
    return result
  }
  
  _('update_close_modal').onclick=function(){
    _('uproductID').value = '';
    _('uproductName').value = '';
  
    _('ucomp_name').value = '';
  
    _('usupport_rate').value = '';
  
    _('uproduct_type').value = '';
    document.getElementsByName("uresult").innerHtml=''
  document.getElementsByName("ustate")[0].checked = true
  close_modal("update_modal");
  }

document.getElementById('update_product_frm').addEventListener("submit",function(e){
e.preventDefault();
var companyID = document.getElementById("ucomp_name").getElementsByTagName('span')[0].innerText
var product_typeID = document.getElementById("uproduct_type").getElementsByTagName('span')[0].innerText

  console.log(companyID)
  console.log(product_typeID)

  let Name = document.getElementById("uproductName").value
  let rate = document.getElementById("usupport_rate").value
  let state = document.getElementById("uactive").checked  = true ? 1 : 0;

let row = {"Name":Name,
  "rate": rate,
  "state":state,
  "product_typeID":product_typeID,
  "companyID":companyID
}

})
document.getElementById('ucomp_name').addEventListener('input',async function(e){
  e.preventDefault();

  let url = "https://localhost:7168/api/companies/getByName/"+e.target.value;
  let data = await getData(url)
  if(data.status == 200){
  let comp = await data.json()
  autocomplete(e.target,"ucomp_name",comp);
  
  }
  })
  
document.getElementById('uproduct_type').addEventListener('input',async function(e){
  e.preventDefault();
  let url = "https://localhost:7168/api/product_types/getByName/"+e.target.value;
  let data = await getData(url)
  if(data.status == 200){
  let type = await data.json()
  autocomplete(e.target,"product_type",type);
  
  }
  })
  
  





  