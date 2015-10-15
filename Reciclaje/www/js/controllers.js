angular.module('appControllers', ['appServices'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $userData, session, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.logged = false;
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
    
    $scope.signup = function() {
        $scope.closeLogin();
        $state.go("app.signup");
        
    };
    
    $scope.$on('login',function(event, param){
        session.setUser(param);
        session.setLoged(true);
       $scope.logged = session.getLoged(); 
        $state.go("app.account");
    })
    
    $scope.$on('logout',function(event, param){
       $scope.logout();
    })
    
    $scope.logout=function(){
        $scope.logged = false;
        session.setUser = {};
      session.setLoged(false);
        login()
    }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    
      $scope.authError = null;
      $scope.users = $userData.getUsers();
      var totalUsers = $scope.users.length;
          var usernameTyped = $scope.loginData.username;
          var passwordTyped = $scope.loginData.password;
          var loggedin= false;
          var index;
      
         for(i=0; i < totalUsers; i++ ) {
              if( $scope.users[i].email == usernameTyped && $scope.users[i].password == passwordTyped) {
                  loggedin=true;
                  index=i;
              }
          }

          if( loggedin == true ) {
              $timeout(function() {
                  
                  
                  $scope.$emit("login",$scope.users[index]);
      $scope.closeLogin();
    }, 1000);
          } else {
              $scope.authError="Email o contraseña incorrecta";
              session.setLoged(false);
          }
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('awardsController', function($scope, $stateParams, $http) {
    $scope.feeds_categories = [];

	$http.get('awards.json').success(function(response) {
		$scope.feeds_categories = response;
	});

})

.controller('scannerController', function($scope, $cordovaBarcodeScanner) {
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };

})

.controller('singupController', function($scope, $stateParams, session, $userData, $state) {
    $scope.signupData={};
    var newUser = {
            name:"",
            email:"",
            password:"",
            lastName:"",
        image:"",
        points:0
        };
    $scope.authError = null;
    $scope.users = $userData.getUsers();
    var totalUsers = $scope.users.length;
    $scope.doSignUp = function(){
    
        
        for(i=0; i < totalUsers; i++ ) {
         
          if( $scope.users[i].email == $scope.signupData.email) {
              $scope.authError="Email ya está registrado";
          }else{
              newUser = {
                name:$scope.signupData.name,
                email:$scope.signupData.email,
                password:$scope.signupData.password,
                lastName:$scope.signupData.lastName,
                  image:"",
                  points:0,
                  currentPoints:0
              }
              $scope.users.push(newUser);
              $userData.setUsers($scope.users);
              $scope.$emit("login",JSON.parse(JSON.stringify(newUser)));
              $state.go("app.account");
          }
        }
        
    }
})
.controller('toptenController',function($userData, $scope){
    $scope.usersFullList=$userData.getUsers();
    $scope.top10 = [];
    
    
    
    $scope.getOrder=function(a,b){
        
      if (a.points > b.points)
        return -1;
      if (a.points < b.points)
        return 1;
      return 0;
    }
    
    $scope.getTop10=function(){
        $scope.usersFullList.sort($scope.getOrder);
        for(i=0;i<10&&i<$scope.usersFullList.length;i++){
            $scope.top10.push($scope.usersFullList[i]);
        }
        
    }
    
    $scope.getTop10();
    
})
    
.controller('accountController', function($scope, $stateParams, session, $userData, $state, Camera) {
   
    $scope.user=JSON.parse(JSON.stringify(session.getUser()));
    console.log(session.getUser());
    console.log($scope.user);
    if($scope.user.image==""){
        $scope.user.image = "img/User-icon.png";
    }
});

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}


