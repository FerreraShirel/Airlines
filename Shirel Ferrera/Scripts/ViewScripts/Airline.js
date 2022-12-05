function oldDeleteRow(rowCode) {
    var url = '/Airline/DeleteRow'
    var data = {
        'code': rowCode
    }
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            removeRowFromView(rowCode);
        },
        error: function (e) {
            alert('Delete failed');
        }
    });
}
//"success: function (data) {$ ("#sub").HTML (data);" 
function DeleteRow(rowId) {
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
function removeRowFromView(rowId) {
    var id = '#tr_' + rowId;
    $(id).remove();
}

function UpdateRow(rowId) {
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
            dataType: "json",
            success: function (r) {
                addRowToView(r); // fix
                hideDiv();
            },
            error: function (e) {
                alert('update failed');
            }
        });
   
}

function ShowDiv(btn) {
    document.getElementById("myDiv").style.display = "block";
    /* $('#myDiv').css('display', 'block');*/
    $(btn).attr('disabled');
}

function hideDiv() {
    document.getElementById("myDiv").style.display = "none";
    /* $('#myDiv').css('display', 'none');*/
    $('#plusBtn').removeAttr('disabled'); //
}

function SaveRow() {
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
        dataType: "json",
        success: function (r) {
            addRowToView(r); 
            hideDiv();
        },
        error: function (e) {
            alert('Save failed');
        }
    });
}
function addRowToView(row) { //check partial view
    var tr = `<tr id="tr_${row.ID}">
                    <td>
                        <input id="input_code_${row.ID}" type="text" class="form-control"  value="${row.Code}" onblur="update('${row.ID}')" tabindex="0" />
                    <td>
                        <input id="input_name_${row.ID}" type="text" class="form-control"  value="${row.AirlineName}" onblur="update('${row.ID}')" tabindex="0" />
                    </td>
                    <td>
                        <input type="image" src="/Images/Red_X.svg.png" height="20" width="20" onclick="DeleteRow('${row.ID}')" />
                        </td>
                    </tr>`;
    $('#tbody').append(tr);
    sortByName();
}



function sortByName() { // צד הלקוח
    var arr = [];
    var tbodyArray = $('#tbody tr');
    $(tbodyArray).each(function () {
        var tdArray = this.children;
        var td = tdArray[1];
        var input = $(td).find('input');
        var value = $(input).val();
        arr.push(value);
    });
    // sort array
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].length < arr[j + 1].length) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    // put sorted trs in tbody
    var sortedTrArray = [];
    var tdArray;
    var td;
    var input;
    var value;
    for (var i = 0; i < arr.length; i++) {
        for (var t = 0; t < tbodyArray.length; t++) {
            tdArray = tbodyArray[t].children;
            td = tdArray[1];
            input = $(td).find('input');
            value = $(input).val();
            if (value == arr[i]) {
                sortedTrArray.push(tbodyArray[t]);
                break;
            }
        }
    }
    $('#tbody').empty().append(sortedTrArray);
}