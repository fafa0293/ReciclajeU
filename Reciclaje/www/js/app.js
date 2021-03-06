// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

angular.module('starter', ['ionic', 'appServices', 'appControllers','appDirectives', 'ui.validate',
  'underscore','ngResource',
  'ngCordova',
  'slugifier',
  'angularMoment'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })

  .state('app.account', {
    url: '/account',
    views: {
      'menuContent': {
        templateUrl: 'templates/account.html',
        controller: 'accountController'
      }
    }
  })

  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })
    .state('app.top10', {
      url: '/top10',
      views: {
        'menuContent': {
          templateUrl: 'templates/top10.html',
          controller: 'toptenController'
        }
      }
    })

  .state('app.awards', {
    url: '/awards',
    views: {
      'menuContent': {
        templateUrl: 'templates/awards.html',
        controller: 'awardsController'
      }
    }
  })
  .state('app.scan', {
    url: '/scan',
    views: {
      'menuContent': {
        templateUrl: 'templates/scanner.html',
        controller: 'scannerController'
      }
    }
  })
  .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html',
        controller: 'singupController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/awards');
});
