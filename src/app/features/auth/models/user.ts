import RolesEnum  from "../config/roles-enum";

interface User {
    email: string;
    password: string;
    role: RolesEnum;
}

export default User; 
