setTimeout(function() {
if (document.querySelector("#UiThemeInstallerModule > div") != null) {
    
    function recursiveCloneNode(element) {
        var elcopy = element.cloneNode();
        for (var i = 0; i < element.childNodes.length; i++) {
            elcopy.appendChild(recursiveCloneNode(element.childNodes[i]));
        }
        return elcopy;
    }

    var scriptid = window.location.href.replace("https://", "").split("/")[2];
    var currentlyinprev = false;
    var bigmanelement = document.querySelector("#UiThemeInstallerModule > div");
    var smallguynode = recursiveCloneNode(bigmanelement);

    smallguynode.childNodes[0].id = "PreviewUiThemeButton";

    bigmanelement.parentNode.insertBefore(smallguynode, bigmanelement.nextSibling);

    document.querySelector("#PreviewUiThemeButton > span").innerHTML = "Preview Theme";
    document.querySelector("#PreviewUiThemeButton").onclick = previewbuttonclick;

    function httpget(theUrl) 
    {
        let xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                return xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", theUrl, false);
        xmlhttp.send();
        return xmlhttp.response;
    }

    function injectstyle(styleString) {
        const style = document.createElement('style');
        style.textContent = styleString;
        style.id = "tempStyle";
        document.head.append(style);
    }

    function previewbuttonclick() {
        if (!currentlyinprev) {
            injectstyle(httpget("https://gamebanana.com/scripts/raw/" + scriptid));
            document.querySelector("#PreviewUiThemeButton > span").innerHTML = "Stop Preview";
        }
        else {
            document.getElementById("tempStyle").parentElement.removeChild(document.getElementById("tempStyle"));
            document.querySelector("#PreviewUiThemeButton > span").innerHTML = "Preview Theme";
        }
        currentlyinprev = !currentlyinprev;
    }

}}, 2000);