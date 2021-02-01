function checkout(products) {
    if (typeof products === 'undefined' || products.length === 0) {
        alert('No items in the shopping cart to be checked out.');
        return;
    }

    let body = {
        "recipient": "yatsea.li@sap.com",
        "orderData": {
            "CustomerName": "Andres",
            "CustomerEmail": "yatsea.li@sap.com",
            "Address": "484 St Kilda Rd, Melbourne, VIC 3004, Australia",
            "ProductID": "SH50021",
            "Quantity": 1
        }
    };
    
    //agent's receipt shouldn't be passed on through the end user, which should determined by backend.
    //just test code during the dev
    body.recipient = $('#email').val();
    body.orderData.CustomerEmail = $('#email').val();
    body.orderData.CustomerName = $('#name').val();
    
    let address = '';
    //format address
    let line1 = $('#line1').val();
    if (line1 && line1.trim().length > 0) {
        address = line1;
    }

    let line2 = $('#line2').val();
    if (line2 && line2.trim().length > 0) {
        address = `${address},${line2}`;
    }

    let city = $('#city').val();
    if (city && city.trim().length > 0)``
    {
        address = `${address},${city}`;
    }

    let state = $('#state').val();
    if (state && state.trim().length > 0) {
        address = `${address},${state}`;
    }

    let postCode = $('#postCode').val();
    if (postCode && postCode.trim().length > 0) {
        address = `${address} ${postCode}`;
    }

    let country = $('#country').val();
    if (country && country.trim().length > 0) {
        address = `${address},${country}`;
    }

    body.orderData.Address = address;
    //save the customer detail into local storage
    localStorage.CustomerDetail = {};
    localStorage.CustomerDetail.Name = body.orderData.CustomerName;
    localStorage.CustomerDetail.Email = body.recipient;
    localStorage.CustomerDetail.DeliveryAddress = {
        Line1: line1,
        Line2: line2,
        City: city,
        State: state,
        PostCode: postCode,
        Country: country
    };

    //as of now, the order in workflow only include one product
    //todo: populate the list product to the orderData structure
    body.orderData.ProductID = products[0].id;
    body.orderData.Quantity = products[0].quantity;

    // products.forEach(p => {
    // });

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