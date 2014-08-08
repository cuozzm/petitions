Meteor.ldapLogin = function (username, password, callback) {
  var loginRequest;
  loginRequest = {
    username: username,
    password: password
  };
  return Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
};

Template.login.events({
  'submit form': function(event, template) {
    Session.set('loginError', null);
    event.preventDefault();
    return Meteor.ldapLogin(template.find('#username').value, template.find('#password').value, function (err, user) {
      if (err) {
        $(template.find('.modal-content')).shake(3,7,800);
      } else {
        $(template.find('#loginModal')).modal("hide");
      }
      return;
    });
  }
});

Template.header.events({
  'click #logout-button': function(event, template) {
    event.preventDefault();
    return Meteor.logout(function (err) {
      Router.go("/");
    });
  }
});