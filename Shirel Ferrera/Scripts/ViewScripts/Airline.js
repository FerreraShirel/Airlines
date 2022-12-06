
function deleteRow(rowId) {
    var url = '/Airline/DeleteRow'
    var data = {
        'id': rowId
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            removeRowFromView(rowId);
        },
        error: function (e) {
            alert('Delete failed');
        }
    });
}

function updateRow(rowId) {

    var url = '/Airline/UpdateRow';
    var code = $(`#input_code_${rowId}`).val();
    var airlineName = $(`#input_name_${rowId}`).val();
    var data = {
        'code': code,
        'airlineName': airlineName,
        'id': rowId
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function (r) {
            $('#tbody').empty().append(r); //empty the table and append the partial view
            hideDiv();
        },
        error: function (e) {
            alert('update failed');
        }
    });
}

function saveRow() {
    var url = '/Airline/SaveRow';
    var newCode = $('#inputCode').val();
    var newAirlineName = $('#inputName').val();
    var data = {
        'code': newCode,
        'airlineName': newAirlineName,
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data), // change javascript type to a string "{code: 25342, airlineName: KKK}"
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function (r) { // get partialview
            $('#tbody').empty().append(r); //empty the table and append the partial view
            hideDiv();
        },
        error: function (e) {
            alert('Save failed');
        }
    });
}

function removeRowFromView(rowId) {
    var id = '#tr_' + rowId;
    $(id).remove();
}

function showDiv(btn) {
    document.getElementById("myDiv").style.display = "block";
    /* $('#myDiv').css('display', 'block');*/
    $(btn).attr('disabled');
}

function hideDiv() {
    document.getElementById("myDiv").style.display = "none";
    /* $('#myDiv').css('display', 'none');*/
    $('#plusBtn').removeAttr('disabled'); //
}
