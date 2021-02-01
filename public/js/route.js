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
	var order = searchParams.get('instanceID')
	if(result){
		$("#orders-route").text("📍Order "+order.substring(0,8)+ " on route to " +result.context.orderData.CustomerName)
		$.get("api/map?address="+result.context.orderData.Address, function(response){
			displayMap(response)
		})
	}
}

function displayMap(result){
	$(".map-responsive h1").text("")
	
	if(result){
		var mapsQuery = result.formatted_address
		var placeId = result.place_id
		$(".map-responsive iframe").attr("src",
		// "https://www.google.com/maps/search/?api=1&query="+mapsQuery+"&query_place_id="+placeId+"&output=embed")
		"https://maps.google.com/maps?q="+result.geometry.location.lat+","+result.geometry.location.lng+"&output=embed")
		
	}else{
		$(".map-responsive h1").text("Can't load Map at the moment")
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

