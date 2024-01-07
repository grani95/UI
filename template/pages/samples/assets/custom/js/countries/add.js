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
function close_modal()
{
 _('countryName').value=""
 _('flag').value=""
 _('flag').classList.remove('flag-icon-'+code.value)
 _('countryEName').value=""
 _('code').value=""
 _('continent_name').value=""
 _('support_raio').value=""
 _('active').checked=true
_('result').innerHTML =''

_('modal_backdrop').style.display='none';
_('add_modal').style.display='none';
_('add_modal').classList.remove('show');

}

_('add_data').onclick=function(){
    open_modal("add_modal");
}
_('add_close_modal').onclick=function(){
    close_modal();
}

