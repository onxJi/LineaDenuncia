export interface Complaint {
    idDenuncia: number;
    idDenunciante: number;
    tituloDenuncia: string;
    empresa: string;
    pais: string;
    estado: string;
    numCentro: string;
    folio: number;
    passwordDenuncia: string;
    detalleDenuncia: string;
    estatus: string;
    fechaDenuncia: Date;
}