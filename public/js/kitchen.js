    var user = "kitchen"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        displayResult(JSON.parse(this.response))
        }
    };
    xhttp.open("GET", "api/tasks?user="+user, true);
    xhttp.send();


	function displayResult(result){
		// Generic function to display any set of record
		var data;
		var json;
		var line;
		
		for(var i = 0; i < result.length ; i++){
			json = result[i];
			line = "<tr>"
			for (var property in json) {
				if (json.hasOwnProperty(property)) {
					data = json[property];
					line += "<td>" + JSON.stringify(data) + "</td>";
				}
			}
			line+= '<td><form method="POST" action="/api/completeTask?&taskId='+json.id+'">'+
				'<button type="submit" class="btn btn-primary">Ready</button></form></td>'
			line += "</tr>"
		}
    document.getElementById("tasks").innerHTML = line
}