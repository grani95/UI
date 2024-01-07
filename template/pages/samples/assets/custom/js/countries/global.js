var section = 1;
var page=1;
var limit = 5
var orderString = "countyID";
var term = "";
var DateFrom = "";
var DateTo = "";
var state="";
var rate= "";
var continent_src = ""
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
var rateElemet= document.getElementById("rate");
var stateElemet = document.getElementById("state");
var DateFromElemet = document.getElementById("DateFrom");
var DateToElemet = document.getElementById("DateTo");
var srch_frm = document.getElementById("srch-frm");
var resetSearchElements= document.getElementById("reset-element-btn")
var continent_src_elem= document.getElementById("continent_src")
window.onload = async function () {
  if(localStorage.getItem('token') == null || localStorage.getItem('token') == "undefined"){
    window.location='http://127.0.0.1/front_end_api/template/pages/samples/login.html'
  }  
  let flag = document.getElementById("flag")
  let name=document.getElementById("countryName")
  let code = document.getElementById("code")
  let ename=document.getElementById("countryEName")
  let continent_ele=document.getElementById("continent_name")
  var contienent ;
var url = "https://localhost:7168/api/countries/getPages";
let myHeaders = new Headers();
myHeaders.append("token",localStorage.getItem('token'))
var options = {
  method: 'GET',
headers:myHeaders,
  // redirect: 'follow',
  origin:"https://localhost:7168",
};
let cc = ''
document.getElementById("countryName").addEventListener("change",function(){
  const continent_arr=[
"أفريقيا",
"أروبا",
"أسيا",
"أمريكيا الشمالية",
"أمريكيا الجنوبية",
"أستراليا"
  ]

  let term = this.value
  if(term !== "" || term !=="undefined"){
      let term = document.getElementById("countryName").value;
     getcountryInfo(term).then(country=>{
      name.value=country[0].arabicName;
      code.value=country[0].code;
      _('flag').classList.remove('flag-icon-'+cc)
      // console.log(country)
      ename.value=country[0].name
      continent_ele.value=continent_arr[country[0].continent]
      flag.classList.add("flag-icon-"+country[0].code)
      contienent = country[0].continent
      cc = country[0].code;
      // flag.value=country[0].code



    })

  }
  
  })

  async function addCountry(url,row) {

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: row,
  redirect: 'follow',
  origin:"https://localhost:7168"

};

var result =await fetch(url, requestOptions)
  .then(async response => {
    await response.text()
    if(response.status == 200){
      console.log( response)
      
      show_massege(result_elem,success_msg,"alert-success")
    
    }else{
    
      show_massege(result_elem,error_msg,"alert-danger")
    
    }
    
      })
  // .then(async result => console.log(await result))
  .catch(error => console.log('error', error));
  return result
}
  let result_elem = document.getElementById("result")
let error_msg = "لقد حدث خطأ"
let success_msg = "لقد تمت العملية بنجاح"
//show_massege(result_elem,success_msg,"alert-success")
function show_massege(elem,msg,type){
elem.innerHTML = ''
let div = document.createElement('div')
div.classList.add("alert")
div.classList.add(type)
div.innerText=msg
elem.appendChild(div)
}
async function getData(url,options,page,section,limit,orderString) {
    try {
        let res = await fetch(url+"?sort="+orderString+"&&page="+page+"&&section="+section+"&&limit="
        +limit+"&&term="+term+"&&state="+state+"&&rate="+rate+"&&continentNo="+continent_src_elem.value+
        "&&DateFrom="+DateFrom+"&&DateTo="+DateTo,options);
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
      // var users = await getData(url,options,page,section,limit,orderString).then(r=> {return r.json()})
      var users = await result.json()
 if(users._data.length > 0){
  document.getElementById("loader").style.display="none"
drowTable(users._data)
pagenation(users._pageList,users._hasNext,users._hasPrev,users._limit,section,next,prev)
setLable(users._display_from,users._display_to,users._total)
 }else{
alert("لا توجد بيانات! ")
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
      var td = document.createElement("td")
      var spanFlag = document.createElement('span')
      spanFlag.classList.add("flag-icon")
      spanFlag.classList.add("flag-icon-"+row.code)
      td.appendChild(spanFlag)
    item.appendChild(td)
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
contienent=continent_src_elem.value
viewData(page,section,limit)

})
resetSearchElements.addEventListener("click",function(e){
  e.preventDefault();
  termElement.value = ""
  rateElemet.value=""
  stateElemet.value=""
  DateFromElemet.value=""
  DateToElemet.value=""
  continent_src_elem.value=""
  term = "";
  rate = ""
state = ""
Dtatefrom=""
DateTo=""
continent_src=""
viewData(page,section,limit)


})
async function deleteCountry(id){
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
  var url = "https://localhost:7168/api/countries/delete/"+id
  var options= {
  method: 'Delete',
  headers:myHeaders,
 // redirect: 'follow',
  origin:"https://localhost:7168",
};

  try {
        let res = await fetch(url,options);
     if(res.status == 200){

       viewData(page,section,limit)

     }else{
    alert("عذرا الرجاء إعادة المحاولة")
    
    }

        return await res.text();

    } catch (error) {
        console.log(error);
    }
}
document.getElementById("tbody").addEventListener("click",async function(e){
e.preventDefault();
let countryName = e.target.closest("tr").cells[0].innerText
var id = e.target.closest("tr").getAttribute('id');
var action = e.target.closest("td").getAttribute('class');
switch(action.split(' ')[0]){
case("del-td"):{
var conf = confirm("هل أنت متأكد من حذف البلد"+countryName+"؟ ")
if(conf){
deleteCountry(id)

}
break;
}
case("show-td"):{
alert("show")
break;
}
case("update-td"):{

  var state = document.getElementById("u_active").checked ? document.getElementsByName("ustate")[0].value: document.getElementsByName("ustate")[1].value;
  var url = "https://localhost:7168/api/countries/updateState/"+id+"?state="+state
  //console.log(document.getElementById("update_modal"))
  open_modal("update_modal")
let result =await setCountryInfo(id) 
if(result.status == 200){
let country = await result.json()
if(country.length > 0){
_("usupport_rate").value = country[0].rate;
country[0].state == 1 ? _("u_active").checked = true : _("u_not_active").checked = true
_("ucountryID").value = country[0].countryID
}else{
  alert("لا توجد بيانات !!!")
}
}else{
alert("لقد حدث خطأ")
}

break;
}
default:{
  break;
}
}

})
_("update_close_modal").addEventListener("click",function(){

  close_Update_modal()

})
async function setCountryInfo(id){
let url = "https://localhost:7168/api/countries/get/"+id
var options = {
  method: 'GET',
  // redirect: 'follow',
  origin:"https://localhost:7168",
  };
    var result = await fetch(url,options);
   // var country =await  result.json()
    return result

}
    _('add_button').onclick=async function(e)
{
e.preventDefault()
var url = "https://localhost:7168/api/countries/add";


var state = document.getElementById("active").checked ? document.getElementsByName("state")[1].value: document.getElementsByName("state")[2].value;

var row = JSON.stringify({
  "Name": _('countryEName').value,
  "arabicName": _('countryName').value,
  "state":state,
  "code":code.value,
  "rate":_('support_raio').value,
  "country_userID":localStorage.getItem('userId'),
  "continentNo":contienent
});
 await addCountry(url,row)

viewData(page,section,limit)

}
_("update_button").addEventListener("click",async function(e){

  e.preventDefault();
  let state=_("u_active").checked == true ? 1 : 0;
  let support_rate = _("usupport_rate").value
 let x = await updatecountry(_("ucountryID").value,state,support_rate)
if(x.status == 200){
show_massege(_('uresult'),"لقد تمت العملية بنجاح","alert-success")
  viewData(page,section,limit)
}  else{
  show_massege(_('uresult'),error_msg,"alert-danger")

}
  
    })
  
async function getcountryInfo(term){
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
  var url = "https://localhost:7168/api/countries/getbyname?name="+term;
var options = {
method: 'GET',
headers: myHeaders,
// redirect: 'follow',
origin:"https://localhost:7168",
};
  var result = await fetch(url,options);
  var country =await  result.json()
  return country
}
_('pdf_export').addEventListener('click',async function(e){
  e.preventDefault()
  var headers = { id: "الشعار", name: "إسم البلد", tel: "إسم البلد بالإنجليزي", email: "القارة", egincy: "رمز البلد", address: "نسبة الدعم" ,state:"الحالة"}
  
  var filename = prompt("الرجاء إدخال إسم الملف");
  filename ? exportCSVFile(headers,users._data , filename) // call the exportCSVFile() function to process the JSON and trigger the download
    : null;
  
  })
viewData(page,section,limit)
_('display_username').innerText=localStorage.getItem('userName')
_('display_fullname').innerText=localStorage.getItem('fullName')
}