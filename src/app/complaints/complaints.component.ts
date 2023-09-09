import { Component, NgZone, OnInit } from '@angular/core';
import { EventServicePersonalInfo } from '../Services/EventServicePersonalInfo.service';
import { EventServiceCatalog } from '../Services/EventServiceCatalog.service';
import { Subscription } from 'rxjs';
import { Catalog } from '../Models/Catalog.model';
import { PersonalInfo } from '../Models/PersonalInfo.model';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  _ePersonalInfo: EventServicePersonalInfo;
  _eCatalog: EventServiceCatalog;

  txtName: string;
  txtCorreo: string;
  txtTelefono: string;
  txtIdDenuncia: string;
  txtIdDenunciante: string;
  txtEmpresa: string | null;
  txtPais: string | null;
  txtEstado: string | null;
  txtNumeroCentro: string | null;
  private subCatalog: Subscription;
  private subPersonalInfo: Subscription;

  constructor(
    private ePersonalInfo: EventServicePersonalInfo,
    private eCatalog: EventServiceCatalog,
    private ngZone: NgZone) {
    this._ePersonalInfo = this.ePersonalInfo;
    this._eCatalog = this.eCatalog;

  }
  ngOnInit(): void {
    this.eCatalog.catalog$.subscribe((catalog: Catalog) => {
      this.ngZone.run(() => {
        this.txtEmpresa = catalog.empresa;
      this.txtPais = catalog.pais;
      this.txtEstado = catalog.estado;
      this.txtNumeroCentro = catalog.numCentro;
      console.log(catalog);
      });
    });
    this.ePersonalInfo.personalInfo$.subscribe(
      (personalInfo: PersonalInfo) => {
        this.ngZone.run(() => {
          this.txtName = personalInfo.nombre;
          this.txtCorreo = personalInfo.correo;
          this.txtTelefono = personalInfo.telefono;
          console.log(personalInfo);
        });
    });
  }


}
