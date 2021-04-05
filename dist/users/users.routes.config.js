"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config"); // first importing the CommonRoutesConfig class & extending to a new class called UsersRoutes
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes'); // with super(), we pass to CommonRoutesConfig's constructor the application and the name of our routes, which in this scenario is UsersRoutes. super() in turn will call our implementation of configureRoutes()
    }
    configureRoutes() {
        // well add the actual route configuration here next
        //The way .route() works in Express.js lets us handle HTTP verbs with some elegant chaining. This is because .get(), .post(), etc., all return the same instance of the IRoute that the first .route() call does. The final configuration will be like this:
        this.app
            .route(`/users`)
            .get(users_controller_1.default.listUsers)
            .post(users_middleware_1.default.validateRequiredUserBodyFields, users_middleware_1.default.validateSameEmailDoesntExist, users_controller_1.default.createUser);
        //redefined our routes by adding middleware to validate our business logic and the 
        //appropriate controller functions to process the request if everything is valid. 
        // used the .param() function from Express.js to extract the userId.
        //At the .all() function, we are passing our validateUserExists function from UsersMiddleware to be called before
        // any GET, PUT, PATCH, or DELETE can go through on the endpoint /users/:userId. This means validateUserExists doesn’t
        // need to be in 
        //the additional function arrays we pass to .put() or .patch()—it will get called before the functions specified there.
        //We’ve leveraged the inherent reusability of middleware here in another way, too. By passing UsersMiddleware.
        //validateRequiredUserBodyFields to be used in both POST and PUT contexts, we’re elegantly recombining it with 
        //other middleware functions.
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserExists)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            users_middleware_1.default.validateRequiredUserBodyFields,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            users_controller_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            users_middleware_1.default.validatePatchEmail,
            users_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQWtFLENBQUMsNkZBQTZGO0FBRWhLLHNGQUE2RDtBQUM3RCxxRkFBNEQ7QUFFNUQsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQy9DLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLGlOQUFpTjtJQUNoUCxDQUFDO0lBQ0QsZUFBZTtRQUNYLG9EQUFvRDtRQUNwRCw0UEFBNFA7UUFDNVAsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ2YsR0FBRyxDQUFDLDBCQUFlLENBQUMsU0FBUyxDQUFDO2FBQzlCLElBQUksQ0FDRCwwQkFBZSxDQUFDLDhCQUE4QixFQUM5QywwQkFBZSxDQUFDLDRCQUE0QixFQUM1QywwQkFBZSxDQUFDLFVBQVUsQ0FDN0IsQ0FBQztRQUVGLG1GQUFtRjtRQUNuRixrRkFBa0Y7UUFDbEYsb0VBQW9FO1FBRXBFLGlIQUFpSDtRQUNqSCxzSEFBc0g7UUFDdEgsaUJBQWlCO1FBQ2pCLHVIQUF1SDtRQUV2SCw4R0FBOEc7UUFDOUcsK0dBQStHO1FBQy9HLDZCQUE2QjtRQUU3QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsMEJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRzthQUNQLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQUMsMEJBQWUsQ0FBQyxrQkFBa0IsQ0FBQzthQUN2QyxHQUFHLENBQUMsMEJBQWUsQ0FBQyxXQUFXLENBQUM7YUFDaEMsTUFBTSxDQUFDLDBCQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7WUFDM0IsMEJBQWUsQ0FBQyw4QkFBOEI7WUFDOUMsMEJBQWUsQ0FBQyxpQ0FBaUM7WUFDakQsMEJBQWUsQ0FBQyxHQUFHO1NBQ3RCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFO1lBQzdCLDBCQUFlLENBQUMsa0JBQWtCO1lBQ2xDLDBCQUFlLENBQUMsS0FBSztTQUN4QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBakRELGtDQWlEQyJ9