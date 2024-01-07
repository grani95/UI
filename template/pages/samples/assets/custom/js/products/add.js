
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
  

_('add_data').onclick=function(){
    open_modal("add_modal");
    
}
_('add_close_modal').onclick=function(){
  _('productName').value = '';

  _('comp_name').value = '';

  _('usupport_rate').value = '';
_('files').value='';
  _('product_type').value = '';
_("result").innerHtml=''
_("result").innerText=''
    close_modal("add_modal");
}


async function update(url,row) {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
myHeaders.append("Content-Type", "application/json");


var requestOptions = {
method: 'PUT',
headers: myHeaders,
body: JSON.stringify(row),
redirect: 'follow',
origin:"https://localhost:7168"

};
var result =await fetch(url, requestOptions)
.then(async response => {return await response})
// .then(async result => console.log(await result))
.catch(error => console.log('error', error));
return result
}


function show_massege(elem,msg,type){
  elem.innerHTML = ''
  let div = document.createElement('div')
  div.classList.add("alert")
  div.classList.add(type)
  div.innerText=msg
  elem.appendChild(div)
  }
  async function getById(url){
    var myHeaders = new Headers();
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
  async function add(url,row){
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    
  var requestOptions = {
  method: 'POST',
  body: row,
  headers:myHeaders,
  redirect: 'follow'
  };
  
  let result = fetch(url, requestOptions)
  .then(async response => {return await response})
  //.then(result => console.log(result))
  .catch(error => console.log('error', error));
  return result;
  }
  
  
  
  async function getData(url){
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
   var requestOptions = {
  method: 'GET',
  headers:myHeaders,
  redirect: 'follow',
  };
  
  let result = fetch(url, requestOptions)
  .then(response => {return response})
  //   .then(result => {return result})
  .catch(error => console.log('error', error))
  return result;
  }
 
 
    function autocomplete(inp,elem_id, arr) {
        /*the autocomplete function takes two arguments,
       the text field element and an array of possible autocompleted values:*/
       var currentFocus;
       /*execute a function when someone writes in the text field:*/
           var a, b, i, val = inp.value;
           /*close any already open lists of autocompleted values*/
           closeAllLists();
           if (!val) { return false;}
           currentFocus = -1;
           /*create a DIV element that will contain the items (values):*/
           a = document.createElement("DIV");
           a.setAttribute("id", inp.id + "autocomplete-list");
           a.setAttribute("class", "autocomplete-items");
           /*append the DIV element as a child of the autocomplete container:*/
           inp.parentNode.appendChild(a);
           /*for each item in the array...*/
           for (i = 0; i < arr.length; i++) {
             /*check if the item starts with the same letters as the text field value:*/
             if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
               /*create a DIV element for each matching element:*/
               b = document.createElement("DIV");
               /*make the matching letters bold:*/
               b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
               b.innerHTML += arr[i].name.substr(val.length);
               b.setAttribute("id",arr[i].id)
               /*insert a input field that will hold the current array item's value:*/
               b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
               
      
               /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                   /*insert the value for the autocomplete text field:*/
                  let id = e.target.id
                  _(elem_id).value=id
      
                  inp.value =this.getElementsByTagName("input")[0].value;
                   /*close the list of autocompleted values,
                   (or any other open lists of autocompleted values:*/
                   closeAllLists();
               });
               a.appendChild(b);
             }
      
           }
       
      
       /*execute a function presses a key on the keyboard:*/
       inp.addEventListener("keydown", function(e) {
           var x = document.getElementById(inp.id + "autocomplete-list");
           if (x) x = x.getElementsByTagName("div");
           if (e.keyCode == 40) {
             /*If the arrow DOWN key is pressed,
             increase the currentFocus variable:*/
             currentFocus++;
             /*and and make the current item more visible:*/
             addActive(x);
           } else if (e.keyCode == 38) { //up
             /*If the arrow UP key is pressed,
             decrease the currentFocus variable:*/
             currentFocus--;
             /*and and make the current item more visible:*/
             addActive(x);
           } else if (e.keyCode == 13) {
             /*If the ENTER key is pressed, prevent the form from being submitted,*/
             e.preventDefault();
             if (currentFocus > -1) {
               /*and simulate a click on the "active" item:*/
               if (x) x[currentFocus].click();
             }
           }
       
       })
           
           
       
       function addActive(x) {
         /*a function to classify an item as "active":*/
         if (!x) return false;
         /*start by removing the "active" class on all items:*/
         removeActive(x);
         if (currentFocus >= x.length) currentFocus = 0;
         if (currentFocus < 0) currentFocus = (x.length - 1);
         /*add class "autocomplete-active":*/
         x[currentFocus].classList.add("autocomplete-active");
       }
       function removeActive(x) {
         /*a function to remove the "active" class from all autocomplete items:*/
         for (var i = 0; i < x.length; i++) {
           x[i].classList.remove("autocomplete-active");
         }
       }
       function closeAllLists(elmnt) {
         /*close all autocomplete lists in the document,
         except the one passed as an argument:*/
         var x = document.getElementsByClassName("autocomplete-items");
         for (var i = 0; i < x.length; i++) {
           if (elmnt != x[i] && elmnt != inp) {
             x[i].parentNode.removeChild(x[i]);
           }
         }
       }
       /*execute a function when someone clicks in the document:*/
       document.addEventListener("click", function (e) {
           closeAllLists(e.target);
       });
      
      
      }
      
      /*An array containing all the country names in the world:*/
      
      /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
      //autocomplete(document.getElementById("myInput"), countries);
  
    

 
 
  ///////     Add EventListeners  ////////////////////////////////
document.getElementById("add_product_frm").addEventListener('submit',async function(e){
  e.preventDefault();
  let companyID = _('comp_id').value

  let product_typeID = _('product_type_id').value
  console.log(companyID)
  console.log(product_typeID)

  let Name = document.getElementById("productName").value
  let barcode = "ghghghg"
  let rate = document.getElementById("support_rate").value
  let state = document.getElementById("active").checked  = true ? 1 : 0;
  let row = new FormData();
  row.append("Name",Name)
  row.append("rate", rate)
  row.append("state",state)
  row.append("product_typeID",product_typeID)
  row.append("barcode",barcode)
  row.append("companyID",companyID)
  row.append("userID",localStorage.getItem('userId'))
  let files=[]
  files = document.getElementById("files").files
  // console.log(files.length)
  // console.log(files)
  // console.log(files[1])
  let i =0
  for( i ;i < files.length;i++){
  //  console.log(files[i])
   row.append("logo",files[i],files[i].name)
  }
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
  
  let url = "https://localhost:7168/api/products/add"
  let result = await add(url,row)
  console.log(result)
  if(result.status == 200){
   let result_elem = document.getElementById("result")
   show_massege(result_elem,"لقد تمت إضافة المنتج بنجاح","alert-success")
   viewData(page,section,limit,orderString)

  }else{
  
  show_massege(result_elem,"عذرا لقد حدث خطأ","alert-danger")
  
  }
  
  // console.log(result)
  })



document.getElementById('comp_name').addEventListener('input',async function(e){
e.preventDefault();
let url = "https://localhost:7168/api/companies/getByName/"+e.target.value;
let data = await getData(url)
if(data.status == 200){
let comp = await data.json()
autocomplete(e.target,"comp_id",comp);
}
})


document.getElementById('product_type').addEventListener('input',async function(e){
e.preventDefault();
let url = "https://localhost:7168/api/product_types/getByName/"+e.target.value;
let data = await getData(url)
if(data.status == 200){
let type = await data.json()
autocomplete(e.target,"product_type_id",type);
}
})

//////////////////////////////////////   End Add EventListener /////////////////////////////////////////////


///////     update    EventListeners  ////////////////////////////////


_('update_close_modal').onclick=function(){
  _('uproductID').value = '';
  _('uproductName').value = '';

  _('ucomp_name').value = '';

  _('usupport_rate').value = '';

  _('uproduct_type').value = '';
_("uresult").innerHtml=''
_("uresult").innerText=''

document.getElementsByName("ustate")[0].checked = true
close_modal("update_modal");
}

document.getElementById('update_product_frm').addEventListener("submit",async function(e){
e.preventDefault();

let companyID = _('ucomp_id').value

let product_typeID = _('uproduct_type_id').value
console.log(companyID)
console.log(product_typeID)

let Name = document.getElementById("uproductName").value
let rate = document.getElementById("usupport_rate").value
let state = document.getElementById("uactive").checked == true ? 1 : 0;

let row ={
"Name":Name,
"rate": rate,
"state":state,
"typeID":product_typeID,
"companyID":companyID,
"Id":_('uproductID').value
}
let url = "https://localhost:7168/api/products/update"
let response = await update(url,row)
console.log(response)
  if(response.status == 200){
    let uresult = _('uresult')
  show_massege(uresult,'لقد تم التعديل علي المنتج بنجاح','alert-success')
  viewData(page,section,limit,orderString)
  
  }else{
    show_massege(uresult,'لقد حدث خطأ','alert-danger')
  
  }
})
document.getElementById('ucomp_name').addEventListener('input',async function(e){
e.preventDefault();
let url = "https://localhost:7168/api/companies/getByName/"+e.target.value;
let data = await getData(url)
if(data.status == 200){
let comp = await data.json()
autocomplete(e.target,"ucomp_id",comp);

}
})

document.getElementById('uproduct_type').addEventListener('input',async function(e){
e.preventDefault();
let url = "https://localhost:7168/api/product_types/getByName/"+e.target.value;
let data = await getData(url)
if(data.status == 200){
let type = await data.json()
autocomplete(e.target,"uproduct_type_id",type);

}
})


//////////////////////////////////////   End update EventListener /////////////////////////////////////////////
