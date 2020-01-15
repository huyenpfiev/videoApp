myApp.controller('youtubeController', ['$scope', 'youtubeService', '$rootScope', function ($scope, $youtubeService, $rootScope) {
    $scope.youtubeData = [];
    $scope.nextPage = "";
    $scope.youtubeSearchText = "";

    $scope.getYoutubeData = function(searchText){
        var pageToken = $scope.nextPage ? $scope.nextPage : '';
        $youtubeService.getYoutubeData(searchText, pageToken, function (res) {
            var data = res.items;
           
            if (data.length === 0) {
                $scope.youtubeData = 'No results were found!';
            }
            $scope.youtubeData = data;
            $scope.nextPageToken = res.nextPageToken;
            $scope.prevPageToken = res.prevPageToken;
            getVideosInfo();
        });
        $youtubeService.addToHistory(searchText, $scope.user.email, function(res){
            if(res){
              
            }
        });
    };
    $scope.initPage = function(){
        $scope.nextPage = "";
    };

    getVideosInfo = function(){
        $scope.youtubeData.forEach(function(video) {
            $youtubeService.getVideosInfo(video.id.videoId, function (res) {
                var data = res;
                video.duration = data.duration;
                video.likeCount = data.likeCount;
                video.channelId = data.channelId;
            });
        });

    };
    $scope.checkDataLength = function(data){
        return (data.length >=1);
    };

    $scope.callNextPageFn = function(nextPage){
        $scope.nextPage = nextPage;
        $scope.getYoutubeData($scope.youtubeSearchText);
    };
    $scope.$on('$viewContentLoaded', function(event) {
        $rootScope.$broadcast('getHistorySet');
        $youtubeService.getHistorySet(function(res){
            $scope.youtubeHistorySet = res;
        });
    });
}]);