window.onload=function(){
var oName=document.getElementById('name');
var oNumber=document.getElementById('number');
var oLine1=document.getElementById('line1');
var oLine2=document.getElementById('line2');
var oLine3=document.getElementById('line3');
var oButton=document.getElementById('button1');
oName.onclick=function(){
oLine1.style.display='none';	
    }


oNumber.onclick=function(){
oLine2.style.display='none';	
    }


oButton.onclick=function(){
oLine3.style.display='none';	
    }
}