import { EventEmitter } from '@angular/core';

export class Subida {
 
    $key:string
    file:File
    name:string
    url:string
    createdAt:Date = new Date()
    date:number

    progress:number
    active:boolean
    finalizado

    jsonArchivo:any

    constructor(file:File){
        this.finalizado = new EventEmitter()
        this.file = file
        this.date = new Date().getTime()
    }


    construirJson(){
        this.jsonArchivo = {
            url: this.url, 
            nombre: this.name, 
            name: this.file.name, 
            size: this.file.size, 
            type: this.file.type, 
            date: this.date
        }

        return this.jsonArchivo
    }

}