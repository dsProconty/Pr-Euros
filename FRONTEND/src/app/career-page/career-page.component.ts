import {
  Component,
  DEFAULT_CURRENCY_CODE,
  OnInit,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA, 
  NgModule,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { MatTabGroup } from '@angular/material/tabs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatDialog } from '@angular/material/dialog';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CurrencyPipe, formatCurrency } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { DialogExampleComponent2 } from '../dialog-example2/dialog-example.component';
declare var hbspt: any; // put this at the top

@Component({
  selector: 'app-career-page',
  templateUrl: './career-page.component.html',
  styleUrls: ['./career-page.component.css'],
})
export class CareerPageComponent implements OnInit {
  miFormulario: FormGroup;

  constructor(private fb: FormBuilder,
    private service: ClientService,
    private toastr: ToastrService,) {}

  ngOnInit() {
    this.miFormulario = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  enviarDatos() {
    if (this.miFormulario.valid) {
      // Aquí puedes manejar la lógica para enviar los datos
      console.log('Datos enviados:', this.miFormulario.value);

      this.service.insertData(this.miFormulario.value).subscribe((res) => {
        this.toastr.success('Ingresado Exitosamente', 'Cliente', {
          timeOut: 1500,
        });
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
