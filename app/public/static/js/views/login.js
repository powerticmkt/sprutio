// Generated by CoffeeScript 1.11.1
var Login,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Login = (function(superClass) {
  extend(Login, superClass);

  function Login() {
    return Login.__super__.constructor.apply(this, arguments);
  }

  Login.prototype.el = '#login-container';

  Login.prototype.events = {
    'submit #login-form': 'loginSubmit'
  };

  Login.prototype.initialize = function() {
    this.login_form = $('#login-form', this.$el);
    return this.login_button = $('#login-submit');
  };

  Login.prototype.loginSubmit = function(e) {
    var form_data;
    e.preventDefault();
    if (this.login_button.hasClass('disabled')) {
      return;
    }
    this.login_button.button('loading');
    form_data = BB.Form.toObject(this.login_form);
    return BB.Transport.ajaxRequest('/auth', {
      data: form_data,
      success: (function(_this) {
        return function(data) {
          if (!data.error) {
            return window.location = data.url;
          }
        };
      })(this),
      error: (function(_this) {
        return function(response) {
          var data;
          data = response.responseJSON || {};
          if (data.error) {
            BB.Form.renderErrorOutput(_this.login_form, data.message, data.errors);
          }
          _this.login_button.button('reset');
          return _this.render();
        };
      })(this)
    });
  };

  return Login;

})(BB.View);
