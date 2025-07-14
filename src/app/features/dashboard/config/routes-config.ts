export const dashboardRoutesConfig = {
    base: {
        path: 'dashboard',
        url: '/dashboard',
        label: "Inicio",
    },
    children: {
        // Subruta para administrar ubicaciones
        locations: {
            path: "locations",
            url: "/dashboard/locations",
            label: "Administrar ubicaciones",
        },
        // Subruta para administrar categorías
        categories: {
            path: "categories",
            url: "/dashboard/categories",
            label: "Administrar categorías",
        },
        // Subruta para administrar activos
        inventory_assets: {
            path: "inventory_assets",
            url: "/dashboard/inventory_assets",
            label: "Administrar activos",
        },
        // Subruta para administrar usuarios
        users: {
            path: "users",
            url: "/dashboard/users",
            label: "Administrar usuarios",
        },
        // Subruta para ver activos asignados (trabajadores)
        my_assets: {
            path: "my_assets",
            url: "/dashboard/my_assets",
            label: "Mis activos asignados",
        },

    }
}

