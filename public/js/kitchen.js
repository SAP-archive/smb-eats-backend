var user = "kitchen"
$(document).ready(function(){  

	$("table").on("click", "button", function( event ) {
		completeTask(this.id)
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
		var order = task.id
		line+= '<tr id="'+task.id+'">'
		line+= '<td><img class="td-image" src="/pics/'+task.context.orderData.ProductID+'.jpg" alt="Pizza Img"></td>'
		line+= '<td>'+order.substring(0,8)+'</td>' 
		line+= '<td>'+task.createdAt+'</td>' 
		line+= '<td>Task Description Task Description </td>' 
		line+= '<td><button id="'+task.id+'">Ready for 🛵 </button></td>'
		line+= '</tr>'
	});
	$("tbody").html(line)
	$("#prepOrders").text(result.length)
}

function completeTask(id){
	$.ajax({
		type: "POST",
		url: "api/completeTask?taskId="+id,
		contentType: "application/json", 
		success: function(res, status){
		  console.log("task "+id+" comepleted")
		  $('#'+id).fadeOut(300, function(){
			loadOpenTasks()
		  })
		},
		error: function(error){
			alert("error - "+error)
		}
	});
}

