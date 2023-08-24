import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LicenseSelectorComponent } from '../license-selector/license-selector.component';
import { LicenciaService } from 'src/app/licencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Agregamos las dependencias de los formularios reactivos

interface License {
  id: string;
  nombre: string;
  estado: boolean;
}

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss']
})
export class ChoferesComponent implements OnInit {
    form: FormGroup; // Declaramos la variable del formulario
    licensesArray: License[] = [];
    availableLicenses: License[] = [];

    constructor(
        public dialog: MatDialog, 
        private licenciaService: LicenciaService, 
        private fb: FormBuilder  // Injectamos el FormBuilder
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            fechaNacimiento: ['', Validators.required]
        });
    }

    removeLicense(license: License): void {
        const index = this.licensesArray.findIndex(l => l.nombre === license.nombre && l.id === license.id);
        if (index > -1) {
            this.licensesArray.splice(index, 1);
        }
    }

    selectLicense(license: License): void {
        const isLicenseAdded = this.licensesArray.some(l => l.nombre === license.nombre);

        if (!isLicenseAdded) {
            this.licensesArray = [...this.licensesArray, license];
        } else {
            alert('Esta licencia ya fue añadida.');
        }
    }

    openLicensesPopup(): void {
        this.licenciaService.getLicencias().subscribe(
            (licencias: License[]) => {
                this.availableLicenses = licencias;
                const dialogRef = this.dialog.open(LicenseSelectorComponent, {
                    width: '400px',
                    data: { availableLicenses: this.availableLicenses }
                });
                dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                        this.selectLicense(result);
                    }
                });
            },
            (error) => {
                console.error("Hubo un error al cargar las licencias:", error);
            }
        );
    }

    saveChoferData(): void {
        if (this.form.valid && this.licensesArray.length > 0) {
            // Aquí la lógica para guardar los datos del chofer en tu servidor
            alert("Datos del chofer guardados (lógica pendiente).");
        } else {
            alert("Por favor, complete todos los campos y asegúrese de seleccionar al menos una licencia.");
        }
    }
}
