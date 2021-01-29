let searchParams = new URLSearchParams(window.location.search)
console.log(searchParams.get('taskId'))
$.get("api/taskContext?taskId="+searchParams.get('taskId'), function(response){
	displayResult(response)
})

$(document).ready(function(){  
	$("button").on("click", "button", function( event ) {
		completeTask(this.id)
	});
})

function displayResult(result){
	// Generic function to display any set of record
	var order = searchParams.get('instanceID')
	if(result){
		$("#orders-route").text("📍Order "+order.substring(0,8)+ " on route to " +result.context.orderData.CustomerName)
	}
}

function completeTask(id, workflow){
	$.ajax({
		type: "POST",
		url: "api/completeTask?taskId="+id+"&instanceID="+workflow,
		contentType: "application/json", 
		success: function(res, status){
          console.log("task "+id+" comepleted")
          window.location.href="/route?taskId="+res[0].id; 
		},
		error: function(error){
			alert("error - "+error)
		}
	});
}

