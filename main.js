(function (ContactManager) {
    var contactManager = new ContactManager('contacts-tbl');

    $(document).ready(contactManager.listContacts());


    $('#newuser-btn').click(function () {
        location.href = 'contact-add.html';
    });

    $("body").on("click", ".delete-btn", function() {
        console.log($(this).data('x'));
        contactManager.deleteContact($(this).data('x'));
    });

    $("body").on("click", ".bulkdelete-btn", function() {
        var boxes = $('.removable');
        var ids = [];
        var id;
        for (var i = 0; i < boxes.length; i++) {
            if ($(boxes[i]).is(':checked')) {
                id = $(boxes[i]).data('id');
                ids.push(id);
            }
        }
        contactManager.bulkDeleteContacts(ids);
    });

})(ContactManager);

