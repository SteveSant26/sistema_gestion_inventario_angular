const dashboardRoutesConfig = {
    base: {
        path: "",
        url: "/",
        label: "Inicio",
    },
    children: {
        // Subruta para administrar ubicaciones
        locations: {
            path: "locations",
            url: "/locations",
            label: "Administrar ubicaciones",
        },
        // Subruta para administrar categorías
        categories: {
            path: "categories",
            url: "/categories",
            label: "Administrar categorías",
        },
        // Subruta para administrar activos
        inventory_assets: {
            path: "inventory_assets",
            url: "/inventory_assets",
            label: "Administrar activos",
        },
        // Subruta para administrar usuarios
        users: {
            path: "users",
            url: "/users",
            label: "Administrar usuarios",
        },

    }
}

export default dashboardRoutesConfig;