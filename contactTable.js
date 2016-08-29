var ContactTable = (function () {

    return function (tableId) {
        var table = $('#' + tableId);

        this.populateTable = function(contacts) {
            table.empty();
            appendTableHeader();
            for (var i = 0; i < contacts.length; i++) {
                console.log(contacts[i]);
                appendContact(contacts[i]);
            }
        }

        function appendTableHeader() {
            table.append('<tr><td>NAME</td><td>EMAIL</td><td>PHONE NUMBER</td><td>EDIT</td><td>DELETE</td><td><button class="bulkdelete-btn">DELETE</button></td></tr>')
        }

        function appendContact(contact) {
            var row = '<tr>';
            row += '<td>' + contact.getFullName() + '</td>';
            row += '<td>' + contact.email + '</td>';
            row += '<td>' + contact.phone + '</td>';
            row += '<td><button class="editable" data-id="' + contact.contactId + '">Edit</button></td>';
            row += "<td><button class='delete-btn' data-x='" + JSON.stringify(contact) + "'>Delete</button></td>";
            row += '<td><input class="removable" data-id="' + contact.contactId + '" type="checkbox"></td>';
            row += '</tr>';
            table.append(row);
        }

    }

})();
