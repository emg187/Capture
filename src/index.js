import $ from "jquery";

function component() {
    const element = document.createElement('div');
    element.innerHTML = "Hello humans!";

    $.ajax({
      url: "/api/test.php", 
      success: function(res){
        console.log(res);
      }
    });
  
    return element;
  }
  
  document.body.appendChild(component());

