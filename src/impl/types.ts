import { UserApiImpl } from "./user/types";
import { ApiImplementation } from "../../dict/types";


export class serviceApilmpl implements ApiImplementation {
    user:UserApiImpl=new UserApiImpl
}
