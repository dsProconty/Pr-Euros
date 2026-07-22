import {
  Component,
  DEFAULT_CURRENCY_CODE,
  OnInit,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA, 
  NgModule
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
  selector: 'app-simulators-pa',
  templateUrl: './simulators-pa.component.html',
  styleUrls: ['./simulators-pa.component.css'],
})
export class SimulatorsPAComponent implements OnInit {
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
  capital: number;
  tiempoMeses: number;
  returnRate: number;
  // retention: number;
  total: number;
  interes: number;
  bono: number;
  acumulado: number;
  interesAcu: number;
  interesBono: number;
  /**Variables Ahorros para guardar peticiones del API */

  tasaAhorro: number;
  tasaAhorroBono: number;
  tiempoMinAhorro: number;
  tiempoMaxAhorro: number;
  tasaAhorromasBono: number;

  /**Varibles para almacenar las consultas api de credito y ahorro */
  datosFlexSaving = null;

  nombreProducto: string;
  itemS: number;
  isTranslated = false;

  //cerratTabla variable para guardar el estado del boton de cerrar tabla
  cerrarTabla = { is_visible: false };
  botonSimulacion = { is_visible: false };
  botonSimulacion2 = { is_visible: true };

  //francesa y alemana variables para uardar el estado de las tablas de datos de simuladores
  francesa = { is_visible: true };
  alemana = { is_visible: false };

  //amortizacionIA y amortizacionF guarda el estado de las tablas de amortizacion
  amortizacionF = { is_visible: false };
  amortizacionIA = { is_visible: false };
  dataPA = [];

  cp: CurrencyPipe;

  constructor(
    private service: ClientService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.data = [];
    this.itemS = 0;
    this.term = this.tiempoMinAhorro;
    this.amount = 30;
    this.nombreProducto = 'Plan ProAhorro';
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
    this.service.getProPlan().subscribe(
      (datos) => {
        this.datosFlexSaving = datos;
        for (let x of this.datosFlexSaving) {
          this.tasaAhorro = x.rate;
          this.tasaAhorroBono = x.rate + 2;
          this.tasaAhorromasBono = x.rate + 2.5;
          this.tiempoMinAhorro = x.minimum_time;
          this.tiempoMaxAhorro = x.maximum_time;
        }
        // console.log('TasaFlex', this.tasaAhorroFlexSave);
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

  proAhoSave(): void {
    this.tiempoMeses = this.term * 0.0328767;
    // console.log("tiempo meses", this.tiempoMeses);
    if (this.isTranslated) {
      this.message = 'Limits out of range';
      this.message1 = 'Warning';
    } else {
      this.message = 'Límites fuera de rango ';
      this.message1 = 'Advertencia';
    }
    if (
      this.term < this.tiempoMinAhorro ||
      this.term > this.tiempoMaxAhorro ||
      this.amount > 1000000
    ) {
      this.term = this.tiempoMinAhorro;
      this.amount = 30;
      this.toastr.warning(this.message, this.message1, {
        timeOut: 4500,
      });
    } 

      if(this.term == 12){
        this.tasaAhorroBono = this.tasaAhorro + 5;
        this.tasaAhorromasBono = 6;
        
      }else if (this.term > 12){
        this.tasaAhorroBono = this.tasaAhorro + 6;
        this.tasaAhorromasBono = 7;
      }else{
        this.tasaAhorroBono = this.tasaAhorro + 2;
        this.tasaAhorromasBono = 3;
      }

      this.capital = this.amount * this.term;
      let amountAcu = this.amount;
      this.interes = 0;
      this.bono = 0;
      this.acumulado = 0,
      this.interesAcu = 0;
      this.interesBono = 0;

      let ahorro = 0;
      let acumulado = 0;

      this.dataPA = []

      for (let i = 0; i < this.term; i++) {
        //console.log(amountAcu);
       
        this.interesAcu = ((((amountAcu*30)*this.tasaAhorro)/100)/360); 
        this.interesBono = ((((amountAcu*30)*this.tasaAhorroBono)/100)/360); 
        this.interes = this.interes + this.interesAcu;
        this.bono = this.bono + this.interesBono;
        amountAcu =  amountAcu + this.amount + this.interesAcu;
        
        //agregar datos a la tabla
        //dataPA

        ahorro = ahorro + this.amount;
        acumulado = ahorro + this.interesAcu;

        this.dataPA.push({
          periodos: i + 1,
          ahorro: ahorro,
          interesbase: this.interesAcu,
          acumulado: acumulado,
          interesbono: this.interesBono
        });

        console.log(this.dataPA);
        //console.log(i+1, ahorro.toFixed(2), this.interesAcu.toFixed(2), acumulado.toFixed(2), this.interesBono.toFixed(2));
        ahorro = ahorro + this.interesAcu;

      }

      this.acumulado = this.capital + this.interes + this.bono;
      
    
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
      formId: 'c43fd44c-35fd-413f-a4dd-0503db980f3c',
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

  tickValues = [6, 12, 18, 24, 36, 48, 60];
  onInputChangeTiempoFlex(event: any) {
    // console.log(event.value);
    this.term = event.value;
  }

  vetTablaIA() {
    this.amortizacionF.is_visible = true;
    this.cerrarTabla.is_visible = true;
    this.botonSimulacion.is_visible = true;
    this.botonSimulacion2.is_visible = false;
  }
  
  cerrarTablas(): void {
    this.amortizacionF.is_visible = false;
    this.amortizacionIA.is_visible = false;
    this.botonSimulacion2.is_visible = true;
    this.botonSimulacion.is_visible = false;
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
      pageMargins: [40, 60, 40, 90] as any,
      footer: { image: await this.getBase64ImageFromURL('../../assets/images/footer_es.png'), width: 595 },
      header: {
        columns: [
          {
            image: await this.getBase64ImageFromURL(
              '../../assets/images/franja.png'
            ),
            width: 600,
            heigth: 1,
          },
        ],
      },
      content: [
        {
          columns: [
            { width: '*', text: '' },
            {
              image: await this.getBase64ImageFromURL('../../assets/images/logo.png'),
              width: 160,
              alignment: 'right',
            },
          ],
          margin: [0, 0, 0, 24],
        },
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
                    `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.amount || 0)}`,
                  ],
                  [
                    { text: 'Tasa Nominal Vigente', bold: true },
                    `${this.tasaAhorro || 0}%`,
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
      pageMargins: [40, 60, 40, 90] as any,
      footer: { image: await this.getBase64ImageFromURL('../../assets/images/footer_en.png'), width: 595 },
      header: {
        columns: [
          {
            image: await this.getBase64ImageFromURL(
              '../../assets/images/franja.png'
            ),
            width: 600,
            heigth: 1,
          },
        ],
      },
      content: [
        {
          columns: [
            { width: '*', text: '' },
            {
              image: await this.getBase64ImageFromURL('../../assets/images/logo.png'),
              width: 160,
              alignment: 'right',
            },
          ],
          margin: [0, 0, 0, 24],
        },
        {
          columns: [
            {
              table: {
                widths: [200, 120],
                body: [
                  [
                    {
                      text: 'ProAhorro Savings Plan',
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
                    { text: 'Nominal interest rate in force', bold: true },
                    `${this.tasaAhorro || 0}%`,
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
