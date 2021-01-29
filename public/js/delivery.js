var user = "delivery"
$(document).ready(function(){  

	$("table").on("click", "button", function( event ) {
		completeTask(this.id, this.className)
	});
	loadOpenTasks()

})

function loadOpenTasks(){
	$.get("api/tasks?user="+user, function(response){
		displayResult(response)
	})
}

function displayResult(result){
	// Generic function to display any set of record
	var line = '';

	result.forEach(task => {
		var order = task.workflowInstanceId
        line+= '<tr id="'+task.id+'">'
        line+= '<td>'+order.substring(0,8)+'</td>' 
        line+= '<td>'+task.context.orderData.CustomerName+'</td>' 
		line+= '<td>'+task.createdAt+'</td>' 
		line+= '<td><button id="'+task.id+'" class="'+task.workflowInstanceId+'">Go! 🛵💨</button></td>'
		line+= '</tr>'
	});
	$("tbody").html(line)
	$("#orders-ready").text(result.length)
}

function completeTask(id, workflow){
	$.ajax({
		type: "POST",
		url: "api/completeTask?taskId="+id+"&instanceID="+workflow,
		contentType: "application/json", 
		success: function(res, status){
          console.log("task "+id+" comepleted")
          window.location.href="/route?taskId="+res[0].id+"&instanceID="+workflow 
		},
		error: function(error){
			alert("error - "+error)
		}
	});
}

