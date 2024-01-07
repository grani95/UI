var section = 1;
var page=1;
var limit = 5
var orderString = "userID";
var term = "";
var DateFrom = "";
var DateTo = "";
var state="";
var roule= "";
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
var rouleElemet= document.getElementById("roule");
var stateElemet = document.getElementById("state");
var DateFromElemet = document.getElementById("DateFrom");
var DateToElemet = document.getElementById("DateTo");
var srch_frm = document.getElementById("srch-frm");
var resetSearchElements= document.getElementById("reset-element-btn")
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
    _('update_button').onclick=async function(e)
  {
  e.preventDefault()
   if(_('uuserID').value == null || _('uuserID').value== "undefined"){
alert("لقد حدث خطأ!!")
}else{
var state = document.getElementById("u_active").checked ? document.getElementsByName("ustate")[0].value: document.getElementsByName("ustate")[1].value;
var roule = document.getElementById("u_admin").checked ? document.getElementsByName("uroule")[0].value: document.getElementsByName("uroule")[1].value;

    var row = JSON.stringify({
    "userID":_('uuserID').value,
    "username": _('uusername').value,
    "password": _('upassword').value,
    "state": state,
    "roule": roule,
    "firestName":_('ufirestName').value,
    "fatherName":_('ufatherName').value,
    "sureName":_('usureName').value,
    "email":_('uemail').value,
    "tel":_('utel').value
  });
   var url = "https://localhost:7168/api/users/update"
    await updateUser(url,row)
    viewData(page,section,limit)

  }
    }
    _('add_button').onclick=async function(e)
{
e.preventDefault()
var url = "https://localhost:7168/api/users/add";


var state = document.getElementById("active").checked ? document.getElementsByName("state")[1].value: document.getElementsByName("state")[2].value;
var roule = document.getElementById("admin").checked ? document.getElementsByName("roule")[1].value: document.getElementsByName("roule")[2].value;

console.log(document.getElementsByName("roule")[1])
console.log(document.getElementsByName("roule")[2])
var row = JSON.stringify({
  "username": _('username').value,
  "password": _('password').value,
  "state":state,
  "roule":roule,
  "firestName":_('firestName').value,
  "fatherName":_('fatherName').value,
  "sureName":_('sureName').value,
  "email":_('email').value,
  "tel":_('tel').value
});
  //url = "https://localhost:7168/api/users/add"
console.log(await addUser(url,row))
viewData(page,section,limit)

}



let result_elem = document.getElementById("result")
let msg = "لقد حدث خطأ"
let msg1 = "لقد تمت العملية بنجاح"
show_massege(result_elem,msg1,"alert-success")
function show_massege(elem,msg,type){
elem.innerHTML = ''
let div = document.createElement('div')
div.classList.add("alert")
div.classList.add(type)
div.innerText=msg
result_elem.appendChild(div)
}
viewData(page,section,limit)