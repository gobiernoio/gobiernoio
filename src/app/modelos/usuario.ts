export class GioUsuario {
    uid:string = ""
    nombre:string = ""
    apellidoPaterno:string = ""
    apellidoMaterno:string = ""
    fotoUrl:string = ""
    telefonoLocal:string = ""
    telefonoCelular:string = ""
    email:string = ""
    emailVerificado:boolean = false
    usuarioAnonimo:boolean = false
    admin:any = ""
    direccion1:string = ""
    direccion2:string = ""
    cp:number = 12345

    constructor(nombre, email, administrador){
        this.nombre = nombre
        this.email = email
    

        this.admin = {
            esAdministrador: administrador, 
            tipo: "usuario", 
            chats: [{}], 
            tramites: [{}], 
            peticiones:[{}]
        }
    }
}