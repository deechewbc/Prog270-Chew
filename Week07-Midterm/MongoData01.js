/**
 * @author Charlie Calvert
 */


angular.module('elvenApp', ['pres'])
.controller('MyController', function($scope, $http, presidents) {
    $scope.hint = "<p>Start with <strong>node server.js</strong> to retrieve JSON from Server</p>";
    
    // $scope.presidents = presidents;
    $scope.presidents = presidents.query({}, function(users) {
      $scope.presidentsLength = $scope.presidents.length;
      console.log($scope.presidentsLength);
    });
	
	var getDataJson = $http.get('data.json');

	getDataJson.success(function(data, status, headers, config)  {
		$scope.data = data;
	});
	
	getDataJson.error(function(data, status, headers, config) {
		throw new Error('Oh no! An Error!');
	});

});

angular.module('pres', ['ngResource'])
.factory('presidents', function($resource) {
	console.log('Presidents factory called');
	var Presidents = $resource('https://api.mongolab.com/api/1/databases/chew/collections/Prog270/:id', {
      // apiKey:'5282f680e4b096aaeb8f4a28',
      apiKey:'v8pvTGm9HmXIyxeu9F-0AStYYnlAQU9L',
      id:'@_id.$oid'
    });

    Presidents.prototype.getfirstName = function() {
      return this.firstName;
    };
    
    Presidents.prototype.getlastName = function() {
    	return this.lastName;
    };
    
    Presidents.prototype.getage = function() {
    	return this.age;
    };

    return Presidents;    
	 
	// return { a: 2 };		
});
