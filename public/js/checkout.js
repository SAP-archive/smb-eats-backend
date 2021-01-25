function checkout(products) {
    if (typeof products === 'undefined' || products.length === 0) {
        alert('No items in the shopping cart to be checked out.');
        return;
    }

    let body = {
        "recipient": "yatsea.li@sap.com",
        "orderData": {
        "CustomerName": "Andres",
        "Address": "484 St Kilda Rd, Melbourne, VIC 3004, Australia",
        "ProductID": "SH50021",
        "Quantity": 1
        }
       };
    
    products.forEach(p => {
        // if (p.source === 'b1') {
        //     let line = {};
        //     line.productid = p.id;
        //     line.Quantity = p.quantity;
        //     body.b1.lines.push(line);
        // } else if (p.source === 'byd') {
        //     let line = {};
        //     line.productid = p.id;
        //     line.Quantity = p.quantity;
        //     body.byd.lines.push(line);
        // }
    });

    console.log(JSON.stringify(body));
    $.ajax({
            url: '../api/start',
            method: 'POST',
            data: JSON.stringify(body),
            // xhrFields: {
            //     withCredentials: true
            // },
            //credentials: "include",
            contentType: 'application/json',
            crossDomain: true
        }).done(function (data) {
            console.log(JSON.stringify(data));
            localStorage.lastWorkflowId = data.id;
            let msg = `Order request was sent to the Kitchen with workflow instance id ${data.id}. Please check the status in ticks.`;
            
            console.log(msg);
            $('#operationSuccessAlert').empty();
            $('#operationSuccessAlert').append(`<p>${msg}</p>`);
            $('#operationSuccessModal').modal('show');
        })
        .fail(function (xhr, status, error) {
            //alert('An error has occurred: ' + JSON.stringify(xhr));
            $('#operationFailureModal').modal('show');
        })
        .always(function () {
            //alert("complete");
        });
}