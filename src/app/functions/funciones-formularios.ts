export class funcionesFormularios {


    public generarFolio(longitudFolio?:number, caracteresDeRecorte?:number, prefijo?:string, sufijo?:string) {
        let longitud,
            recorte, 
            pre, 
            suf

        if(longitudFolio) {
            longitud = longitudFolio
        } else {
            longitud = 9
        }

        if(caracteresDeRecorte) {
            recorte = caracteresDeRecorte
        } else {
            recorte = 6
        }

        if(prefijo) {
            pre = prefijo
        } else {
            pre = ""
        }

        if(sufijo) {
            suf = sufijo
        } else {
            suf = ""
        }

        // Obtenemos la estampa del tiempo
        let estampaDeTiempo = new Date().getTime()
        // convertimos la estampa a cadena de texto
        let estampaString:string = estampaDeTiempo.toFixed()
        // Medimos el largo de la estampa de tiempo convertida en cadena de texto
        let largo = estampaString.length
        // Recortamos el largo del folio si es necesario
        let preFolio = estampaString.substring(recorte,largo)
        // armamos el folio
        let folio = pre+preFolio+suf

        return folio;

    }


    public idArchivo(){
        let estampa = new Date().getTime();
        let estampaString:string = estampa.toFixed();
        let longitud = estampaString.length
        let folio = estampaString.substring(6,longitud)

        return folio;
    }


}