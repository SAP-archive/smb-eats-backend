function startFlow() {
  let data = {};
  let formdata = new FormData(theform);
  for (let tuple of formdata.entries()) data[tuple[0]] = tuple[1];
  
  // construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  
  // send the collected data as JSON
  xhr.send(JSON.stringify(data));
}
