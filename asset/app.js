var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('canvas');
var btncan = document.getElementById('btncan');
var can = document.getElementById('can');
var bgimg = document.getElementById('img');
var image = new Image();
var selectP = document.getElementById('selectPanels');
var up = document.getElementById('up');



function mySelect(){
	var val = selectP.value;
	up.style.display="none";
	if(val==0){
up.style.display="none";
bgimg.style.display="block";
btncan.style.display="none";
can.style.display="none";
imageLoader.value="";
	}
	else{
		up.style.display="block";
		bgimg.style.display="block";
		btncan.style.display="none";
		can.style.display="none";
		imageLoader.value="";
	}
}

function handleImage(e){
	
	can.style.display="block";
var img =	selectPanel();

  var reader = new FileReader();
  reader.onload = function(event){
     
      image.src = event.target.result;
      image.onload = function(){
        updateimage(img)
        
      }
    
    
     
  }
  reader.readAsDataURL(e.target.files[0]);     
}


function selectPanel(){
	var val = selectP.value;
if(val==1){
return document.getElementById('img1');
}
else if(val==2){
	return document.getElementById('img2');
}
else if(val==3){
	return document.getElementById('img3');
}
else if(val==4){
	return document.getElementById('img4');
}
else if(val==5){
	return document.getElementById('img5');
}
else if(val==6){
	return document.getElementById('img6');
}

}


function updateimage(img)
{
	var img1 = img;
	 
	 
   	canvas.width = 4201;
   	canvas.height = 2401;
   	var userw = image.width;
   	var userh = image.height;
   	var imagex=300;
   	var imagey=550;
   	if(image.width!=810)
   	{
   		var xper=(810*100)/image.width;
   		userw=image.width*xper/100;
   		userh=image.height*xper/100;

   		var padd=0;
       	if(userh>810)
   		{
   			padd=(userh-810)/2
   			imagey=imagey-padd
   		}
   		if(userh<810)
   		{
   			padd=(810-userh)/2
   			imagey=imagey+padd
   		}
   	}
   	
 

   	
   	var ctx = canvas.getContext('2d');
   	ctx.drawImage(image, imagex,imagey,userw, userh); 
	   ctx.drawImage(img1, 0, 0,4201,2401);
	  
	   bgimg.style.display="none"
	   btncan.style.display="block"
}
btncan.addEventListener("click",()=>{
	download(canvas, 'myposter.png');
	btncan.style.display="none"
	
})

function download(canvas, filename) {
	/// create an "off-screen" anchor tag
	var lnk = document.createElement('a'), e;
  
	/// the key here is to set the download attribute of the a tag
	lnk.download = filename;
  
	/// convert canvas content to data-uri for link. When download
	/// attribute is set the content pointed to by link will be
	/// pushed as "download" in HTML5 capable browsers
	lnk.href = canvas.toDataURL("image/png;base64");
  
	/// create a "fake" click-event to trigger the download
	if (document.createEvent) {
	  e = document.createEvent("MouseEvents");
	  e.initMouseEvent("click", true, true, window,
					   0, 0, 0, 0, 0, false, false, false,
					   false, 0, null);
  
	  lnk.dispatchEvent(e);
	} else if (lnk.fireEvent) {
	  lnk.fireEvent("onclick");
	}
  }
