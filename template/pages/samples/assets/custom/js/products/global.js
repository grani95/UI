let section = 1;
let page=1;
let limit = 5
let orderString =[]
let term = "";
let DateFrom = "";
let DateTo = "";
let state =null;
let rate= null;
let country_id = null;
let company_name="";
let types = [];
let users;
let tbody = document.getElementById("tbody");
let next = document.getElementById("next")
let prev = document.getElementById('prev');
let start_row = document.getElementById('start_row')
let last_row = document.getElementById('last_row')
let totalLab = document.getElementById('total')
let orderByElement=document.getElementById("orderBy")
let orderElement=document.getElementById("order")
let limitElement = document.getElementById("limit")
let termElement = document.getElementById("term");
let stateElemet = document.getElementById("astate");
let DateFromElemet = document.getElementById("DateFrom");
let DateToElemet = document.getElementById("DateTo");
let srch_frm = document.getElementById("srch-frm");
let resetSearchElements= document.getElementById("reset-element-btn")
window.onload = async function () {
if(localStorage.getItem('token') == null || localStorage.getItem('token') == "undefined"){
  window.location='http://127.0.0.1/front_end_api/template/pages/samples/login.html'
}


async function getProductTypeByName(term) {
  let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

var url = "https://localhost:7168/api/product_types/getOneWithName/"+term;
var options = {
method: 'GET',
headers: myHeaders,
// redirect: 'follow',
origin:"https://localhost:7168",
};
  try {
      let res = await fetch(url);
return res;
      //  return await res.json();
  } catch (error) {
      console.log(error);
  }
}



async function getData(page,section,limit,orderString,country_stor) {
  var url = "https://localhost:7168/api/products/getPages";
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
   
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "sort": "productID",
  "country_stor": _('country_stor').checked,
  "page": page,
  "section": section,
  "limit": limit,
  "rate": rate,
  "state":state,
  "types": types,
  "term": term,
  "company_name": company_name,
  "countryID": country_id
});

var options = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
  try { 
        let res = await fetch(url,options);
      return res;
        //  return await res.json();
    } catch (error) {
        console.log(error);
    }
}
function sleep(time){
return new Promise((resolve)=>setTimeout(resolve,time))

}
async function createLoader(){
  var con =  document.getElementById("tbody")
  console.log(con)
  var loader = await document.createElement("div");
  await loader.classList.add("loader");
  await loader.classList.add("row");
  await loader.classList.add("justify-content-center");

  await loader.setAttribute("id","loader")
await con.appendChild(loader)

}
async function viewData(page,section,limit){
  await createLoader();
  // await sleep(5000)
   let result = await getData(page,section,limit,orderString, _('country_stor').checked)
  // document.getElementById("loader").style.display="none"
  if(result.status == 200){
       users = await result.json()
 if(users._data.length > 0){
  document.getElementById("loader").style.display="none"
drowTable(users._data)
pagenation(users._pageList,users._hasNext,users._hasPrev,users._limit,section,next,prev)
setLable(users._display_from,users._display_to,users._total)
 }else{
alert("لا توجد بيانات ")
document.getElementById("loader").style.display="none"

 }

  }


}
function sort(){
var orderBy=orderByElement.value;
var order=orderElement.value
console.log(orderByElement.options)
orderString = order+orderBy
 viewData(page,section,limit,orderString)
}
var drowTable = (data) => {
    var li;
    tbody.innerHTML = '';

    data.map((row) => {
      var item = document.createElement("tr")
      item.setAttribute("id",row.id)
      Object.entries(row).forEach(column => {
        if(column[0] != 'id'){
            var td = document.createElement("td")
        td.innerText = column[1]
        item.appendChild(td)
       }
        
     
      });

      var update_td = document.createElement('td')
      update_td.classList.add("update-td")
      update_td.classList.add("no_display")
      update_li = document.createElement('li')
      update_li.classList.add("mdi")
      update_li.classList.add("mdi-lead-pencil")
      update_td.appendChild(update_li)
      item.appendChild(update_td)


      //   add show table column
      var show_td = document.createElement('td')
      show_td.classList.add("show-td")
      show_td.classList.add("no_display")
      li = document.createElement('li')
      li.classList.add("fa-sharp")
      li.classList.add("mdi")
      li.classList.add("mdi-eye")
      li.style.color = "rgb(25 158 174)";
      show_td.appendChild(li)
      item.appendChild(show_td)

      //   add delete column 
      var del_td = document.createElement('td')
      del_td.classList.add("del-td")
      del_td.classList.add("no_display")
      var del_li = document.createElement('li')
      del_li.classList.add("mdi")
      del_li.classList.add("mdi-archive")
      del_li.style.color = "#f9343e";
      del_td.appendChild(del_li)
      item.appendChild(del_td)

      tbody.append(item);
    })}

    pagenation = (pageList,hasNext,hasPrev,limit,section,next,prev) => {     // drow pagenation element
        var start = (section *limit) - (limit-1)
      clearUl()
      var i =start;
      var last = pageList >= start+limit ? start+limit : pageList+1
    for (start; i < last; i++) {
      var li = document.createElement('li');
      li.setAttribute("class", "page-item")
      li.setAttribute("class", "list-item")
      li.setAttribute("id", i)
      var alink = document.createElement('a');
      alink.setAttribute("class", "page-link")
      if(page == i)
      alink.classList.add("class", "active")
      alink.innerText = i
      li.append(alink)
      next.before(li)

    }
    next.enabled = false;
    next.disabled = true;
    prev.enabled = false; 
    //return i
  }
  async function clearUl() { //   clear pagination list menue item  
    var ul = Array.from(document.getElementsByClassName("list-item"))
    ul.forEach(async (item) => {
      await item.remove()
    })

  }
  async function checkCountry(code){
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    let url = "https://localhost:7168/api/countries/get_id?code="+code
    var requestOptions = {
      method: 'GET',
      headers:myHeaders,
      redirect: 'follow',
      origin:"https://localhost:7168"
    };
    var result =await fetch(url, requestOptions)
      .then(async response => await response)
      .then(async result => {return await result})
      .catch(error => console.log('error', error));
    return await result;
    }

    function convertToCSV(objArray) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
  
      for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line != '') line += ','
  
          line += array[i][index];
        }
  
        str += line + '\r\n';
      }
  console.log(str)
      return str;
    }

    function exportCSVFile(headers, items, fileTitle) {
      if (headers) {
        items.unshift(headers);
      }
  
      // Convert Object to JSON
       var jsonObject = JSON.stringify(items);
      
      var csv = convertToCSV(jsonObject);
  
      var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
  
      var blob = new Blob(["\uFEFF"+csv], { type: 'text/csv;charset=utf-8' });
      if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
      } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
  


  document.getElementById('pagenation').addEventListener('click', function (e) {   // fill table with list point  
    e.preventDefault();
    page = e.target.closest(".list-item").getAttribute('id')
viewData(page,section,limit)
  })
  var setLable = (_display_from, _display_to,total) => {
    start_row.innerText = _display_from   // str start menue lable pagenation element 
    last_row.innerText = _display_to    //  lst last menue lable pagenation element 
    totalLab.innerText = total    // total number of data
  }
next.addEventListener("click",function(e){
e.preventDefault();
section++;
viewData(page,section,limit)

})
prev.addEventListener("click",function(e){
e.preventDefault();
section !== 1 ? section-- : 1 
viewData(page,section,limit)

})

orderByElement.addEventListener("blur",function(e){
e.preventDefault();
console.log(orderByElement.value)
sort()
})
orderElement.addEventListener("change",function(e){
e.preventDefault();
sort()
})
limitElement.addEventListener("change",function(e){

e.preventDefault()
page=1;
limit = e.target.value !== null ||  e.target.value !== "undefined" ?  e.target.value : 5
viewData(page,section,limit)

})
srch_frm.addEventListener("submit",function(e){
e.preventDefault();
page = 1;
term = document.getElementById("term").value;
rate = document.getElementById("arate").value  == "" ? null :  document.getElementById("arate").value;
state = document.getElementById("astate").value == "" ? null :  document.getElementById("astate").value ;
DateFrom = document.getElementById("DateFrom").value  == "" ? null :  document.getElementById("DateFrom").value;
DateTo = document.getElementById("DateTo").value  == "" ? null :  document.getElementById("DateTo").value;
company_name=_('company_name').value

viewData(page,section,limit)

})
resetSearchElements.addEventListener("click",function(e){
  e.preventDefault();
  termElement.value = ""
  //rouleElemet.value=""
  stateElemet.value=""
  DateFromElemet.value=""
  DateToElemet.value=""
  _('company_name').value=""
  _('country_code').value=""
  _('type_id').value=""
  _('rate').value=""
  console.log(_('rate'))
  term = "";
  company_name=""
  rate = ""
state = ""
Dtatefrom=""
DateTo=""
country_id =""
types = []
viewData(page,section,limit)


})
async function remove(id){
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
  var url = "https://localhost:7168/api/products/delete/"+id
  var options= {
  method: 'Delete',
  headers:myHeaders,
 // redirect: 'follow',
  origin:"https://localhost:7168",
};

  try {
        let res = await fetch(url,options);
        viewData(page,section,limit)

        return await res.text();

    } catch (error) {
        console.log(error);
    }
}
document.getElementById("tbody").addEventListener("click",async function(e){
e.preventDefault();
let name = e.target.closest("tr").cells[0].innerText
var id = e.target.closest("tr").getAttribute('id');
var action = e.target.closest("td").getAttribute('class');
switch(action.split(' ')[0]){
case("del-td"):{
var conf = confirm("هل أنت متأكد من حذف الشركة "+name+"؟ ")
if(conf){
remove(id)

}
break;
}
case("show-td"):{
window.location = 'http://127.0.0.1/front_end_api/template/pages/samples/productArchive.html?id='+id

  break;
}
case("update-td"):{
  var url = "https://localhost:7168/api/products/get/"+id
  let response = await getById(url)
  if(response.status == 200){

  let product = await response.json()
  console.log(product)
  _('uproductID').value = product.id;
  _('uproductName').value = product.productName;

  _('ucomp_name').value = product.compName;
  _('ucomp_id').value = product.compId;
  _('usupport_rate').value = product.rate;

  _('uproduct_type').value = product.typeName;
  _('uproduct_type_id').value = product.typeId;

  product.state ?_('uactive').checked=true :  _('unot_active').checked=true ;

    open_modal("update_modal");

  }else{
alert("عذرا لقد حدث خطأ!")

  }

break;
}
default:{
  break;
}
}

})

_('country_stor').addEventListener('change',async function(e){
  await viewData(page,section,limit)

})

_('country_code').addEventListener('blur',async function(e){
e.preventDefault()
if(e.target.value == '')
return false;
let result = await checkCountry(e.target.value)
if(result.status == 200){
  country_id = await result.json()

}else{
  
alert("لم يتم تسجيل البلد!")

}

})

_('pdf_export').addEventListener('click',async function(e){
e.preventDefault()
var headers = { id: "إسم المنتج", name: "نسبة الدعم", tel: "الحالة", email: "الشركة", egincy: "البلد", address: "نوع النتج" }

var filename = prompt("الرجاء إدخال إسم الملف");
filename ? exportCSVFile(headers,users._data , filename) // call the exportCSVFile() function to process the JSON and trigger the download
  : null;

})

_('type_id').addEventListener('blur',async function(e){
var term =e.target.value
let result = await getProductTypeByName(term)
if(result.status == 200){
types = await result.json()
}
})
    
await viewData(page,section,limit)
_('display_username').innerText=localStorage.getItem('userName')
_('display_fullname').innerText=localStorage.getItem('fullName')
}