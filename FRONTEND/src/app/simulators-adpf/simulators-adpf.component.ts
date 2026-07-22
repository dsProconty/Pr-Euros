import {
  Component,
  DEFAULT_CURRENCY_CODE,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../client.service';
import { MatTabGroup } from '@angular/material/tabs';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatDialog } from '@angular/material/dialog';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { CurrencyPipe, formatCurrency } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
declare var hbspt: any; // put this at the top

@Component({
  selector: 'app-simulators-adpf',
  templateUrl: './simulators-adpf.component.html',
  styleUrls: ['./simulators-adpf.component.css'],
})
export class SimulatorsAdpfComponent implements OnInit {
  crud_operation = { is_new: false, is_visible: false };
  crud_operation2 = { is_new: false, is_visible: false };

  selectedIndex = 0;
  //Ahorro DPF
  amountDpf: number;
  termDpf: number;
  returnRateDpf: number;
  retentionDpf: number;
  totalDpf: number;
  tiempoDiasDpf: number;
  //****************************************************** */

  /**Variables Ahorros para guardar peticiones del API */

  tasaAhorroFlexSave: number;
  tasaAhorroDpf: number;
  tasaAhorroDpfOrigin: number;
  tiempoMinAhorroDpf: number;
  tiempoMaxAhorroDpf: number;
  datosDpfSaving = null;
  nombreProducto: string;
  itemS: number;
  cp: CurrencyPipe;

  /**Variables para transformar imagen */
  img_footer = this.getBase64ImageFromURL('../../assets/images/franja.png');
  currencyPipeString: string;
  transformdValue: any;
  formatedOutputValue: any;

  isTranslated = false;

  constructor(
    private service: ClientService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.itemS = 0;
    this.nombreProducto = 'Ahorro DPF';
    // this.termDpf = 6;
    this.amountDpf = 5000;
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
  }

  openDialog() {
    this.dialog.open(DialogExampleComponent);
  }

  ngOnInit(): void {
    this.service.getDpfSaving().subscribe(
      (datos) => {
        this.datosDpfSaving = datos;
        for (let x of this.datosDpfSaving) {
          this.tasaAhorroDpf = x.rate;
          this.tasaAhorroDpfOrigin = x.rate;
          this.tiempoMinAhorroDpf = x.minimum_time;
          this.tiempoMaxAhorroDpf = x.maximum_time;
        }
        // console.log('Tiempo maximo de ahorro', this.tiempoMaxAhorroDpf);
        // console.log('tasadpf', this.tasaAhorroDpf);
      },
      (error) => {
        // console.log('ERROR DE CONEXION', error);
        this.refresh();
      }
    );
  }

  refresh(): void {
    window.location.reload();
  }
  useLanguage(language: string) {
    this.translate.use(language);
    // this.isTranslated=!this.isTranslated;
    if (language == 'es') {
      this.isTranslated = false;
    } else {
      this.isTranslated = true;
    }
    this.crud_operation.is_visible = false;
    this.crud_operation2.is_visible = false;
  }

  /************************************************************************ */
  //Funciones para capturar cambio de pestana

  @ViewChild('mattabgroup', { static: false }) mattabgroup: MatTabGroup;

  _selectedTabChange(index: number) {
    // console.log('_selectTabChange ' + index);
    // this.limpiarDatos();

    if (index == 0) {
      this.itemS = 1;
      // this.termDpf = this.tiempoMinAhorroDpf;
      this.nombreProducto = 'Ahorro DPF';
      this.dpfSave();
    }
  }

  _selectedIndexChange(index: number) {
    // console.log('_selectedIndexChange ' + index);
  }

  _select(index: number) {
    // console.log('_select ' + index);
    this.selectedIndex = index;
  }

  /************************************************************************** */
  //Funciones Simuladores de Ahorro
  message = null;
  message1 = null;
  dpfSave(): void {
    if (this.isTranslated) {
      this.message = 'Limits out of range';
      this.message1 = 'Warning';
    } else {
      this.message = 'Límites fuera de rango ';
      this.message1 = 'Advertencia';
    }
    if (this.tasaAhorroDpf == null) {
      this.ngOnInit();
    } else {
      // console.log('tiempo min dpf', this.tiempoMinAhorroDpf);
      if (
        this.amountDpf < 5000 ||
        this.termDpf > this.tiempoMaxAhorroDpf ||
        this.amountDpf > 1000000 ||
        this.termDpf < this.tiempoMinAhorroDpf
      ) {
        this.termDpf = this.tiempoMinAhorroDpf;
        this.amountDpf = 5000;
        this.toastr.warning(this.message, this.message1, {
          timeOut: 4500,
        });
      } else {
        this.tiempoDiasDpf = 0;
        this.tiempoDiasDpf = this.termDpf * 30 + 1;
        // console.log('Tiempo en dias', this.tiempoDiasDpf);
        this.returnRateDpf =
          (this.amountDpf * this.tiempoDiasDpf * this.tasaAhorroDpf) /
          360 /
          100;

        if (this.termDpf > 5) {
          this.totalDpf = this.amountDpf + this.returnRateDpf;
          this.retentionDpf = 0;
        } else {
          this.retentionDpf = this.returnRateDpf * 0.02;
          this.totalDpf =
            this.amountDpf + this.returnRateDpf - this.retentionDpf;
        }
      }
    }
  }
  /******************************************************************************** */

  //Funciones para Guardar el formulario de cliente mediante el api
  /************************************** */
  //Funciones para Guardar el formulario de cliente mediante el api
  new() {
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
  new2() {
    this.crud_operation2.is_visible = true;

  }
  /************************************************ */
  //Funciones formato mat-slider
  formatoTiempo(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'd';
    }
    return value;
  }

  formatoMonto(value: number) {
    if (value >= 1000) {
      this.amountDpf = value;
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onInputChangeMontoDpf(event: any) {
    // console.log(event.value);
    this.amountDpf = event.value;
  }

  onInputChangeTiempoDpf(event: any) {
    //console.log(event.value);

   /* if(event.value < 13){
      this.tasaAhorroDpf =  this.tasaAhorroDpfOrigin;
    }else{
      this.tasaAhorroDpf =  this.tasaAhorroDpfOrigin -  0.5;
    }*/

    this.termDpf = event.value;
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
        // { text: 'Haz crecer tu dinero con certeza', bold: true, fontSize: 16, color: '#DA2128', margin: [0, 0, 0, 10] },
        // { text: 'El Depósito a Plazo Fijo de ProCredit te ofrece una rentabilidad garantizada con una tasa nominal fija durante todo el plazo que elijas.', fontSize: 11, color: '#1a1a1a', margin: [0, 0, 0, 8] },
        // { text: 'Esta simulación te muestra cuánto recibirás al vencimiento de tu depósito, con el detalle de los intereses ganados y la retención aplicable.', fontSize: 11, color: '#1a1a1a', margin: [0, 0, 0, 20] },
        {
          columns: [
            {
              table: {
                widths: [180, 130],
                body: [
                  [
                    {
                      text: this.nombreProducto,
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
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.amountDpf || 0)}`,
                  ],
                  [
                    { text: 'Tasa Nominal Vigente', bold: true },
                    `${this.tasaAhorroDpf || 0}%`,
                  ],
                  [
                    { text: 'Plazo (Meses)', bold: true },
                    `${this.termDpf || 0}`,
                  ],
                  [
                    { text: 'Interés Ganado Referencial', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.returnRateDpf || 0)}`,
                  ],
                  [
                    { text: 'Retención IR', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.retentionDpf || 0)}`,
                  ],
                  [
                    { text: 'Total a Recibir', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.totalDpf || 0)}`,
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
        // { text: 'Porque un futuro seguro se construye hoy, con cada decisión financiera inteligente.', italics: true, alignment: 'center', fontSize: 11, margin: [0, 24, 0, 0] },
      ],
      styles: {
        table: { bold: true, fontSize: 10, alignment: 'center', decorationColor: 'red' },
        sectionHeader: { bold: true, decoration: 'underline', fontSize: 14, margin: [0, 15, 0, 15] },
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
        tableExample: { margin: [0, 5, 0, 15] },
        tableOpacityExample: { margin: [0, 5, 0, 15], fillColor: 'blue', fillOpacity: 0.3 },
        tableHeader: { bold: true, fontSize: 13, color: 'red', background: 'black' },
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
        // { text: 'Grow your money with certainty', bold: true, fontSize: 16, color: '#DA2128', margin: [0, 0, 0, 10] },
        // { text: "ProCredit's Fixed Term Deposit offers guaranteed returns with a fixed nominal rate for the entire term you choose.", fontSize: 11, color: '#1a1a1a', margin: [0, 0, 0, 8] },
        // { text: 'This simulation shows you how much you will receive at maturity, including earned interest and applicable retention.', fontSize: 11, color: '#1a1a1a', margin: [0, 0, 0, 20] },
        {
          columns: [
            {
              table: {
                widths: [200, 120],
                body: [
                  [
                    {
                      text: 'Fixed Term Deposit',
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
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.amountDpf || 0)}`,
                  ],
                  [
                    { text: 'Nominal interest rate in force', bold: true },
                    `${this.tasaAhorroDpf || 0}%`,
                  ],
                  [
                    { text: 'Term (months)', bold: true },
                    `${this.termDpf || 0}`,
                  ],
                  [
                    { text: 'Referential earned interest', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.returnRateDpf || 0)}`,
                  ],
                  [
                    { text: 'Retention', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.retentionDpf || 0)}`,
                  ],
                  [
                    { text: 'Total to receive', bold: true },
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.totalDpf || 0)}`,
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
        // { text: 'Because a secure future is built today, with every smart financial decision.', italics: true, alignment: 'center', fontSize: 11, margin: [0, 24, 0, 0] },
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
