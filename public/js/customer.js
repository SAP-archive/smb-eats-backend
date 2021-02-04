$(document).ready(function(){  
	$( "#webform-div" ).click(function() {
    $(".modal").toggleClass("show-modal")
 	});
	
	$( ".modal" ).click(function() {
    $(".modal").toggleClass("show-modal")
	});
})

function startFlow() {

  var data = {
    recipient: $("#recipient").val(),
    orderData: {
        CustomerName: $("#CustomerName").val(),
        CustomerEmail: $("#recipient").val(), //just for demo purposes
        Address: $("#Address").val(),
        ProductID: $("#ProductID").val()
    }
  }

  $.ajax({
    type: "POST",
    url: "api/start",
    contentType: "application/json", 
    data: JSON.stringify(data),
    success: function(res, status){
      alert("Workflow ID: " + res.id + " Created!")}
    });
}
