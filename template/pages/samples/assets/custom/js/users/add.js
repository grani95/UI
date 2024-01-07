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

async function addUser(url,row) {

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
  .then(async response =>{return await response} )
  .catch(error => console.log('error', error));
  return result
}
_('add_data').onclick=function(){
    open_modal("add_modal");
}
_('add_close_modal').onclick=function(){
  //  _('userID').value=""
  _('firestName').value=''
  _('fatherName').value=''
  _('sureName').value=''
  _('email').value=''
  _('tel').value=''
  _('add_username').value=''
 // _('password').value=''
 // _('cpassword').value=''
  _('active').checked = true
  _('user').checked = true
  _('result').innerHtml=''
    close_modal("add_modal");
}

