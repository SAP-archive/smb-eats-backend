let searchParams = new URLSearchParams(window.location.search)
console.log(searchParams.get('taskId'))
$.get("api/taskContext?taskId="+searchParams.get('taskId'), function(response){
	displayResult(response)
})

$(document).ready(function(){  
	$( ".delivery-button" ).click(function() {
		completeTask(searchParams.get('taskId'))
	});
	
	$( ".modal-button" ).click(function() {
		window.location.href="/delivery"
	});
})

function displayResult(result){
	// Generic function to display any set of record
	var order = searchParams.get('instanceID')
	if(result){
		$("#orders-route").text("📍Order "+order.substring(0,8)+ " on route to " +result.context.orderData.CustomerName)
	}
}

function completeTask(id){
	$.ajax({
		type: "POST",
		url: "api/completeTask?taskId="+id,
		contentType: "application/json", 
		success: function(res, status){
			$(".modal").toggleClass("show-modal")
		},
		error: function(error){
			alert("error - "+error)
		}
	});
}

