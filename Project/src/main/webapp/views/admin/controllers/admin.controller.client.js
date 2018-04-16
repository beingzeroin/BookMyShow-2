(function () {
    angular
        .module("BookMyShow")
        .controller("adminController", adminController);
    function adminController($location, $scope, $routeParams, UserService, TheatreOwnerService, TheatreService, $rootScope, $route){
        var vm = this;
        vm.editId = $routeParams['uid'];
        vm.role=  $routeParams['role'];
        vm.allUsers=null;
        vm.allTheatreOwners=null;
        vm.deleteUser = deleteUser;
        vm.deleteTheatreOwner=deleteTheatreOwner;
        vm.updateUser = updateUser;
        vm.redirectFunc= redirectFunc;
        vm.listUsers = listUsers;
        vm.logout = logout;

        function init() {
            if (vm.role){
                renderUser();
            }
            else {
                listUsers();
            }
        }
        init();

        function listUsers() {
            var promise = UserService.getAllUsers();
            promise.success(function (users) {
                    vm.allUsers = users;
                },
                function (err) {
                    vm.error = err;
                });
            var promise = TheatreOwnerService.getAllTheatreOwners();
            promise.success(function (users) {
                    vm.allTheatreOwners = users;
                },
                function (err) {
                    vm.error = err;
                });
        }

        function redirectFunc(userId, role) {
            $location.url("/admin/users/"+userId+"/edit/"+role);
        }


        function renderUser() {
             if (vm.role === "user") {
                 var promise = UserService.findUserById(vm.editId);
                 promise.success(function (user) {
                         vm.editUser =  user;
                     },
                     function (err) {
                         vm.error = err;
                     });

             }
             else if (role === "theatreOwner") {
                 var promise = TheatreOwnerService.findTheatreOwnerById(editId);
                 promise.success(function (user) {
                         vm.editUser =  user;
                     },
                     function (err) {
                         vm.error = err;
                     });
             }
         }


        function deleteTheatreOwner(theatreOwnerId) {
            if(confirm('are you sure?')){
                TheatreOwnerService.deleteTheatreOwner(theatreOwnerId)
                    .then(function () {
                        $route.reload();
                    });}
            else{
                $location.redirect("/admin/users");//+vm.adminId);
            }
        }

        function deleteUser(userId) {
            if(confirm('are you sure?')){
                UserService.deleteUser(userId)
                    .then(function () {
                        $route.reload();
                    });}
            else{
                $location.url("/admin/users");//+vm.adminId);
            }
        }

        // function updateUser(newUser) {
        //     if(newUser){
        //         $rootScope.userId = newUser._id;
        //     }
        //     $location.url("/admin/updatecust/cust");
        // }

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                });
        }

        function updateUser(newUser) {

            var userId = vm.editId;
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    init();
                    vm.message = "user successfully updated";
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }
    }
})();