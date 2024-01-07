let  section = 1;
let  page=1;
let  limit = 5
let  orderString = "userID";
let  term = "";
let  DateFrom = "";
let  DateTo = "";
let  state="";
let  roule= "";
let  tbody = document.getElementById("tbody");
let  next = document.getElementById("next")
let  prev = document.getElementById('prev');
let  start_row = document.getElementById('start_row')
let  last_row = document.getElementById('last_row')
let  totalLab = document.getElementById('total')
let  orderByElement=document.getElementById("orderBy")
let  orderElement=document.getElementById("order")
let  limitElement = document.getElementById("limit")
let  termElement = document.getElementById("term");
let  rouleElemet= document.getElementById("roule");
let  stateElemet = document.getElementById("state");
let  DateFromElemet = document.getElementById("DateFrom");
let  DateToElemet = document.getElementById("DateTo");
let  srch_frm = document.getElementById("srch-frm");
let  resetSearchElements= document.getElementById("reset-element-btn")
if(localStorage.getItem('token') == null || localStorage.getItem('token') == "undefined"){
  window.location='http://127.0.0.1/front_end_api/template/pages/samples/login.html'
}

window.onload = async function () {
  let myHeaders = new Headers()
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
  var url = "https://localhost:7168/api/users/getPages";
var options = {
  method: 'GET',
  headers:myHeaders,
 // redirect: 'follow',
  origin:"https://localhost:7168",
};
async function getData(url,options,page,section,limit,orderString) {
    try {
        let res = await fetch(url+"?sort="+orderString+"&&page="+page+"&&section="+section+"&&limit="
        +limit+"&&term="+term+"&&state="+state+"&&roule="+roule+"&&DateFrom="+DateFrom+"&&DateTo="+DateTo,options);
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
      var users = await getData(url,options,page,section,limit,orderString).then(r=> {return r.json()})
 if(users._data.length > 0){
  document.getElementById("loader").style.display="none"
drowTable(users._data)
pagenation(users._pageList,users._hasNext,users._hasPrev,users._limit,section,next,prev)
setLable(users._display_from,users._display_to,users._total)
 }else{
alert("لا توجد بيانات مطابقة")
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
      // var show_td = document.createElement('td')
      // show_td.classList.add("show-td")
      // li = document.createElement('li')
      // li.classList.add("fa-sharp")
      // li.classList.add("mdi")
      // li.classList.add("mdi-eye")
      // li.style.color = "rgb(25 158 174)";
      // show_td.appendChild(li)
      // item.appendChild(show_td)

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
roule = document.getElementById("roule").value;
state = document.getElementById("state").value;
DateFrom = document.getElementById("DateFrom").value;
DateTo = document.getElementById("DateTo").value;
viewData(page,section,limit)

})
resetSearchElements.addEventListener("click",function(e){
  e.preventDefault();
  termElement.value = ""
  rouleElemet.value=""
  stateElemet.value=""
  DateFromElemet.value=""
  DateToElemet.value=""
  term = "";
  roule = ""
state = ""
Dtatefrom=""
DateTo=""
viewData(page,section,limit)


})
async function deleteUser(id){
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
  var url = "https://localhost:7168/api/users/delete/"+id
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
document.getElementById("tbody").addEventListener("click",function(e){
e.preventDefault();
let username = e.target.closest("tr").cells[0].innerText
var id = e.target.closest("tr").getAttribute('id');
var action = e.target.closest("td").getAttribute('class');
switch(action.split(' ')[0]){
case("del-td"):{
var conf = confirm("هل أنت متأكد من حذف المستخدم "+username+"؟ ")
if(conf){
deleteUser(id)

}
break;
}
// case("show-td"):{
// alert("show")
// break;
// }
case("update-td"):{
  // let myHeaders = new Headers();
  // myHeaders.append('token',this.localStorage.getItem('token'));
  var url = "https://localhost:7168/api/users/get/"+id
  let user = getById(url)
  .then(res=>{
    alert(res.roule)
    _('uuserID').value=id
    _('uusername').value=res.username
   res.state == 0 ? document.getElementById("u_not_active").checked =true : document.getElementById("u_active").checked =true
   res.roule == 1 ? document.getElementById("u_admin").checked = true : document.getElementById("u_user").checked=true
    _('ufirestName').value=res.firestName
    _('ufatherName').value=res.fatherName
    _('usureName').value=res.sureName
    _('uemail').value=res.email
    _('utel').value=res.tel
   })
   open_modal("update_modal");

break;
}
default:{
  break;
}
}

})
//let users = await getData(url,options,page,section,limit)
_('update_button').onclick=async function(e)
  {
  e.preventDefault()
   if(_('uuserID').value == null || _('uuserID').value== "undefined"){
alert("لقد حدث خطأ!!")
}else{
var state = document.getElementById("u_active").checked ? document.getElementsByName("ustate")[0].value: document.getElementsByName("ustate")[1].value;
var roule = document.getElementById("u_admin").checked ? document.getElementsByName("uroule")[0].value: document.getElementsByName("uroule")[1].value;

    var row = JSON.stringify({
    "Id":_('uuserID').value,
    "username": _('uusername').value,
    "PasswordHash": _('upassword').value,
    "state": state,
    "roule": roule,
    "firestName":_('ufirestName').value,
    "fatherName":_('ufatherName').value,
    "sureName":_('usureName').value,
    "Email":_('uemail').value,
    "PhoneNumber":_('utel').value
  });
   var url = "https://localhost:7168/api/users/update"
 let response = await updateUser(url,row)
    if(response.status == 200){
      show_massege(_("uresult"),"لقد تم التعديل بنجاح","alert-success")
    viewData(page,section,limit)

    }else{
      show_massege(_("uresult"),"لقد حدث خطأ!!","alert-danger")

    }


  }
    }
    _('add_button').onclick=async function(e)
{
e.preventDefault()
var url = "https://localhost:7168/api/userAccounts/Registration?returnUrl=https://localhost/front_end_api/template/pages/samples/blank-page.html";

var state = document.getElementById("active").checked ? document.getElementsByName("state")[1].value: document.getElementsByName("state")[2].value;
var roule = document.getElementById("admin").checked ? document.getElementsByName("roule")[1].value: document.getElementsByName("roule")[2].value;

console.log(document.getElementsByName("roule")[1])
console.log(document.getElementsByName("roule")[2])
var row = JSON.stringify({
  "UserName": _('add_username').value,
  //"password": _('password').value,
  "state":state,
  "roule":roule,
  "firestName":_('firestName').value,
  "fatherName":_('fatherName').value,
  "sureName":_('sureName').value,
  "Email":_('email').value,
  "PhoneNumber":_('tel').value
});
  //url = "https://localhost:7168/api/users/add"
let response = await addUser(url,row)
console.log(response)
if(response.status == 200){
show_massege(_('result'),"لقد تم إضافة المستخدم بنجاح","alert-success")
viewData(page,section,limit)

}else{
  if(response.status == 400){
    show_massege(_('result'),"المستخدم موجود أو كلمة المرور لاتحتوي علي رموز و أرقم*","alert-danger")

  }else{
    show_massege(_('result'),"لقد حدث خطأ*","alert-danger")

  }

}

}

let result_elem = document.getElementById("result")
let msg = "لقد حدث خطأ"
let msg1 = "لقد تمت العملية بنجاح"
// show_massege(result_elem,msg1,"alert-success")
function show_massege(elem,msg,type){
elem.innerHTML = ''
let div = document.createElement('div')
div.classList.add("alert")
div.classList.add(type)
div.innerText=msg
elem.appendChild(div)
}
_('pdf_export').addEventListener('click',async function(e){
  e.preventDefault()
  var headers = { id: "إسم المستخدم", name: "الإسم", tel: "البريد", email: "الشركة", egincy: "البلد", address: "نوع النتج" }
  
  var filename = prompt("الرجاء إدخال إسم الملف");
  filename ? exportCSVFile(headers,users._data , filename) // call the exportCSVFile() function to process the JSON and trigger the download
    : null;
  
  })
viewData(page,section,limit)
_('display_username').innerText=localStorage.getItem('userName')
_('display_fullname').innerText=localStorage.getItem('fullName')
}
