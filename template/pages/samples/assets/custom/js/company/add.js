function _(element)
{
return document.getElementById(element)
}

async function checkCountry(code){
let url = "https://localhost:7168/api/countries/get_id?code="+code
let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
var requestOptions = {
  method: 'GET',
  Headers:myHeaders,
  redirect: 'follow',
  origin:"https://localhost:7168"
};
var result =await fetch(url, requestOptions)
  .then(async response => await response)
  .then(async result => {return await result})
  .catch(error => console.log('error', error));
return await result;
}
async function addCompany(url) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    // myHeaders.append("Content-Type", "application/json");
let result = await checkCountry(add_code.value)
// console.log(await result)

if(await result.status == 200){
 let countryId = await result.json()
var state = document.getElementById("active").checked ? document.getElementsByName("state")[1].value: document.getElementsByName("state")[2].value;

var row = new FormData()
row.append("comp_name",_('company_name').value)
row.append("state",state)
row.append("support_rate",_('add_rate').value)
row.append("logo",_('company_logo').files[0])
row.append("country_id",countryId)
row.append("user_id",localStorage.getItem('userId'))
console.log(_('company_logo').files[0])
let Options = {
  method: 'POST',
   headers:myHeaders,
  body: row,
  redirect: 'follow',
  origin:"https://localhost:7168"

};

  var r =await fetch(url, Options)
  .then(async response =>{ return await response})
  //.then(async result => await result)
  .catch(error => console.log('error', error));
  return r

}else{
alert("البلد غير موجود الرجاء إضافة البلد ثم  معاودة المحاولة")

}
}
_('add_data').onclick=function(){
    open_modal("add_modal");
}
_('add_close_modal').onclick=function(){

    close_modal("add_modal");
}

