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
      //   return await res.json();
  return await res;
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
    .then(async response => await response.text())
    .then(async result => console.log(await result))
    .catch(error => console.log('error', error));
    return result
  }
  // نبي تعديل
  _('update_close_modal').onclick=function(){
    _('ucompanyName').value = '' 
    _('usupport_rate').value = ''
    _('code').value = ''
    _('flag').value = ''
    _('ucountryID').value=''
  document.getElementsByName("ustate")[0].checked = true
  close_modal("update_modal");
  }
  
 





  