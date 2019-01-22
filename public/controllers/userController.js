myApp.controller('userController', ['$scope', 'userService', 'youtubeService', 'vimeoService', '$state', '$rootScope', 'Notification', 'tradService', function ($scope, $userService, $youtubeService, $vimeoService, $state, $rootScope, Notification, $tradService) {
    $scope.user = {};

    $scope.isLogged = false;

    $rootScope.$on('userLoad', function (event, opt) {
        $scope.user = opt.user;
        $scope.isLogged = opt.isLogged;
    });

    $rootScope.$on('userUnload', function (event, opt) {
        $scope.user = {};
        $scope.isLogged = false;
    });

    // Trigger when scope is loaded
    $scope.$on('$viewContentLoaded', function (event) {
        $userService.isLogged(function (resp) {
            $rootScope.$broadcast('userLoad', { user: resp.user, isLogged: resp.isAuth })
        });
    });

    $scope.userLogged = function () {
        $userService.isLogged(function (resp) {
            $scope.user = resp.user;

            $scope.isLogged = resp.isAuth;
            $rootScope.$broadcast('userLoad', { user: $scope.user });
        });
    }

    $scope.register = function () {
        $userService.register($scope.user, function (res) {
            if (res.success) {
                $state.go('/');
                Notification.success({ message: $tradService.get('user', 'USER_CREATE_SUCCESS') });
            }
            else {
                res.errorSet.forEach(element => {
                    Notification.error({ message: $tradService.get('user', element) });
                });
            }
        });
    }

    $scope.login = function () {
        $userService.login($scope.user, function (res) {
            if (res.success == true) {
                $scope.user = res.user;
                // Update navbar
                $rootScope.$broadcast('userLoad', { user: $scope.user, isLogged: true });

                // Store login token
                $userService.storeToken(res.token);

                $state.go('/');
                Notification.success({ message: $tradService.get('user', 'LOGIN_SUCCESS') });
            }
            else {
                res.errorSet.forEach(element => {
                    Notification.error({ message: $tradService.get('user', element) });
                });
            }
        });
    };
    $scope.$on('$viewContentLoaded', function(event) {
        console.log('user set loaded');
        $userService.getUserSet(function(res){
            $scope.userSet = res;
            console.log(res);
        });
    });
    $scope.updateUser = function(user){
        $userService.updateUser(user, function (res) {
            if (res.success == true) {
                Notification.success({ message: $tradService.get('user', 'USER_UPDATED') });
            }
        });
    };
    $scope.showUserHistory = function(user){
        $youtubeService.showUserHistory(user, function(res){
            $scope.userYoutubeHistorySet = res;
        });
        $vimeoService.showUserHistory(user, function(res){
            $scope.userYimeoHistorySet = res;
        });
    };
    $scope.userLogged();
}]);