export const tablas = {
    denuncia_ambiental : {
        tableStructure : [
            {
                type: "item", 
                key: "id", 
                text: "Clave"
            }, 
            {
                type: "item", 
                key: "mensaje", 
                text: "Mensaje"
            }, 
            {
                type: "delete", 
                key: "borrar", 
                text: "Borrar"
            }, 
            {
                type: "edit", 
                key: "editar", 
                text: "Editar"
            }
        ], 
        ruta: "admin/formularios/denuncia_ambiental"
    }, 
    denuncia_anonima : {
        tableStructure: [
            {
                type: "item", 
                key: "id", 
                text: "Clave"
            }, 
            {
                type: "item", 
                key: "mensaje", 
                text: "Mensaje"
            }, 
            {
                type: "delete", 
                key: "borrar", 
                text: "Borrar"
            }, 
            {
                type: "edit", 
                key: "editar", 
                text: "Editar"
            }
        ], 
        ruta: "admin/formularios/denuncia_anonima"
    }
}