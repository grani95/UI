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
          return await res.json();
  
      } catch (error) {
          console.log(error);
      }
      return await res;
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
  
  async function updateUser(url,row) {
  
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
    .then(async response => {return await response})
    // .then(async result => {return await result})
    .catch(error => console.log('error', error));
    return result
  }
  
  _('update_close_modal').onclick=function(){
  _('uuserID').value=""
  _('uusername').value=""
  document.getElementsByName("ustate")[0].checked = true
  document.getElementsByName("uroule")[1].checked = true
  _('ufirestName').value=""
  _('ufatherName').value=""
  _('usureName').value=""
  _('uemail').value=""
  _('utel').value=""
  _('uresult').innerHTML=''
      close_modal("update_modal");
  }
  
 





  