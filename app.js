function openNav() {
    document.getElementById("mySidebar").style.width = "200px";
    document.getElementsByClassName("main").style.marginLeft = "200px";
    document.getElementsByClassName("display-img").style.marginLeft= "200px"
}

function closeNav(){
    document.getElementById("mySidebar").style.width = "0px";
    document.getElementsByClassName("main").style.marginLeft = "0px";
    document.getElementsByClassName("display-img").style.marginLeft= "0px"

}

let ul = document.getElementsByClassName("foodList");
let li = document.getElementsByTagName("li");
let numItm = li.length;

let css = document.createElement("style");
css.type ="text/css";
css.innerHTML = "ul {column-count: " + Math.round(numItm/2) + "; }";
document.body.appendChild(css);

