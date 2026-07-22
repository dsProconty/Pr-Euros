import {
  Component,
  DEFAULT_CURRENCY_CODE,
  OnInit,
  ViewChild,
} from '@angular/core';
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

class Product {
  name: string;
  tasaAnual: number;
  tasaPeriodica: number;
  numeroCuotas: number;
  cuotaPeriodica: number;
  totalInteres: number;
}

@Component({
  selector: 'app-simulators-af',
  templateUrl: './simulators-af.component.html',
  styleUrls: ['./simulators-af.component.css'],
})
export class SimulatorsAfComponent implements OnInit {
  // data y current_clien almacena los datos del formulario de contacto para posterior envio a BaseDeDatos
  data: Client[];
  current_clien: Client;

  //curd_oepration variable para guardar el estado del formulario
  crud_operation = { is_new: false, is_visible: false };

  //selectIndex guarda el estado del matSlider
  selectedIndex = 0;

  //*****************************************************
  /*Variables Simuladores Ahorro*/
  //Ahorro Flex
  amount: number;
  term: number;
  tiempoMeses: number;
  returnRate: number;
  // retention: number;
  total: number;
  /**Variables Ahorros para guardar peticiones del API */

  tasaAhorroFlexSave: number;
  tiempoMinAhorroFlexSave: number;
  tiempoMaxAhorroFlexSave: number;

  /**Varibles para almacenar las consultas api de credito y ahorro */
  datosFlexSaving = null;

  nombreProducto: string;
  itemS: number;
  isTranslated = false;

  // Tipo de cliente y tasa aplicada según rango
  clientType: string = 'PN';
  tasaAplicada: number = 0;
  flexSaveRates: any[] = [];

  cp: CurrencyPipe;

  constructor(
    private service: ClientService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.data = [];
    this.itemS = 0;
    this.term = this.tiempoMinAhorroFlexSave;
    this.amount = 1;
    this.nombreProducto = 'Ahorro FlexSave';
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
  }

  openDialog() {
    this.dialog.open(DialogExampleComponent);
  }

  openDialog2() {
    this.dialog.open(DialogExampleComponent2);
  }

  ngOnInit(): void {
    this.service.getFlexSaving().subscribe(
      (datos) => {
        this.datosFlexSaving = datos;
        for (let x of this.datosFlexSaving) {
          this.tasaAhorroFlexSave = x.rate;
          this.tiempoMinAhorroFlexSave = x.minimum_time;
          this.tiempoMaxAhorroFlexSave = x.maximum_time;
        }
      },
      (_error) => {
        this.refresh();
      }
    );

    this.service.getFlexSaveRates().subscribe(
      (rates) => {
        this.flexSaveRates = rates;
        this.actualizarTasaAplicada();
      },
      (_error) => { /* se mostrará tasa 0 si no carga */ }
    );
  }

  actualizarTasaAplicada(): void {
    const rangos = this.flexSaveRates.filter(r => r.client_type === this.clientType);
    const rango = rangos.find(r => {
      const superaMin = this.amount >= r.min_amount;
      const bajoMax = r.max_amount === null || this.amount < r.max_amount;
      return superaMin && bajoMax;
    });
    this.tasaAplicada = rango ? rango.rate : 0;
  }

  refresh(): void {
    window.location.reload();
  }
  useLanguage(language: string) {
    this.translate.use(language);
    if (language == 'es') {
      this.isTranslated = false;
    } else {
      this.isTranslated = true;
    }
    this.crud_operation.is_visible = false;

  }
  /************************************************************************ */
  //Funciones para capturar cambio de pestana

  @ViewChild('mattabgroup', { static: false }) mattabgroup: MatTabGroup;

  _selectedTabChange(index: number) {
    // console.log('_selectTabChange ' + index);
  }

  _selectedIndexChange(index: number) {
    // console.log('_selectedIndexChange ' + index);
  }

  _select(index: number) {
    // console.log('_select ' + index);
    this.selectedIndex = index;
  }

  /****************************************************************** */
  message = null;
  message1 = null;
  //Funciones Simuladores de Ahorro

  flexSave(): void {
    this.tiempoMeses = this.term * 0.0328767;
    if (this.isTranslated) {
      this.message = 'Limits out of range';
      this.message1 = 'Warning';
    } else {
      this.message = 'Límites fuera de rango ';
      this.message1 = 'Advertencia';
    }
    if (
      this.term < this.tiempoMinAhorroFlexSave ||
      this.term > this.tiempoMaxAhorroFlexSave
    ) {
      this.term = this.tiempoMinAhorroFlexSave;
      this.amount = 1;
      this.toastr.warning(this.message, this.message1, { timeOut: 4500 });
    } else {
      // Recalcular la tasa según el rango del monto y tipo de cliente
      this.actualizarTasaAplicada();
      // Fórmula: Capital * Tasa / 100 / 360 * Días
      this.returnRate = (this.amount * this.tasaAplicada) / 100 / 360 * this.term;
      this.total = this.amount + this.returnRate;
    }
  }

  /************************************** */
  //Funciones para Guardar el formulario de cliente mediante el api
  new() {
    this.current_clien = new Client();
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
    // hbspt.forms.create({
    //   portalId: '8821548',
    //   formId: 'b3e4925e-7ec3-45ef-b106-e085420d9091',
    //   target: '#hubspotForm',
    // });
    hbspt.forms.create({
      portalId: '6606991',
      formId: '70816719-56a7-467f-b589-ea231934f9c3',
      region: 'na1',
      target: '#hubspotForm',
    });
    window.scrollTo(0, 0);
  }

  save() {
    if (this.crud_operation.is_new) {
      this.toastr.success('Ingresado Exitosamente', 'Cliente', {
        timeOut: 1500,
      });
      this.crud_operation.is_visible = false;
      this.service.insert(this.current_clien).subscribe((res) => {
        this.current_clien = new Client();
      });
      return;
    }
  }
  /********************************** */

  //Funciones formato mat-slider
  formatoTiempo(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'd';
    }
    return value;
  }
  formatoMonto(value: number) {
    if (value >= 1000) {
      this.amount = value;
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onInputChangeMontoFlex(event: any) {
    // console.log(event.value);
    this.amount = event.value;
  }
  onInputChangeTiempoFlex(event: any) {
    // console.log(event.value);
    this.term = event.value;
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
  }

  img_footer = this.getBase64ImageFromURL('../../assets/images/franja.png');
  currencyPipeString: string;
  transformdValue: any;
  formatedOutputValue: any;

  async generatePDF(action = 'download') {
    let docDefinition = {
      pageMargins: [40, 20, 40, 90] as any,
      footer: { image: await this.getBase64ImageFromURL('../../assets/images/footer_es.png'), width: 595 },
      content: [
        {
          columns: [
            { width: '*', text: '' },
            {
              image: await this.getBase64ImageFromURL('../../assets/images/logo-procredit-new.png'),
              width: 160,
              alignment: 'right',
            },
          ],
          margin: [0, 0, 0, 16],
        },
        { text: 'Tu ahorro crece contigo', bold: true, fontSize: 16, color: '#DA2128', margin: [0, 0, 0, 10] },
        { text: 'La Cuenta FlexSave está diseñada para premiar tu disciplina y visión financiera. Con FlexSave, mientras más ahorras, mejor rentabilizas tu dinero.', fontSize: 11, color: '#1a1a1a', margin: [0, 0, 0, 8] },
        { text: 'Esta simulación te muestra cómo tu esfuerzo se transforma en crecimiento real: cada aporte suma, cada meta cuenta y cada dólar trabaja para ti.', fontSize: 11, color: '#1a1a1a', margin: [0, 0, 0, 20] },
        {
          columns: [
            {
              table: {
                widths: [180, 130],
                body: [
                  [
                    {
                      text: 'Ahorro FlexSave',
                      alignment: 'center',
                      fillColor: '#DA2128',
                      color: 'white',
                      bold: true,
                      fontSize: 13,
                      colSpan: 2,
                    },
                    {},
                  ],
                  [
                    {
                      text: 'Detalles Simulación',
                      alignment: 'center',
                      fillColor: '#DA2128',
                      color: 'white',
                      bold: true,
                      colSpan: 2,
                    },
                    {},
                  ],
                  [
                    { text: 'Monto de Ahorro', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.amount || 0)}`,
                  ],
                  [
                    { text: 'Tipo de Cliente', bold: true },
                    `${this.clientType === 'PN' ? 'Persona Natural (PN)' : 'Persona Jurídica (PJ)'}`,
                  ],
                  [
                    { text: 'Tasa Nominal Vigente', bold: true },
                    `${this.tasaAplicada || 0}%`,
                  ],
                  [
                    { text: 'Plazo (Días)', bold: true },
                    `${this.term || 0}`,
                  ],
                  [
                    { text: 'Interés Ganado Referencial', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.returnRate || 0)}`,
                  ],
                  [
                    { text: 'Total a Recibir', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.total || 0)}`,
                  ],
                  [
                    {
                      text: `Fecha: ${new Date().toLocaleString()}`,
                      alignment: 'center',
                      colSpan: 2,
                      fontSize: 10,
                      color: '#555',
                    },
                    {},
                  ],
                ],
              },
              width: 330,
            },
            {
              stack: [
                { text: 'Visita Nuestra Página Web', alignment: 'center', margin: [0, 0, 0, 8] },
                { qr: 'https://www.bancoprocredit.com.ec/', fit: 110, alignment: 'center' },
              ],
              width: '*',
              alignment: 'center',
              margin: [16, 0, 0, 0],
            },
          ],
        },
        { text: 'Porque cuando tu dinero crece contigo, eres libre de llegar más lejos.', italics: true, alignment: 'center', fontSize: 11, margin: [0, 24, 0, 0] },
      ],
      styles: {
        table: {
          bold: true,
          fontSize: 10,
          alignment: 'center',
          decorationColor: 'red',
        },
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'red',
          background: 'black',
        },
      },
    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).download();
    }
  }
  async generatePDF_English(action = 'download') {
    let docDefinition = {
      pageMargins: [40, 20, 40, 90] as any,
      footer: { image: await this.getBase64ImageFromURL('../../assets/images/footer_en.png'), width: 595 },
      content: [
        {
          columns: [
            { width: '*', text: '' },
            {
              image: await this.getBase64ImageFromURL('../../assets/images/logo-procredit-new.png'),
              width: 160,
              alignment: 'right',
            },
          ],
          margin: [0, 0, 0, 16],
        },
        { text: 'Your savings grow with you', bold: true, fontSize: 16, color: '#DA2128', margin: [0, 0, 0, 10] },
        { text: 'The FlexSave Account is designed to reward your financial discipline and vision. With FlexSave, the more you save, the better your returns.', fontSize: 11, color: '#1a1a1a', margin: [0, 0, 0, 8] },
        { text: 'This simulation shows how your effort transforms into real growth: every contribution adds up, every goal counts, and every dollar works for you.', fontSize: 11, color: '#1a1a1a', margin: [0, 0, 0, 20] },
        {
          columns: [
            {
              table: {
                widths: [200, 120],
                body: [
                  [
                    {
                      text: 'FlexSave Savings Account',
                      alignment: 'center',
                      fillColor: '#DA2128',
                      color: 'white',
                      bold: true,
                      fontSize: 13,
                      colSpan: 2,
                    },
                    {},
                  ],
                  [
                    {
                      text: 'Simulation details',
                      alignment: 'center',
                      fillColor: '#DA2128',
                      color: 'white',
                      bold: true,
                      colSpan: 2,
                    },
                    {},
                  ],
                  [
                    { text: 'Savings amount', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.amount || 0)}`,
                  ],
                  [
                    { text: 'Customer type', bold: true },
                    `${this.clientType === 'PN' ? 'Natural Person (PN)' : 'Legal Entity (PJ)'}`,
                  ],
                  [
                    { text: 'Nominal interest rate in force', bold: true },
                    `${this.tasaAplicada || 0}%`,
                  ],
                  [
                    { text: 'Term (days)', bold: true },
                    `${this.term || 0}`,
                  ],
                  [
                    { text: 'Referential earned interest', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.returnRate || 0)}`,
                  ],
                  [
                    { text: 'Total to receive', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.total || 0)}`,
                  ],
                  [
                    {
                      text: `Date: ${new Date().toLocaleString()}`,
                      alignment: 'center',
                      colSpan: 2,
                      fontSize: 10,
                      color: '#555',
                    },
                    {},
                  ],
                ],
              },
              width: 340,
            },
            {
              stack: [
                { text: 'Visit our website', alignment: 'center', margin: [0, 0, 0, 8] },
                { qr: 'https://www.bancoprocredit.com.ec/', fit: 110, alignment: 'center' },
              ],
              width: '*',
              alignment: 'center',
              margin: [16, 0, 0, 0],
            },
          ],
        },
        { text: 'Because when your money grows with you, you are free to go further.', italics: true, alignment: 'center', fontSize: 11, margin: [0, 24, 0, 0] },
      ],
      styles: {
        table: {
          bold: true,
          fontSize: 10,
          alignment: 'center',
          decorationColor: 'red',
        },
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'red',
          background: 'black',
        },
      },
    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).download();
    }
  }
}
