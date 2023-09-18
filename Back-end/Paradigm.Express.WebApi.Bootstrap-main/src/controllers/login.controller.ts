import { Action, ApiController, Controller } from "@miracledevs/paradigm-express-webapi";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { GET, Path } from "typescript-rest";
import { Tags } from "typescript-rest-swagger";

@Path( "/api/login" )
@Tags("LogIn")
@Controller({ route: "/api/login" })
export class LogInController extends ApiController {
    constructor(private connection: MySqlConnection) {
        super();
    }

    
}
