import { Action, ApiController, Controller } from "@miracledevs/paradigm-express-webapi";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { GET, Path } from "typescript-rest";

@Path( "/api/health" )
@Controller({ route: "/api/health" })
export class HealthController extends ApiController {
    constructor(private connection: MySqlConnection) {
        super();
    }

    @GET
    @Action({ route: "/" })
    async get(): Promise<void> {
        try {
            await this.connection.connection.ping();
            this.httpContext.response.sendStatus(200);
            return;
        } catch {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
}
