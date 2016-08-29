var ContactManager = (function ($, persons, ContactTable) {
    var Contact = persons.Contact;

    function ContactManager(tableId) {

        var contactTable = new ContactTable(tableId);

        this.listContacts = function () {
            $.ajax('/contacts', {method: 'GET'}).then(
                function (data) {
                    var contacts = parseToContactsArray(data);
                    if (contacts.length > 0) {
                        contactTable.populateTable(contacts);
                    } else {
                        alert('The contacts list is empty.');
                    }
                }
            ).catch(
                function (data) {
                    alert('There was an error retrieving contacts list.');
                }
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
                    alert('Contact successfuly created!');
                    $('#message').text('');
                    location.href = 'index.html';
                }
            ).catch(
                function (data) {
                    alert('There was an error creating contact. Try again.');
                    $('#message').text('');
                }
            );
        }

        this.deleteContact = function (contact) {
            var accepts = confirm('Are you sure you want to delete ' + contact.name + ' ' + contact.lastName + '?');

            if (accepts) {
                $.ajax('/contacts/' + contact.contactId, {method: 'DELETE'}).then(
                    function (data) {
                        location.href = 'index.html';
                    }
                ).catch(
                    function (data) {
                        alert('There was an error deleting contact.');
                    }
                );
            }
        }

        this.bulkDeleteContacts = function (contactIds) {
            var accepts = confirm('Are you sure you want to delete the selected contacts?');

            if (accepts) {
                for (var i = 0; i < contactIds.length; i++) {
                    $.ajax('/contacts/' + contactIds[i], {method: 'DELETE'});
                }
            }

            location.href = 'index.html';
        }

        this.populateForm = function (formId, contactId) {
            $.ajax('/contacts/' + contactId, {method: 'GET'}).then(
                function (data) {
                    $("#" + formId + " input[name='name']").val(data.name);
                    $("#" + formId + " input[name='lastname']").val(data.lastName);
                    $("#" + formId + " input[name='email']").val(data.email);
                    $("#" + formId + " input[name='phone']").val(data.phone);
                },
                alert
            );
        }

        this.updateContact = function (formId, contactId) {
            $('#message').text('Updating contact. Please wait...');

            $.ajax(
                '/contacts/' + contactId,
                {
                    method: "PUT",
                    data: {
                        contact: {
                            contactId: contactId,
                            name: $("#" + formId + " input[name='name']").val(),
                            lastName: $("#" + formId + " input[name='lastname']").val(),
                            email: $("#" + formId + " input[name='email']").val(),
                            phone: $("#" + formId + " input[name='phone']").val(),
                        }
                    }
                }
            ).then(
                function (data){
                    alert('Contact successfuly updated!');
                    $('#message').text('');
                    location.href = 'index.html';
                }
            ).catch(
                function (data) {
                    alert('There was an error updating contact. Try again.');
                    $('#message').text('');
                }
            );
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