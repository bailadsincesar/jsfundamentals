(function (ContactManager) {
    var contactManager = new ContactManager();

    $('#cancel').click(function () {
        location.href = 'index.html';
    });

    $('#save').click(function () {
       contactManager.addContact('contact-frm');
    });

})(ContactManager);

