(function (ContactManager) {
    var contactManager = new ContactManager();
    var contactId = getParam('id');

    $('#cancel').click(function () {
        location.href = 'index.html';
    });

    if (contactId === null) {
        $('#save').click(function () {
            contactManager.addContact('contact-frm');
        });

    } else {
        $('#save').text('Save Changes');

        contactManager.populateForm('contact-frm', contactId);

        $('#save').click(function () {
           contactManager.updateContact('contact-frm', contactId);
        });
    }

    function getParam(param) {
        var hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        console.log(hashes);
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            if (hash[0] === param) {
                return hash[1];
            }
        }
        return null;
    }

})(ContactManager);

