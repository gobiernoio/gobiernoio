export class Mensaje {
    id 
    remitente:any
    destinatario:any
    rutaRemitenteMensaje:string
    rutaRemitenteMisMensajes:string
    rutaDestinatarioMensaje:string
    rutaDestinatarioMisMensajes:string
    mensaje
    archivo:any
    fecha:number = new Date().getTime()

    constructor(id, remitente, destinatario, mensaje, archivo?) {
        this.id = id
        this.remitente = {}
        this.destinatario = {}
        this.armarRemitente(remitente)
        this.armarDestinatario(destinatario)
        this.mensaje = mensaje
        this.archivo = archivo
    }


    armarDestinatario(destinatario){
        this.destinatario.uid = destinatario.uid
        this.destinatario.nombre = destinatario.nombre
    }

    armarRemitente(remitente){
        if(remitente.displayName) this.remitente.nombre = remitente.displayName
        else this.remitente.nombre = remitente.uid

        this.remitente.uid = remitente.uid
    }
}