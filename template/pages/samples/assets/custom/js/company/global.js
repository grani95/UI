var section = 1;
var page=1;
var limit = 5
var orderString = "companyID";
var term = "";
var DateFrom = "";
var DateTo = "";
var state="";
var rate= "";
var tbody = document.getElementById("tbody");
var next = document.getElementById("next")
var prev = document.getElementById('prev');
var start_row = document.getElementById('start_row')
var last_row = document.getElementById('last_row')
var totalLab = document.getElementById('total')
var orderByElement=document.getElementById("orderBy")
var orderElement=document.getElementById("order")
var limitElement = document.getElementById("limit")
var termElement = document.getElementById("term");
var stateElemet = document.getElementById("state");
var DateFromElemet = document.getElementById("DateFrom");
var DateToElemet = document.getElementById("DateTo");
var srch_frm = document.getElementById("srch-frm");
var resetSearchElements= document.getElementById("reset-element-btn")
var cc="" ;
let countryID="";
window.onload = async function () {
  if(localStorage.getItem('token') == null || localStorage.getItem('token') == "undefined"){
    window.location='http://127.0.0.1/front_end_api/template/pages/samples/login.html'
  }  
var url = "https://localhost:7168/api/companies/getPages";
let myHeaders = new Headers()
myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
var options = {
  method: 'GET',
  headers:myHeaders,
 // redirect: 'follow',
  origin:"https://localhost:7168",
};

async function getData(url,options,page,section,limit,orderString) {
    try {
        let res = await fetch(url+"?sort="+orderString+"&&page="+page+"&&section="+section+"&&limit="
        +limit+"&&term="+term+"&&state="+state+"&&support_rate="+rate+"&&countryID="+countryID+"&&DateFrom="+DateFrom+"&&DateTo="+DateTo,options);
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
  let result = await getData(url,options,page,section,limit,orderString)
  // document.getElementById("loader").style.display="none"

  if(result.status == 200){
      var users = await result.json()
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
var orderBy = orderByElement.value;
var order=orderElement.value
orderString = order+orderBy
 viewData(page,section,limit)
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
      update_li = document.createElement('li')
      update_li.classList.add("mdi")
      update_li.classList.add("mdi-lead-pencil")
      update_td.appendChild(update_li)
      item.appendChild(update_td)


      //   add show table column
      var show_td = document.createElement('td')
      show_td.classList.add("show-td")
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

orderByElement.addEventListener("change",function(e){
e.preventDefault();
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
rate = document.getElementById("rate").value;
state = document.getElementById("state").value;
DateFrom = document.getElementById("DateFrom").value;
DateTo = document.getElementById("DateTo").value;
viewData(page,section,limit)

})
resetSearchElements.addEventListener("click",function(e){
  e.preventDefault();
  termElement.value = ""
  //rouleElemet.value=""
  stateElemet.value=""
  DateFromElemet.value=""
  DateToElemet.value=""
  _('rate').value=''
  term = "";
  rate = ""
state = ""
Dtatefrom=""
DateTo=""
countryID =""
viewData(page,section,limit)


})
async function deleteUser(id){
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
  var url = "https://localhost:7168/api/companies/delete/"+id
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
deleteUser(id)

}
break;
}
case("show-td"):{
window.location = 'http://127.0.0.1/front_end_api/template/pages/samples/company.html?id='+id

  break;
}
case("update-td"):{
  var url = "https://localhost:7168/api/companies/get/"+id
  let company = getById(url)
  .then(async res=>{
    if(res.status == 200){
      let com = await res.json();
      console.log(com)
    _('ucountryID').value=res.comp_countryID
    //alert(com.comp_name)
   com.state == 0 ? document.getElementById("u_not_active").checked =true : document.getElementById("u_active").checked =true
   _('ucompanyName').value =  com.comp_name
   _('usupport_rate').value = com.support_rate
   _('update_code').value = com.country.code
   _('update_flag').classList.add("flag-icon") 
   _('update_flag').classList.add("flag-icon-"+com.country.code) 

   res.state == 1 ? document.getElementsByName("u_active").checked = true : document.getElementsByName("u_not_active").checked = true  

    }
    console.log(res)

   })
   open_modal("update_modal");

break;
}
default:{
  break;
}
}

})
// _('update_button').onclick=async function(e)
//   {
//   e.preventDefault()
//    if(_('uuserID').value == null || _('uuserID').value== "undefined"){
// alert("لقد حدث خطأ!!")
// }else{
// var state = document.getElementById("u_active").checked ? document.getElementsByName("ustate")[0].value: document.getElementsByName("ustate")[1].value;
// var roule = document.getElementById("u_admin").checked ? document.getElementsByName("uroule")[0].value: document.getElementsByName("uroule")[1].value;

//     var row = JSON.stringify({
//     "userID":_('uuserID').value,
//     "username": _('uusername').value,
//     "password": _('upassword').value,
//     "state": state,
//     "roule": roule,
//     "firestName":_('ufirestName').value,
//     "fatherName":_('ufatherName').value,
//     "sureName":_('usureName').value,
//     "email":_('uemail').value,
//     "tel":_('utel').value
//   });
//    var url = "https://localhost:7168/api/users/update"
//     await updateUser(url,row)
//     viewData(page,section,limit)

//   }
//     }
    _('add_button').onclick=async function(e)
{
e.preventDefault()
let url = "https://localhost:7168/api/companies/add";


let response = await addCompany(url)
if(response.status == 200){
show_massege(_('add_result'),"لقد تمت عملية الإضافة بنجاح","alert-success")

  viewData(page,section,limit)

}else{
  show_massege('add_result',"لقد حدث خطأ","alert-danger")

}


}



// let result_elem = document.getElementById("result")
// let msg = "لقد حدث خطأ"
// let msg1 = "لقد تمت العملية بنجاح"
//show_massege(result_elem,msg1,"alert-success")
function show_massege(elem,msg,type){
elem.innerHTML = ''
let div = document.createElement('div')
div.classList.add("alert")
div.classList.add(type)
div.innerText=msg
elem.appendChild(div)
}
async function getcountryInfo(term){
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
  var url = "https://localhost:7168/api/countries/getbyname?name="+term;
var options = {
method: 'GET',
headers:myHeaders,
// redirect: 'follow',
origin:"https://localhost:7168",
};
  var result = await fetch(url,options);
  var country =await  result.json()
  return country
}


document.getElementById("country_name").addEventListener("change",async function(e){
e.preventDefault()
let term = this.value
let flag = document.getElementById("add_flag")
  let name=document.getElementById("country_name")
  let code = document.getElementById("add_code")
  let ename=document.getElementById("ecountry_name")
if(term !== "" || term !=="undefined"){
    let term = document.getElementById("country_name").value;
    flag.classList.remove("flag-icon")
   if(cc !== "" ){
    flag.classList.remove(cc)
   }
    console.log(flag)
   getcountryInfo(term).then(country=>{
    name.value=country[0].arabicName;
    code.value=country[0].code;
    console.log(country)
    ename.value=country[0].name
    flag.classList.add("flag-icon")
    flag.classList.add("flag-icon-"+country[0].code)
    cc ="flag-icon-"+country[0].code
    console.log(flag)
   })}

})
document.getElementById("countryName").addEventListener("change",function(){

  let term = this.value
  if(term !== "" || term !=="undefined"){
    let flag = document.getElementById("flag")
    let name=document.getElementById("countryName")
    let code = document.getElementById("code")
    let term = document.getElementById("countryName").value;
      // name.value="";
      code.innerText="";
      flag.classList.remove("flag-icon-"+cc)
      // contienent = country[0].continent
      countryID = checkCountry(term).then(async r=>{
        console.log(r)
        if(r.status == 200){

         countryID = await r.json()
              flag.classList.add("flag-icon-"+name.value)


        }else{
      alert("البلد غير مسجلة")
      name.value = "" 
        }
     })  
  }
  
    //  name.value=country[0].arabicName;
    //  flag.classList.add("flag-icon-"+country[0].code)
    //  cc= country[0].code
  
  })

  _('pdf_export').addEventListener('click',async function(e){
    e.preventDefault()
    var headers = { id: "إسم الشركة", name: "نسبة الدعم", tel: "الحالة", email: "إسم البلد"}
    
    var filename = prompt("الرجاء إدخال إسم الملف");
    filename ? exportCSVFile(headers,users._data , filename) // call the exportCSVFile() function to process the JSON and trigger the download
      : null;
    
    })
viewData(page,section,limit)
_('display_username').innerText=localStorage.getItem('userName')
_('display_fullname').innerText=localStorage.getItem('fullName')
}