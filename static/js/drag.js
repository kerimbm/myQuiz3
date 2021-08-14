var selected = null;
var width, height;
var offsetX, offsetY;
var z_index = 10;
var elmColl = null;
var tabR={};

/*
window.addEventListener('load', function() {
    //init();
});

/*function init(){
    /*document.getElementById("q-svg-0").style.top = "0px";
    document.getElementById("q-svg-0").style.left = "0px";
    document.getElementById("r-svg-0").style.top = "0px";
    document.getElementById("r-svg-0").style.left = "170px";
    document.getElementById("q-svg-1").style.top = "85px";
    document.getElementById("q-svg-1").style.left = "0px";
    document.getElementById("r-svg-1").style.top = "85px";
    document.getElementById("r-svg-1").style.left = "370px";
    document.getElementById("q-svg-2").style.top = "170px";
    document.getElementById("q-svg-2").style.left = "0px";
    document.getElementById("r-svg-2").style.top = "170px";
    document.getElementById("r-svg-2").style.left = "370px";
    * /
    
    
}*/

document.addEventListener("mouseup", function( e ) {
    if(selected && e.target.classList){//selectionner et n'est pas hort fenêtre
        if(e.target.classList.contains("pathsvg")){
            e.target.classList.replace("shadow-svg-2", "shadow-svg-1");
        }
        else if(e.target.classList.contains("textsvg")){
            let elms = e.target.parentNode.getElementsByClassName('pathsvg');
            elms[0].classList.replace("shadow-svg-2", "shadow-svg-1");
        }
        if(elmColl){
            i = elmColl.id.substring(6);
            if(tabR[elmColl.id]!=null && tabR[elmColl.id] == selected.id && !questionLock){
                selected.style.left = getOffset(elmColl).left + getOffset(elmColl).width -getOffset(elmColl.parentNode).left- 34 + "px";
                selected.style.top = elmColl.style.top;
            }
        }
        elmColl = null;
        selected = null;
    }
}, false);

document.addEventListener("mousemove", dragMove, false);
function dragMove(e) {
    clearSelection();
    if(selected){
        
        var _x = e.clientX-offsetX-getOffset(selected.parentNode).left;
        
        var _y = e.clientY-offsetY-getOffset(selected.parentNode).top;
        //console.log(e.clientX);
        selected.style.left=(_x) + "px";
        selected.style.top=(_y) + "px";
        /*if(getOffset(selected).left>473)
            selected.style.left="473px";
        if(getOffset(selected).left<0)
            selected.style.left="0px";
        if(getOffset(selected).top>428)
            selected.style.top="428px";
        if(getOffset(selected).top<0)
            selected.style.top="0px";
        */
        let elms = document.getElementsByClassName('contenersvg');
        if(elmColl){
            var svgs = elmColl.getElementsByClassName('pathsvg');
            if(_y > getOffset(elmColl).top-getOffset(elmColl.parentNode).top-20 && _y < getOffset(elmColl).top-getOffset(elmColl.parentNode).top +20 && _x < getOffset(elmColl).left + getOffset(elmColl).width-getOffset(elmColl.parentNode).left-20){
                
                svgs[0].style.fill = "url(#Gradient2)";
                //console.log(elmColl.id);
                
                i = elmColl.id.substring(6);
                if(tabR[elmColl.id]==null){
                    tabR[elmColl.id] = selected.id;
                }
            }
            else{
                i = elmColl.id.substring(6);
                if(tabR[elmColl.id] == selected.id){
                    svgs[0].style.fill = "url(#Gradient1)";
                    tabR[elmColl.id] = null;
                }
                elmColl = null;
            }
        }
        else{
            for(var elm of elms){
                if(elm != selected && elm.id[0] == 'q'){
                    
                    if(_y > getOffset(elm).top-getOffset(elm.parentNode).top-20 && _y < getOffset(elm).top-getOffset(elm.parentNode).top +20 && _x < getOffset(elm).left + getOffset(elm).width-getOffset(elm.parentNode).left-20){
                        //console.log(getOffset(elm).top);
                        elmColl = elm;
                    }
                }
            }
        }
    }
}

document.addEventListener("mouseout", function( e ) {
    if(e.target.classList.contains("pathsvg") && e.target.parentNode.parentNode.id[0] == 'r'){
        e.target.style.fill = "url(#Gradient1)";
     }
     else if(e.target.classList.contains("textsvg") && e.target.parentNode.id[0] == 'r'){
        let elms = e.target.parentNode.getElementsByClassName('pathsvg');
        elms[0].style.fill = "url(#Gradient1)";
     }
}, false);
document.addEventListener("mouseover", function( e ) {
     if(e.target.classList.contains("pathsvg") && e.target.parentNode.parentNode.id[0] == 'r'){
        e.target.style.fill = "url(#Gradient2)";
     }
     else if(e.target.classList.contains("textsvg") && e.target.parentNode.id[0] == 'r'){
        let elms = e.target.parentNode.getElementsByClassName('pathsvg');
        elms[0].style.fill = "url(#Gradient2)";
     }
}, false);

document.addEventListener("mousedown", function( e ) {
    
    if(e.target.classList.contains("pathsvg") && e.target.parentNode.parentNode.id[0] == 'r'){
        selected = e.target.parentNode.parentNode;
        e.target.classList.replace("shadow-svg-1", "shadow-svg-2");
        width = selected.style.width;
        height = selected.style.height;
        offsetX = e.offsetX - window.scrollX +6;
        offsetY = e.offsetY - window.scrollY +5;
        z_index++;
        selected.style.zIndex = z_index;
    }
    else if(e.target.classList.contains("textsvg") && e.target.parentNode.id[0] == 'r'){
        selected = e.target.parentNode;
        let elms = e.target.parentNode.getElementsByClassName('pathsvg');
        elms[0].classList.replace("shadow-svg-1", "shadow-svg-2");
        width = selected.style.width;
        height = selected.style.height;
        if(e.target.classList.contains("text-r"))
            offsetX = e.offsetX - window.scrollX +34;
        else if(e.target.classList.contains("text-q"))
            offsetX = e.offsetX - window.scrollX +9;
        offsetY = e.offsetY - window.scrollY +5;
        z_index++;
        selected.style.zIndex = z_index;
    }
}, false);

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
    };
}

function clearSelection()
{
 if (window.getSelection) {window.getSelection().removeAllRanges();}
 else if (document.selection) {document.selection.empty();}
}
