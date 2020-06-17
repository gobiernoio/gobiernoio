export const formularios = {
    reporte_vecinal: {
        titulo: "Reporte vecinal", 
        databaseUrlAdmin: "admin/formularios/reporte_vecinal", 
        databaseUrlUser: "reporte_vecinal", 
        showJson: false, 
        route: 'formulario-sesion', 
        style: 
        {
            backgroundColor: '#DEDEDE', 
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/ecatepecapp.appspot.com/o/webapp%2Ffondos%2Ffondo_generico.png?alt=media&token=5db26fee-d218-4eba-8174-ffb83d40ab71)'
        }, 
        campos : [
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12 col-md-6", 
                matLabel: "Nombre completo", 
                formControlName: "nombre", 
                matIcon: "account_circle", 
                matError: "El nombre es requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12 col-md-6", 
                matLabel: "Correo electrónico", 
                formControlName: "email", 
                matIcon: "email", 
                matError: "El correo es un campo requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Calle y número", 
                formControlName: "direccion1", 
                matIcon: "location_city", 
                matError: "Calle y número es un dato requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12 col-md-6", 
                matLabel: "Colonia", 
                formControlName: "direccion2", 
                matIcon: "outlined_flag", 
                matError: "La colonia es requerida"
            }, 
            {
                tipo: "inputCP", 
                formularioElement: true,
                classDiv: "col-12 col-md-6", 
                matLabel: "Código postal", 
                formControlName: "cp", 
                matIcon: "markunread_mailbox", 
                matError: "El C. P. es requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Teléfono", 
                formControlName: "telefonoLocal", 
                matIcon: "local_phone", 
                matError: "El teléfono es un campo requerido"
            }, 
            {
                tipo: "selectDinamico", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Destinatario", 
                formControlName: "destinatario", 
                matIcon: "account_balance", 
                matError: "El destinatario es requerido"
            }, 
            {
                tipo: "selectArchivos", 
                formularioElement: false,
                classDiv: "col-12 col-md-6"
            }, 
            {
                tipo: "selectUbicacion", 
                formularioElement: false,
                classDiv: "col-12 col-md-6"
            }, 
            {
                tipo: "textarea", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Mensaje", 
                formControlName: "mensaje", 
                matError: "El mensaje es un campo requerido"
            }, 
        ]
    }, 
    celula_de_busqueda: {
        titulo: "Celula de búsqueda", 
        databaseUrlAdmin: "admin/formularios/celula_de_busqueda", 
        databaseUrlUser: "celula_de_busqueda", 
        encabezadoImagen: "https://firebasestorage.googleapis.com/v0/b/ecatepecapp.appspot.com/o/webapp%2Flogos%2Flogos_celula-09.png?alt=media&token=eae6f6f6-b7d2-43fe-894c-eca64704d64b", 
        showJson: false, 
        route: 'formulario-sesion', 
        style: 
        {
            backgroundColor: '#DEDEDE', 
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/ecatepecapp.appspot.com/o/webapp%2Ffondos%2Ffondo_generico.png?alt=media&token=5db26fee-d218-4eba-8174-ffb83d40ab71)'
        }, 
        campos : [
            {
                tipo: "texto", 
                formularioElement: false, 
                classDiv: "col-12 p-2", 
                texto: "<b>Ingrese datos de la persona extraviada.</b>"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Nombre completo", 
                formControlName: "nombre", 
                matIcon: "account_circle", 
                matError: "El nombre es requerido"
            }, 
            {
                tipo: "select", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Sexo", 
                formControlName: "sexo", 
                options: ['Hombre', 'Mujer', 'Otro'], 
                matError: "El sexo es requerido"
            }, 
            {
                tipo: "date", 
                formularioElement: true,
                classDiv: "col-6", 
                matLabel: "Fecha de nacimiento", 
                formControlName: "fecha_nacimiento", 
                matIcon: "account_circle", 
                matError: "Esta fecha es requerida"
            }, 
            {
                tipo: "date", 
                formularioElement: true,
                classDiv: "col-6", 
                matLabel: "Fecha de extravío", 
                formControlName: "fecha_extravio", 
                matIcon: "account_circle", 
                matError: "Esta fecha es requerida"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Lugar donde se le vió por última vez", 
                formControlName: "direccion_ultima_vez", 
                matIcon: "location_city", 
                matError: "Este campo es requerido"
            }, 
            {
                tipo: "texto", 
                formularioElement: false, 
                classDiv: "col-12 p-2", 
                texto: "<b>Especifique el lugar de extravío en el mapa y adjunte fotografías.</b>"
            }, 
            {
                tipo: "selectArchivos", 
                formularioElement: false,
                classDiv: "col-12 col-md-6"
            }, 
            {
                tipo: "selectUbicacion", 
                formularioElement: false,
                classDiv: "col-12 col-md-6"
            }, 
            {
                tipo: "texto", 
                formularioElement: false, 
                classDiv: "col-12 p-2", 
                texto: "<b>Ingrese señas particulares y cualquier información que considere importante.</b>"
            }, 
            {
                tipo: "textarea", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Señas particulares", 
                formControlName: "descripcion", 
                matError: "La descripción es un campo requerido"
            }, 
            {
                tipo: "texto", 
                formularioElement: false, 
                classDiv: "col-12 p-2", 
                texto: "<b>Datos de quién reporta.</b>"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-6", 
                matLabel: "Nombre de quién reporta", 
                formControlName: "nombre_reporta", 
                matIcon: "account_circle", 
                matError: "El nombre es requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12 col-md-6", 
                matLabel: "Correo electrónico", 
                formControlName: "email", 
                matIcon: "email", 
                matError: "El correo es un campo requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Teléfono", 
                formControlName: "telefono_local", 
                matIcon: "local_phone", 
                matError: "El teléfono es un campo requerido"
            }, 
        ]
    },
    servicio_de_grua: {
        titulo: "Servicio de grua gratuito", 
        databaseUrlAdmin: "admin/formularios/servicio_de_grua", 
        databaseUrlUser: "servicio_de_grua", 
        showJson: false, 
        route: 'formulario-sesion', 
        style: 
        {
            backgroundColor: '#DEDEDE', 
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/ecatepecapp.appspot.com/o/webapp%2Ffondos%2Ffondo_generico.png?alt=media&token=5db26fee-d218-4eba-8174-ffb83d40ab71)'
        }, 
        campos : [
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Nombre completo", 
                formControlName: "nombre", 
                matIcon: "account_circle", 
                matError: "El nombre es requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Correo electrónico", 
                formControlName: "email", 
                matIcon: "email", 
                matError: "El correo es un campo requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Teléfonos", 
                formControlName: "telefonoLocal", 
                matIcon: "local_phone", 
                matError: "El teléfono es un campo requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Dirección", 
                formControlName: "direccion1", 
                matIcon: "location_city", 
                matError: "La dirección es un dato requerido"
            }, 
            {
                tipo: "texto", 
                formularioElement: false, 
                classDiv: "col-12 p-2", 
                texto: "<b>Mande ubicación y fotografía del vehículo averiado.</b>"
            }, 
            {
                tipo: "selectArchivos", 
                formularioElement: false,
                classDiv: "col-12 col-md-6"
            }, 
            {
                tipo: "selectUbicacion", 
                formularioElement: false,
                classDiv: "col-12 col-md-6"
            }, 
            {
                tipo: "textarea", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Datos adicionales", 
                formControlName: "mensaje", 
                matError: "El mensaje es un campo requerido"
            }, 
        ]
    }, 
    denuncia_ambiental: {
        titulo: "Denuncia ambiental", 
        databaseUrlAdmin: "admin/formularios/denuncia_ambiental", 
        databaseUrlUser: "denuncia_ambiental", 
        showJson: false, 
        route: 'formulario-sesion', 
        style: 
        {
            backgroundColor: '#DEDEDE', 
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/ecatepecapp.appspot.com/o/webapp%2Ffondos%2Ffondo_generico.png?alt=media&token=5db26fee-d218-4eba-8174-ffb83d40ab71)'
        }, 
        campos : [
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Nombre completo", 
                formControlName: "nombre", 
                matIcon: "account_circle", 
                matError: "El nombre es requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Correo electrónico", 
                formControlName: "email", 
                matIcon: "email", 
                matError: "El correo es un campo requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Teléfonos", 
                formControlName: "telefonoLocal", 
                matIcon: "local_phone", 
                matError: "El teléfono es un campo requerido"
            }, 
            {
                tipo: "input", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Dirección", 
                formControlName: "direccion1", 
                matIcon: "location_city", 
                matError: "La dirección es un dato requerido"
            }, 
            {
                tipo: "texto", 
                formularioElement: false, 
                classDiv: "col-12 p-2", 
                texto: "<b>Mande ubicación y fotografía del problema.</b>"
            }, 
            {
                tipo: "selectArchivos", 
                formularioElement: false,
                classDiv: "col-12 col-md-6"
            }, 
            {
                tipo: "selectUbicacion", 
                formularioElement: false,
                classDiv: "col-12 col-md-6"
            }, 
            {
                tipo: "textarea", 
                formularioElement: true,
                classDiv: "col-12", 
                matLabel: "Datos adicionales", 
                formControlName: "mensaje", 
                matError: "El mensaje es un campo requerido"
            }, 
        ]
    }, 
}