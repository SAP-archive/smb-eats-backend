function checkout(products) {
    if (typeof products === 'undefined' || products.length === 0) {
        alert('No items in the shopping cart to be checked out.');
        return;
    }

    let body = {
        b1: {
            lines: []
        },
        byd: {
            lines: []
        }
    };
    
    products.forEach(p => {
        if (p.source === 'b1') {
            let line = {};
            line.productid = p.id;
            line.Quantity = p.quantity;
            body.b1.lines.push(line);
        } else if (p.source === 'byd') {
            let line = {};
            line.productid = p.id;
            line.Quantity = p.quantity;
            body.byd.lines.push(line);
        }
    });

    if (body.b1.lines.length === 0) {
        delete body.b1;
    } else if (body.byd.lines.length === 0) {
        delete body.byd;
    }

    console.log(JSON.stringify(body));
    $.ajax({
            url: 'https://smbmkt.cfapps.eu10.hana.ondemand.com/SalesOrders',
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
            let b1_order = data.b1;
            let byd_order = data.byd;
            let b1_order_msg = '';
            if (b1_order && b1_order[0] && b1_order[0].OrderID) {
                b1_order_msg = `Congratulation. Order#${b1_order[0].OrderID} with amount ${b1_order[0].OrderAmnt} ${b1_order[0].OrderCur} placed.`;
            }

            let byd_order_msg = '';
            if (byd_order && byd_order[0] && byd_order[0].OrderID) {
                let amount = parseFloat(byd_order[0].OrderAmnt).toFixed(2);
                byd_order_msg = `Order#${byd_order[0].OrderID} with amount ${amount} ${byd_order[0].OrderCur} placed.`;
            }

            let msg = b1_order_msg;
            if (b1_order_msg.length > 0 && byd_order_msg.length > 0) {
                msg = `${b1_order_msg}
${byd_order_msg}`;
            } else if (b1_order_msg.length > 0 || byd_order_msg.length > 0) {
                msg = `${b1_order_msg}${byd_order_msg}`
            } else {
                msg = `No order placed.`
            }

            //alert(msg);
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