var ContactManager = (function ($, persons, ContactTable) {
    var Contact = persons.Contact;

    function ContactManager(tableId) {

        var contactTable = new ContactTable(tableId);

        this.listContacts = function () {
            $.ajax('/contacts', {method: 'GET'}).then(
                function (data) {
                    var contacts = parseToContactsArray(data);
                    contactTable.populateTable(contacts);
                },
                alert
            );
        }

        this.addContact = function (formId) {
            $('#message').text('Creating contact. Please wait...');

            $.ajax(
                '/contacts/',
                {
                    method: "POST",
                    data: {
                        contact: {
                            name: $("#" + formId + " input[name='name']").val(),
                            lastName: $("#" + formId + " input[name='lastname']").val(),
                            email: $("#" + formId + " input[name='email']").val(),
                            phone: $("#" + formId + " input[name='phone']").val(),
                        }
                    }
                }
            ).then(
                function (data){
                    $('#message').text('');
                    alert('Contact successfuly created!');
                    location.href = 'index.html';
                },
                alert
            );

        }

        this.deleteContact = function (contact) {
            var accepts = confirm('Are you sure you want to delete ' + contact.name + ' ' + contact.lastName + '?');

            if (accepts) {
                $.ajax('/contacts/' + contact.contactId, {method: 'DELETE'}).then(
                    function (data) {
                        location.href = 'index.html';
                    },
                    alert
                );
            }
        }

        this.bulkDeleteContacts = function (contactIds) {
            var accepts = confirm('Are you sure you want to delete the selected contacts?');

            if (accepts) {
                for (var i = 0; i < contactIds.length; i++) {
                    console.log(contactIds[i]);
                    $.ajax('/contacts/' + contactIds[i], {method: 'DELETE'}).then();
                }
            }

            location.href = 'index.html';

        }

        function parseToContactsArray(data) {
            var contacts = [];
            var contact;
            for (var i = 0; i < data.length; i++) {
                contact = new Contact(data[i].contactId, data[i].name, data[i].lastName, data[i].email, data[i].phone);
                contacts.push(contact);
            }

            return contacts;
        }
    }

    return ContactManager;

})(jQuery, persons, ContactTable);