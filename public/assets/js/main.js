
$(function(){
    var runScript = function () {
      try {
        eval(document.getElementById("scriptArea").value);
      } catch(e) {
        alert(e.description || e);
      }
    };    
    document.getElementById("run").onclick = runScript;
})




