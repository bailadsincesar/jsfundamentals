var persons = (function () {

    function Person(name, lastName) {
        var self = this;

        self.name = name;
        self.lastName = lastName;

        self.getFullName = function () {
            return name + ' ' + lastName;
        }

        Object.defineProperty(self, 'type', {
            configurable: true,
            get: function(){
                return "unknown"
            }
        });
    }

    function Contact(contactId, name, lastName, email, phone) {
        var self = this;

        self.contactId = contactId;
        self.email = email;
        self.phone = phone;

        Person.call(self, name, lastName);

        Object.defineProperty(self, 'type', {
            configurable: true,
            get: function () {
                return "contact"
            }
        });
    }

    return {
        Contact: Contact
    };

})();