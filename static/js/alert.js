function customAlert(){
    this.render = function(dialog){
        message.innerHTML = dialog;
        overlay.style.display = "block";
        box.style.opacity=1;
        box.style.zIndex=10;
        box.style.display = "block";
        box.style.animation='0.3s fadeInScale ease-in-out';
    };
    this.ok = function() { 
        box.style.opacity=0;
        box.style.zIndex=-1;
        box.style.animation='0.3s fadeOutScale ease-in-out';
        overlay.style.display = "none";
    };
}