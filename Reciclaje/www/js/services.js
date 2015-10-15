angular.module("appServices", [])

.service('session',function(){
    user = {
                name: "",
                lastName: "",
                email: "",
                image:""
                
            };
    var loged = false;
    
    return {
        getUser : function(){
            return user;
        },
        setUser : function(value){
            user = value;
        },
        getLoged : function(){
            return loged;
        },
        setLoged  : function(value){
            loged =  value ;
        }
    } 
})

.service('$userData', function(){
    var users = [
            {
                name: "John",
                lastName: "Doe",
                email: "jdoe@ucenfotec.ac.cr",
                password: "123456asd",
                image:"img/a7.jpg",
                points:10,
                currentPoints:10
                
            },
        {
                name: "Ashley",
                lastName: "Doe",
                email: "adoe@ucenfotec.ac.cr",
                password: "123456asd",
                image:"img/a3.jpg",
                points:50,
                currentPoints:15
                
            },
        {
                name: "Esteban",
                lastName: "Vargas Rodriguez",
                email: "evargasr@ucenfotec.ac.cr",
                password: "123456asd",
                image:"img/a6.jpg",
                points:5,
                currentPoints:0
                
            }
        ];
    return {
        getUsers : function(){
            return users;
        },
        setUsers : function(value){
            users = value;
        }
    } 
})

/*.service('$sharedData', function(){
    var loggedUser = "";
    var loggedEmail = "";
    var loged = false;
    return {
        getLoggedUser : function(){
            return loggedUser;
        },
        setLoggedUser  : function(value){
            loggedUser =  value ;
        },
        getLoggedEmail : function(){
            return loggedEmail;
        },
        setLoggedEmail  : function(value){
            loggedEmail =  value ;
        },
        getLoged : function(){
            return loged;
        },
        setLoged  : function(value){
            loged =  value ;
        }
    }
})*/

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);