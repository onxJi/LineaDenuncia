import { Catalog } from "../Models/Catalog.model";
import { Company } from "../Models/Company.model";
import { ComplainingUser } from "../Models/ComplainingUser.model";
import { Complaint } from "../Models/Complaint.model";
import { Country } from "../Models/Country.model";
import { HistoryComplaint } from "../Models/HistoryComplaint.model";
import { PersonalInfo } from "../Models/PersonalInfo.model";
import { State } from "../Models/State.model";
import { IApiService } from "./IApiService.service";

export class ApiService implements IApiService{

    private _baseUrl: string;

    constructor(){
        this._baseUrl = "http://www.apijaz.somee.com/";
    }
    async checkLoginAdmin(user: string, password: string): Promise<boolean> {
        let isValidLogin = false;
        const uri = this._baseUrl + "api/UserAdmins/CheckLogin?user=" 
        + user + "&pass=" + password;
        try{
            const response = await fetch(uri)
                .then((response) => response.json())
                .then((data) => {
                    isValidLogin = data as boolean;
                });
            return isValidLogin;
        }catch(error){
            alert(error);
            
        }
        return isValidLogin;
    }
    async checkLoginUser(user: number, password: string): Promise<boolean> {
        let isValidLogin = false;
        const uri = this._baseUrl + "api/UserDenunciantes/CheckLogin?user="
            + user + "&pass=" + password;
        try {
            const response = await fetch(uri)
                .then((response) => response.json())
                .then((data) => {
                    isValidLogin = data as boolean;
                });
            return isValidLogin;
        } catch (error) {
            alert(error);

        }
        return isValidLogin;
    }
    async postCatalogo(catalogo: Catalog): Promise<boolean> {
        let result = false;
        const uri = this._baseUrl + "api/Catalogos";
        try {
            const response = await fetch(uri, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(catalogo),
            })
                .then((response) => response.json())
                .then((data) => {
                    result = data as boolean;
                });
            return result;
        } catch (error) {
            alert(error);
        }
        return result;

    }
    async postDenuncia(denuncia: Complaint): Promise<boolean> {
        let result = false;
        const uri = this._baseUrl + "api/Denuncias";
        try {
            const response = await fetch(uri, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(denuncia),
            })
                .then((response) => response.json())
                .then((data) => {
                    result = data as boolean;
                });
            return result;
        } catch (error) {
            alert(error);
        }
        return result;
    }
    async putDenunciaByFolio(id: number, status: string): Promise<boolean> {
        let result = false;
        const uri = this._baseUrl + "api/Denuncias/Actualizar/"
            + id + "?status=" + status;

        const data = {Estatus: status};
        try {
            const response = await fetch(uri, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    result = data as boolean;
                });
            return result;
        } catch (error) {
            alert(error);
        }
        return result;
    }
    async getDenunciaByFolio(id: number): Promise<Complaint> {
        let complaint: Complaint = {} as Complaint;
        const uri = this._baseUrl + "api/Denuncias/"
            + id ;
        try {
            const response = fetch(uri)
                .then((response) => response.json())
                .then((data) => {
                    complaint = data as Complaint;
                    
                });
            return complaint;
        } catch (error) {
            alert(error);
        }
        return complaint;
    }
    async getDenuncias(): Promise<Complaint[]> {
        let listComplaints: Complaint[] = [];
        try {
            const response = await fetch(this._baseUrl + "api/Denuncias")
                .then((response) => response.json())
                .then((data) => {
                    listComplaints = data as Complaint[];
                });
        } catch (error) {
            alert(error);
        }
        return listComplaints;
    }
    async postDatosPersonales(datosPersonales: PersonalInfo): Promise<boolean> {
        let result = false;
        const uri = this._baseUrl + "api/DatosPersonales";
        try {
            const response = await fetch(uri, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosPersonales),
            })
                .then((response) => response.json())
                .then((data) => {
                    result = data as boolean;
                });
            return result;
        } catch (error) {
            alert(error);
        }
        return result;
    }
    
    async getDatosPersonal(idDenuncia: number): Promise<PersonalInfo> {
        const uri = this._baseUrl + "api/DatosPersonales/ObtenerDatos/" + idDenuncia;

        try {
            const response = await fetch(uri); // Espera a que se complete la petición
            if (response.ok) {
                const data = await response.json(); // Espera a que se convierta la respuesta a JSON
                console.log(data);
                return data as PersonalInfo;
            } else {
                console.error("Error en la solicitud:", response.statusText);
                return {} as PersonalInfo; // O manejo de error adecuado
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return {} as PersonalInfo; // O manejo de error adecuado
            //esta es una de las cosas que retorna la api
        }
    }

    async postHistorialDenuncia(historial: HistoryComplaint): Promise<boolean> {
        let result = false;
        const uri = this._baseUrl + "api/HistorialDenuncias";
        try {
            const response = await fetch(uri, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(historial),
            })
                .then((response) => response.json())
                .then((data) => {
                    result = data as boolean;
                });
            return result;
        } catch (error) {
            alert(error);
        }
        return result;
    }
    async getHistorialDenuncia(idDenuncia: number): Promise<HistoryComplaint[]> {
        let listHistorial: HistoryComplaint[] = [];
        const uri = this._baseUrl + "api/HistorialDenuncias/" +
                "ObtenerHistorial/" + idDenuncia;
        try {
            const response = await fetch(uri)
                .then((response) => response.json())
                .then((data) => {
                    listHistorial = data as HistoryComplaint[];
                });
        } catch (error) {
            alert(error);
        }
        return listHistorial;
    }
    async postUserDenunciante(datos: ComplainingUser): Promise<boolean> {
        let result = false;
        const uri = this._baseUrl + "api/UserDenunciantes";
        try {
            const response = await fetch(uri, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            })
                .then((response) => response.json())
                .then((data) => {
                    result = data as boolean;
                });
            return result;
        } catch (error) {
            alert(error);
        }
        return result;
    }

    async getCompanies(): Promise<Company[]>{
        let listCompanies: Company[] = []; 
        try {
            const response = await fetch(this._baseUrl + "api/Empresas")
                .then((response) => response.json())
                .then((data) => {
                    listCompanies = data as Company[];
                });
        } catch (error) {
            alert(error);
        }
        return listCompanies;
    }
    async getCountries(): Promise<Country[]> {
        let listCountries: Country[] = [];
        try {
            const response = await fetch(this._baseUrl + "api/Paises")
                .then((response) => response.json())
                .then((data) => {
                    listCountries = data as Country[];
                });
            
        } catch (error) {
            alert(error);
        }
        return listCountries;
    }
    async getStates(): Promise<State[]> {
        let listStates: State[] = [];
        try {
            const response = await fetch(this._baseUrl + "api/Estados")
                .then((response) => response.json())
                .then((data) => {
                    listStates = data as State[];
                });
            
        } catch (error) {
            alert(error);
        }
        return listStates;
    }

}