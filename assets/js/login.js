/* globals jQuery, QiscusSDK */
jQuery(function () {
  var isLoggedIn = window.sessionStorage.getItem('sdk-sample-app---is-loggedin');
  if (isLoggedIn && Boolean(isLoggedIn) === true) {
    window.location.href = '/index.html';
  }
  jQuery('form#login-form').on('submit', function (event) {
    event.preventDefault();
    var userId = event.target['userId'].value;
    var secret = event.target['password'].value;
    var displayName = event.target['displayName'].value || userId;
    var userAvatar = getAvatarURL(userId);
    QiscusSDK.core.init({
      AppId: window.SDK_APP_ID,
      options: {
        loginSuccessCallback: function (data) {
          console.log('loginSuccessCallback', data);
          // Warning!!
          // Here we store user email (userId) and secret into sessionStorage
          // please note not to store user secret data into browser
          // if you used framework that utilize routing capability
          // save user creds in a special variable and redirect user into
          // main application interface.
          // Here we save it in sessionStorage because, this application
          // did not utilize browser html5 routing and we need to use userId
          // and secret in order to login into QiscusSDK instance on the main
          // application interface.
          var userData = {
            userId: userId,
            secret: secret,
            username: displayName,
            avatarURL: userAvatar
          };
          window.sessionStorage.setItem('sdk-sample-app---is-loggedin', true);
          window.sessionStorage.setItem('sdk-sample-app---user-data', JSON.stringify(userData));
          window.location.href = '/index.html';
        }
      }
    });

    function getAvatarURL(userId) {
      var userIdHash = md5(userId);
      return 'https://www.gravatar.com/avatar/' + userIdHash + '?d=retro';
    }

    QiscusSDK.core.setUser(
        /* userId */ userId,
        /* password */ secret,
        /* displayName */ displayName,
        /* avatarURL */ userAvatar
    );
  });
});
