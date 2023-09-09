import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/ApiService.service';
import { Company } from '../Models/Company.model';
import { Country } from '../Models/Country.model';
import { State } from '../Models/State.model';
import { Catalog } from '../Models/Catalog.model';
import { PersonalInfo } from '../Models/PersonalInfo.model';
import { EventServicePersonalInfo } from '../Services/EventServicePersonalInfo.service';
import { EventServiceCatalog } from '../Services/EventServiceCatalog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-complaint',
  templateUrl: './new-complaint.component.html',
  styleUrls: ['./new-complaint.component.css']
})
export class NewComplaintComponent implements OnInit {
  private _ePersonalInfo: EventServicePersonalInfo;
  private _eCatalog: EventServiceCatalog;

  companies: Company[];
  countries: Country[];
  states: State[];
  numCentro: number;
  selectedCompany: string;
  selectedCountry: string;
  selectedState: string;
  errorMessages: string;
  resultCatalog: boolean;
  private _apiService: ApiService;
  constructor(
    private ePersonalInfo: EventServicePersonalInfo, 
    private eCatalog: EventServiceCatalog,
    private routes: Router) {
    this._ePersonalInfo = ePersonalInfo;
    this._eCatalog = eCatalog;
    this._apiService = new ApiService();
  }
  async ngOnInit(){
    await this.loadCompanies();
    await this.loadCountries();
    await this.loadStates();
    
  }
  async loadCompanies(): Promise<void>{
    this.companies = await this._apiService.getCompanies();
    if (this.companies && this.companies.length > 0) {
      this.selectedCompany = this.companies[0].empresas;
    }
  }
  async loadCountries(): Promise<void>{
    this.countries = await this._apiService.getCountries();
    if (this.countries && this.countries.length > 0) {
      this.selectedCountry = this.countries[0].paises;
    }
  }
  async loadStates(): Promise<void>{
    this.states = await this._apiService.getStates();
    if (this.states && this.states.length > 0) {
      this.selectedState = this.states[0].estados;
    }
  }
  selectCompany(event: any): void{
    this.selectedCompany = event.target.value;
  }
  selectCountry(event: any): void{
    this.selectedCountry = event.target.value;
  }
  selectState(event: any): void{
    this.selectedState = event.target.value;
  }
  async executeCaptureComplaint(): Promise<void>{
    
    if (this.validOperation() == false) return;
    const random = Math.floor(Math.random() * 9999999);
    const randomCode: number = random;
    const objCatalog: Catalog = {
      idDenuncia: randomCode,
      empresa: this.selectedCompany,
      pais: this.selectedCountry,
      estado: this.selectedState,
      numCentro: this.numCentro.toString()
    };
    const result = await this._apiService.postCatalogo(objCatalog);
    if (result == false) return;
    this.resultCatalog = result;
    this.errorMessages = "Se ha creado el catalogo con ID: " + randomCode;
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.resultCatalog = false;
    const objPersonalInfo: PersonalInfo = {
      idDenuncia: randomCode,
      nombre: "",
      correo: "",
      telefono: ""
    };
    const resultPersonalInfo = await this._apiService.postDatosPersonales(objPersonalInfo);
    if (resultPersonalInfo == false) return;
    const consult = await this._apiService.getDatosPersonal(randomCode);
    const objPersonalInfo2: PersonalInfo = {
      idDenuncia: consult.idDenuncia,
      nombre: consult.nombre,
      correo: consult.correo,
      telefono: consult.telefono,
      idDenunciante: consult.idDenunciante
    };
    this._ePersonalInfo.publishPersonalInfo(objPersonalInfo2);
    this._eCatalog.publishCatalog(objCatalog);
    this.resultCatalog = resultPersonalInfo;
    this.errorMessages = "Usted sera dirigido a otra ventana ";
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.resultCatalog = false;
    this.routes.navigate(['complaints']);
  }

  validOperation(){
    if (this.numCentro == null 
      ){
      alert("Selecciona todos los campos");
      return false;
    }
    else{
      return true;
    }
  }
}
