// async function getById(url){
//     var options= {
//     method: 'Get',
//    // redirect: 'follow',
//     origin:"https://localhost:7168",
//   };
  
//     try {
//           let res = await fetch(url,options);
//           return await res.json();
  
//       } catch (error) {
//           console.log(error);
//       }
//       return await res;
//   }

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
  function close_Update_modal()
  {
_("usupport_rate").value = "";
_("u_active").checked = true
_('modal_backdrop').style.display='none';
_('update_modal').style.display='none';
_('update_modal').classList.remove('show');
  _('modal_backdrop').style.display='none';
 _('uresult').innerHTML = ''
  }
  
  async function updatecountry(countryID,state,support_rate) {
  let url = "https://localhost:7168/api/countries/update?id="+countryID+"&&state="+state+"&&rate="+support_rate
      let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
  
  let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow',
    origin:"https://localhost:7168"
  
  };
  let result =await fetch(url, requestOptions)
    .then(async response =>{ return await response})
    .catch(error => console.log('error', error));
    return result
  }

 





  