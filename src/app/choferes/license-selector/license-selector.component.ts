import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LicenciaService } from 'src/app/licencia.service';

interface License {
  id: string;
  nombre: string;
  estado: boolean;
}


@Component({
  selector: 'app-license-selector',
  templateUrl: './license-selector.component.html',
  styleUrls: ['./license-selector.component.scss']
})
export class LicenseSelectorComponent implements OnInit {

    availableLicenses: License[] = [];

    constructor(
      private dialogRef: MatDialogRef<LicenseSelectorComponent>,
      @Inject(MAT_DIALOG_DATA) private data: any,
      private licenciaService: LicenciaService
    ) {}

    ngOnInit(): void {
        this.loadLicencias();
    }

    private loadLicencias(): void {
        this.licenciaService.getLicencias().subscribe(
          (licencias: License[]) => {
            this.availableLicenses = licencias;
          },
          (error) => {
            console.error("Hubo un error al cargar las licencias:", error);
          }
        );
    }

    selectLicense(license: License): void {
        this.dialogRef.close(license);
    }
}
