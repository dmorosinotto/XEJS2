@{ layout=null; }
//Logica client-side Angular che richiama /Values/api
angular.module('ValuesApp',[])
	.controller('ValuesCtrl', function($scope,$http){ 
        var apiUrl = '@Url.Content("~/Values/api")';
		$scope.values = [];
        $scope.data = {};
		$scope.newValue = "";        

        //Helper per mostrare a video eventuali errori
        function _ShowErr(doing) {            
            return function(err,status) {                 
                alert('ERRORE ' + (doing||'') + ': [' + (err.status||status) + '] ' + (err.data||err));
            }
        }

        //GET values/api   --> Ritorna tutti i valori
        $http.get(apiUrl)
            .success(function(data){                
                $scope.values = data;                
            }).error( _ShowErr('INIZIALIZZAZIONE') );

        //POST values/api  --> Inserisce nuovo valore e ritorna indice
		$scope.Add = function() {            
			$http.post(apiUrl, { newValue: $scope.newValue })
                .then( function(idx){ 
                            //GET values/api/xxx  --> Legge valore appena inserito
                            $http.get(apiUrl+'/'+idx.data)
                                .success(function(data) {
                                    $scope.values.push(data);
                                    $scope.newValue="";
                                }).error( _ShowErr('LETTURA') );
                        }, _ShowErr('INSERIMENTO') 
                );
		};

        //DELETE values/api/xxx  --> Cancella un valore per indice
		$scope.Del = function(idx) {            
			$http.delete(apiUrl + '/' + idx)
				.success(function(){
					delete $scope.values[idx];
				}).error( _ShowErr('CANCELLAZIONE'));
		}
	});
