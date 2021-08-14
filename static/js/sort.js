var target = null;
var dragger = null;
var y = 0, oldy = 0;
var offsetX, offsetY;

document.addEventListener("mousedown", function( e ) {
    if(e.target.className == "item" ){
        document.body.style = "cursor:pointer;";
        dragger = document.getElementById("item-div");
        target = e.target;
        dragger.style.display = "block";
        dragger.innerHTML = target.innerHTML;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        dragger.style.left = e.clientX +window.scrollX- offsetX - 9 + "px";
        dragger.style.top = e.clientY +window.scrollY- offsetY - 9 + "px";
        target.className = "item-selected";
    }
}, false);

document.addEventListener("mouseup", function( e ) {
    if(dragger){
        document.body.style = "cursor:auto;";
        dragger.style.display = "none";
        target.className = "item";
    }
    dragger = null;
}, false);

document.addEventListener("mousemove", move, false);
function move(e){
    if(dragger){
        clearSelection();
        oldy = y;
        y = event.clientY;
        var _x = e.clientX-offsetX;
        var _y = e.clientY-offsetY;
        dragger.style.left = _x +window.scrollX- 9 + "px";
        dragger.style.top = _y +window.scrollY- 9 + "px";
        var elms = target.parentNode.getElementsByClassName('item');
        for(var elm of elms){
            if(elm != target){
                if(_y > getOffset(elm).top-window.scrollY-25 && _y < getOffset(elm).top-window.scrollY +28){
                    if(y < oldy)
                        elm.parentNode.insertBefore( target, elm );
                    else
                        elm.parentNode.insertBefore( target, elm.nextSibling );
                }
            }
        }
    }
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
    };
}

function verif(){
    var ord = document.getElementById("ord");
    var elms = ord.getElementsByClassName('item');
    for(var i =0; i<elms.length; i++){
        console.log(i +" - " + elms[i].id);
    }
}

function clearSelection()
{
 if (window.getSelection) {window.getSelection().removeAllRanges();}
 else if (document.selection) {document.selection.empty();}
}
