(function(){
const y=document.getElementById('year');
if(y) y.textContent=new Date().getFullYear();


// تمرير رابط نموذج Google عبر معلمة ?form=...
const frame=document.getElementById('gform');
const a=document.getElementById('gform-link');
const params=new URLSearchParams(location.search);
const url=params.get('form')||'';
if(frame && url){
frame.src=url;
if(a) a.href=url;
}
})();
