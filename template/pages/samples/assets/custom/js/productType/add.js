function _(element)
{
return document.getElementById(element)
}
// function open_modal()
// {
// _('modal_backdrop').style.display='block';
// _('custom_modal').style.display='block';
// _('custom_modal').classList.add('show');
// }
// function close_modal()
// {
// _('modal_backdrop').style.display='none';
// _('custom_modal').style.display='none';
// _('custom_modal').classList.remove('show');

// }

async function addProductType(url,row) {

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
  .then(async response => await response.text())
  .then(async result => {return await result})
  .catch(error => console.log('error', error));
  return result
}
_('add_data').onclick=function(){
    open_modal("add_modal");
}
_('add_close_modal').onclick=function(){
  // _('userID').value=""
  // _('username').value=""
  // _('state').value=""
  // _('roule').value=""
  // _('firestName').value=""
  // _('fatherName').value=""
  // _('sureName').value=""
  // _('email').value=""
  // _('tel').value=""
    close_modal("add_modal");
}

