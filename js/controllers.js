angular.module('jinr').controller('jinrController', function($scope,$uibModal,$timeout,$http){
	
	$scope.currentObject;
	$scope.mode = 'normal';
	$scope.sphereControlEnabled = true;
	$scope.spheres;

	$scope.chooseCurrentObject = function(obj){
		$scope.currentObject = obj;
		$scope.currentFlag = "/images/flags/"+obj.id+".png";
		openDrawModal();
	};

	$scope.saveAllImages = function(){

		$http.get('data/data.json').success(function(items){
			for (var i in items){
				var data = localStorage.getItem(items[i].id);
				if (data){
					saveAsImage(data, 'GuestBook_sign_'+items[i].title_en+'.png');
				}
			}
		});
	};
	function openDrawModal() {
	   $scope.sphereControlEnabled = false;
	   $scope.mode = 'dialog';
	   var modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'modalTpl.html' ,
		      backdrop : false,
		      controller : function($scope, $uibModalInstance){
		      	$scope.ok = function() {
		      		$scope.saveImage().then(function(){
		      			 $uibModalInstance.close('save');
		      			 
		      			 for (var i in $scope.spheres){
		      			 	if ($scope.spheres[i].name==$scope.currentObject.id) 
		      			 	{
		      			 		$scope.spheres[i].material.color.setHex(0xffffff);
		      			 	}
		      			 }
		      			},
		      			function(){
		      				
		      			 	$uibModalInstance.close();
		      			 	for (var i in $scope.spheres)
		      			 	if ($scope.spheres[i].name==$scope.currentObject.id) 
		      			 	{
		      			 		$scope.spheres[i].material.color.setHex(0x777777);
		      			 	}


		      			 });
                };
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
		      },
		      scope : $scope		      
	    });
	   modalInstance.result.then(function () {
	      	$scope.mode = 'normal';
	       
	    }, function () {
 	       	$scope.mode = 'normal';
	    });

	  };
});




