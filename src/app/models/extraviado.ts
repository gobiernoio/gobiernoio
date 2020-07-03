export class GioExtraviado {
    uid:string = ""
    nombre:string = ""
    nombre2:string = ""
    fecha_nacimiento:string = ""
    fecha_extravio:string = ""
    sexo:string = ""
    telefonos:string = ""
    email:string = ""
    emailVerificado:boolean = false
    usuarioAnonimo:boolean = false
    admin:any = ""
    direccion1:string = ""
            
    
    // archivosArray: [[]],
    // coordenadas: [[]],



    constructor(nombre, email, administrador){
        this.nombre = nombre
        this.email = email
        this.sexo = ""
    

        this.admin = {
            esAdministrador: administrador, 
            tipo: "usuario", 
            chats: [{}], 
            tramites: [{}], 
            peticiones:[{}]
        }
    }
}