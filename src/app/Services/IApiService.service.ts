import { Catalog } from "../Models/Catalog.model";
import { Company } from "../Models/Company.model";
import { ComplainingUser } from "../Models/ComplainingUser.model";
import { Complaint } from "../Models/Complaint.model";
import { Country } from "../Models/Country.model";
import { HistoryComplaint } from "../Models/HistoryComplaint.model";
import { PersonalInfo } from "../Models/PersonalInfo.model";
import { State } from "../Models/State.model";

export interface IApiService{
    checkLoginAdmin(user: string, password: string): Promise<boolean>;
    checkLoginUser(user: number, password: string): Promise<boolean>;
    postCatalogo(catalogo: Catalog): Promise<boolean>;
    postDenuncia(denuncia: Complaint): Promise<boolean>;
    putDenunciaByFolio(id: number, status: string): Promise<boolean>;
    getDenunciaByFolio(id: number): Promise<Complaint>;
    getDenuncias(): Promise<Complaint[]>;
    postDatosPersonales(datosPersonales: PersonalInfo): Promise<boolean>;
    getDatosPersonal(idDenuncia: number): Promise<PersonalInfo>;
    postHistorialDenuncia(historial: HistoryComplaint) : Promise<boolean>;
    getHistorialDenuncia(idDenuncia: number): Promise<HistoryComplaint[]>;
    postUserDenunciante(datos: ComplainingUser): Promise<boolean>;
    getCompanies(): Promise<Company[]>;
    getCountries(): Promise<Country[]>;
    getStates(): Promise<State[]>;
}