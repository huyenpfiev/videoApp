var myApp = angular.module('videoApp', ['ui.router', 'ui-notification']);

myApp.config(function ($stateProvider){
    //$urlRouterProvider.otherwise("home");
    var homeState = {
        name : 'home',
        url: '/home',
        templateUrl: 'home.html'
    };
    var indexState = {
        name : 'index',
        url: '/',
        templateUrl: 'index.html',
        controller: "userController"
    };
    var searchOnYoutube = {
        name : 'searchOnYoutube',
        authenticate: true,
        templateUrl: 'youtube.html',
        controller: 'youtubeController'
    };
    var searchOnVimeo = {
        name : 'searchOnVimeo',
        authenticate: true,
        templateUrl: 'vimeo.html',
        controller: 'vimeoController'
    };
    var showHistory = {
        name : 'showHistory',
        authenticate: true,
        templateUrl: 'showHistory.html',
        controller: 'youtubeController'
    };
    var showUsers = {
        name : 'showUsers',
        authenticate: true,
        templateUrl: 'showUsers.html',
        controller: 'userController'
    };

    var logoutState = {
        name: 'logout',
        url: '/logout',
        authenticate: false,
        templateUrl: '<ui-view/>',
        resolve: {
            logout: function (userService, Notification, tradService) {
                Notification.success({ message: tradService.get('user', 'USER_LOGOUT') });
                return userService.logout();
            }
        }
    };

     var otherwise = {
        name : '404',
         url: "*path",
        authenticate: false,
        templateUrl : '404.html',
    };

    $stateProvider.state(homeState);
    $stateProvider.state(indexState);
    $stateProvider.state(searchOnYoutube);
    $stateProvider.state(searchOnVimeo);
    $stateProvider.state(logoutState);
    $stateProvider.state(showHistory);
    $stateProvider.state(showUsers);

    //$stateProvider.state(otherwise);

});
// Notification module setting
myApp.config(function (NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 5000,
        startTop: 100,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top',
        closeOnClick: true
    });
});
myApp.run(['$rootScope', '$transitions', 'userService', 'Notification', 'tradService', function ($rootScope, $transitions, userService, Notification, tradService) {
    $transitions.onBefore({}, function (transition) {
        var state = transition.$to();

        var isAuth = userService.hasToken();

        if (state.authenticate == true) {
            if (!isAuth) {
                Notification.info({ message: tradService.get('user', 'MUST_LOGGED') });
                return transition.router.stateService.target('home');
            }
        }

    });
}]);