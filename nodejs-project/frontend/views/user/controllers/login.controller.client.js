(function() {
	angular.module("BookMyShow").controller("loginController", loginController);

	function loginController($location, UserService, TheatreOwnerService) {
		console.log("Login Controller Loaded");
		var vm = this;

		// Event Handlers
		vm.login = login;

		function init() {

		}
		init();

		function login(user) {
			var loginUser = {id: 'sandy'};
			$location.url('/user/' + loginUser.id);
			var promise = UserService.findUserByCredentials(user.username,
					user.password);
			promise.success(function(response) {
				var loginUser = response[0];
				if (loginUser != undefined) {
					$location.url('/user/' + loginUser.id);
				} else {
					checkTheaterOwner(user);
				}
			}).error(function(err) {
				vm.error = 'user not found';
			});
		}
		
		function checkTheaterOwner(user){
			var loginUser = {id: 'sandy'};
			$location.url('/theatreOwner/'+ loginUser.id +'/profile/');

			var promise = TheatreOwnerService.findTheatreOwnerByCredentials(user.username,
					user.password);
			promise.success(function(response) {
				var loginUser = response[0];
				if (loginUser != undefined) {
					$location.url('/theatreOwner/'+ loginUser.id +'/profile/');
				} else {
					checkAdmin(user);
				}
			}).error(function(err) {
				vm.error = 'user not found';
			});
		}
		
		function checkAdmin(user){
			var promise = UserService.findAdminByCredentials(user.username,
					user.password);
			promise.success(function(response) {
				var loginUser = response[0];
				if (loginUser != undefined) {
					$location.url('/admin/manage');
				} else {
					vm.error = 'user not found';
				}
			}).error(function(err) {
				vm.error = 'user not found';
			});
		}
	}
})();