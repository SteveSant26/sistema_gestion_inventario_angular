import RolesEnum  from "../config/roles-enum";

interface User {
    email: string;
    name: string;
    password: string;
    role: RolesEnum;
}

export default User; 
