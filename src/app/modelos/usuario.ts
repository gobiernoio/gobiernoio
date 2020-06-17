export class GioUsuario {
    uid:string = ""
    displayName:string = ""
    nombre:string = ""
    apellidoPaterno:string = ""
    apellidoMaterno:string = ""
    fotoUrl:string = ""
    telefonoLocal:string = ""
    telefonoCelular:string = ""
    email:string = ""
    emailVerificado:boolean = false
    usuarioAnonimo:boolean = false
    // admin:any = ""
    tipoDeUsuario = ""
    direccion1:string = ""
    direccion2:string = ""
    cp:number = 12345

    constructor(displayName, email, administrador?){
        this.displayName = displayName
        this.email = email
        
        if(administrador) {
            this.tipoDeUsuario = administrador
        } else {
            this.tipoDeUsuario = "ciudadano"
        }

        // this.admin = {
        //     esAdministrador: administrador, 
        //     tipo: "usuario", 
        //     chats: [{}], 
        //     tramites: [{}], 
        //     peticiones:[{}]
        // }
    }
}