var user = "kitchen"
$(document).ready(function(){  
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
		line+= '<td><img class="td-image" src="https://i.imgur.com/8sDH9VB.png" alt="pizza"></td>'
		line+= '<td>'+order.substring(0,8)+'</td>' 
		line+= '<td>'+task.createdAt+'</td>' 
		line+= '<td>Task Description Task Description </td>' 
		line+= '<td><button id="'+task.id+'">Ready for 🛵 </button></td>'
		line+= '</tr>'
	});
	$("tbody").html(line)
	$("#prepOrders").text(result.length)
}

