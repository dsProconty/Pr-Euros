import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ClientService } from './client.service';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { SimulatorsEComponent } from './simulators-e/simulators-e.component';
import { SimulatorsAfComponent } from './simulators-af/simulators-af.component';
import { SimulatorsAdpfComponent } from './simulators-adpf/simulators-adpf.component';
import { SimulatorsIpComponent } from './simulators-ip/simulators-ip.component';
import { SimulatorsVComponent } from './simulators-v/simulators-v.component';
import { NgxCurrencyModule } from "ngx-currency";
import  {MatCurrencyFormatModule} from 'mat-currency-format';
import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogExampleComponent2 } from './dialog-example2/dialog-example.component';

import { TaxModule } from './tax/tax.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SimulatorsPAComponent } from './simulators-pa/simulators-pa.component';
import { CareerPageComponent } from './career-page/career-page.component';
import { SimulatorsEuroComponent } from './simulators-euro/simulators-euro.component';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { LoginComponent } from './login/login.component';
import { Observable, of } from 'rxjs';

registerLocaleData(localeEs,'es');


@NgModule({
  declarations: [
    AppComponent,
    DialogExampleComponent,
    DialogExampleComponent2,
    SimulatorsEComponent,
    SimulatorsAfComponent,
    SimulatorsAdpfComponent,
    SimulatorsIpComponent,
    SimulatorsVComponent,
    SimulatorsPAComponent,
    CareerPageComponent,
    SimulatorsEuroComponent,
    ExchangeRatesComponent,
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:1000,
      progressBar:true,
      preventDuplicates: true,
    }),
    MatSliderModule,
    MatFormFieldModule,
    MatTabsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatInputModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    NgxCurrencyModule,
    MatCurrencyFormatModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:mockTranslateLoader,
        deps:[HttpClient]
      }
    }),
    NgbModule,
    TaxModule
  ],
  providers: [ClientService,{provide:LOCALE_ID, useValue:'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/images/', '.json');
}

export function mockTranslateLoader(): TranslateLoader {
  return {
    getTranslation: (lang: string) => of(mockTranslations[lang] || {})
  } as TranslateLoader;
}

export const mockTranslations: { [key: string]: any } = {
  es: {
    "euro":{
      "title":"Cotizador EUR / USD",
      "conversion":"Conversión",
      "invertir":"Invertir EUR y USD",
      "monto_ingresado":"Ingresa el valor",
      "tasa":"Tasa",
      "aplicar_isd":"Aplicar ISD",
      "monto_calculado":"Monto calculado",
      "comision":"Comisión",
      "monto_transferir":"Total a transferir",
      "conversion_label":"Conversión",
      "solicitar":"Solicitar",
      "descargar":"¡Descargue el formulario aquí!",
      "disclaimer":"La solicitud del formulario se recibe hasta las 14:00.",
      "notas_title":"¿Cómo realizar la transferencia?",
      "nota_1":"Descargar y completar el formulario correspondiente.",
      "nota_2":"Enviar el formulario firmado en formato PDF al correo: asesoria@bancoprocredit.com.ec, de lunes a viernes hasta las 14h00.",
      "isd_tooltip":"El ISD corresponde al 5% del valor de la transferencia. Este cálculo considera la excepción vigente de hasta 3 Salarios Básicos Unificados (SBU), aplicable dentro de un período de 15 días calendario. El valor mostrado es referencial y puede variar al momento de la transacción.",
      "nota_comision":"La comisión puede variar según el tipo de cuenta y se encuentra sujeta al tarifario vigente.",
      "nota_valores":"Los valores mostrados son referenciales. La cotización, comisiones e impuestos aplicables pueden variar al momento de realizar la transacción.",
      "info_title":"Información importante",
      "info_tasa":"La tasa mostrada en el simulador se actualiza diariamente y puede variar. Su vigencia aplica únicamente de lunes a viernes, en el horario de 09h00 a 14h00. Fuera de este rango, la tasa publicada no será válida para operaciones.",
      "info_contacto_title":"Contacto para más información",
      "info_telefono":"Teléfono: +593 2 211 0000 ext. 56108",
      "info_correo":"Correo: sh.divisas@bancoprocredit.com.ec"
    },
    "vivienda":{
      "title":"Simulador Crédito de Vivienda",
      "matLabelTranslated": "Crédito de Vivienda",
      "vivienda_eco":"Vivienda Ecológica",
      "sujeta_cambios":" Sujeta a cambios y en caso de crédito ECO la tasa es con constructoras previamente pre-seleccionadas",
      "sujeta_cambios2":"*Sujeto a analisis ambiental",
      "sujeta_cambios3":"*Tasa sujeta a descuentos en caso de viviendas ecológicas."
  
    },
    "personal":{
      "title":"Simulador Crédito Inversión Personal",
      "matLabelTranslated": "Crédito Inversión Personal"
    },
    "educativo":{
      "title":"Simulador Crédito Educativo",
      "matLabelTranslated": "Crédito Educativo"
    },
    "flexsave":{
      "title":"Simulador Cuenta de Ahorro FlexSave",
      "matLabelTranslated": "Cuenta de Ahorro FlexSave"
    },
    "dpf":{
      "title":"Simulador Depósito a Plazo Fijo",
      "matLabelTranslated": "Depósito a Plazo Fijo",
      "titulo":"Simulaodor Ahorro DPF Banco Procredit"
    },
    "proAhorro":{
      "title":"Simulador ProAhorro",
      "matLabelTranslated": "Plan ProAhorro"
    },
    "general":{
      "monto":"Monto",
      "plazo_meses":"Plazo (Meses)",
      "plazo_dias":"Plazo (Días)",
      "plazo":"Plazo",
      "tabla_amortizacion":"Tabla de amortización",
      "tasa_interes_efectiva":"Tasa de interés efectiva:",
      "tasa_interes":"Tasa de interés",
      "tasa_interes_pro_plan":"Tasa ProAhorro más Base",
      "anual":"anual",
      "tiempo_minimo":"Tiempo mínimo",
      "monto_minimo":"Monto mínimo",
      "monto_maximo":"monto máximo",
      "meses":"meses",
      "maximo":"máximo",
      "cerrar_tabla":"Cerrar Tabla",
      "detalle_s_alemana":"Detalle de la simulación Alemana:",
      "tasa_periodica":"Tasa periódica",
      "seguro_desgravamen":"Seguro desgravamen",
      "total_seguro":"Total seguro",
      "liquido_recibir":"Liquido a Recibir",
      "cuota_inicial":"Cuota inicial",
      "total_interes_a_pagar":"Total interés a pagar",
      "detalle_simulacion_francesa":"Detalle de la simulación Francesa",
      "cuota_a_pagar":"Cuota a pagar",
      "todos_los_creditos":"Todos los créditos del sistema financiero serán descontados el 0.5% de contribución a SOLCA por Normativa de la Superintendencia de Bancos. Los valores son referenciales y están sujetos a dias calendario.",
      "sujeto_a_dias_calendario":"*Los valores son referenciales y están sujetos a dias calendario.",
      "descargar":"Descargar",
      "tabla_amortizacion_francesa":"Tabla de Amortización Francesa",
      "cuota":"Cuota",
      "interes_periodo":"Interés del Periodo",
      "capital_amortizado":"Capital Amortizado",
      "seguro":"Seguro",
      "saldo_remanente":"Saldo Remanente",
      "tabla_amortizacion_alemana":"Tabla de Amortización Alemana",
      "lo_quiero":"Lo quiero",
      "simulacion_detallada":"Simulación detallada",
      "cancelar":"Cancelar",
      "francesa":"Francesa",
      "alemana":"Alemana",
      "dias":"Dias",
      "detalle_de_la_simulacion":"Detalle de la simulación",
      "plazo_dias_t":"Plazo Días",
      "plazo_meses_t":"Plazo Meses",
      "interes_ganado_referencial":"Interés Ganado Referencial",
      "total_recibir":"Total Recibir",
      "abre_tu_cuenta":"Abre tu cuenta",
      "dia":"día",
      "retencionIR":"Retención IR",
      "espanol":"Español",
      "ingles":"Inglés",
      "regresar":"Regresar",
      "lista_tasas":"Lista de Tasas",
      "crear":"Crear",
      "tasa":"Tasa",
      "descripcion":"Descripción",
      "fecha":"Fecha",
      "accion":"Acción",
  
      "monto_minimo_pro_ahorro": "El monto mínimo de ahorro mensual es de 30 USD",
      "cuenta_pro_ahorro": "Debe tener una cuenta conectada (Diaria o tradicional) desde donde se realizan los débitos al plan",
      "interes_pro_ahorro": "El interés normal se calcula de forma diaria y se capitaliza (acredita) cada mes",
      "detalle_de_la_simulacion_pro_ahorro":"Detalle de tu Plan ProAhorro",
      "tasa_interes_normal":"Tasa de interés normal",
      "tasa_bono": "Tasa Bono",
      "capital": "Capital",
      "interes": "Interés",
      "bono": "Bono",
      "acumulado": "Acumulado",
      "interes_bono": "*El interés bono se calcula de forma diaria y se capitaliza (acredita) al final del plan",
      "depositos_adi": "*Se pueden recibir depósitos adicionales y sobre estos se paga tanto la tasa normal como la tasa bono",
      "plan_permite": "*El plan permite hasta 3 meses de no recibir una acreditación y mantenga el beneficio de la tasa bono",
      "pasado_3": "*Pasado el 3 meses, si no se recibió el depósito el interés bono se pierde",
      "precancelacion": "*En caso de precancelación anticipada se perderá el interés bono",
      "tablaplanproahorro": "Plan ProAhorro",
      "periodos": "Períodos",
      "ahorro": "Ahorro",
      "interesbase": "Interes Base",
      "interesbono": "Interes Bono",
  
      "cedula": "* Cédula",
      "votacion": "* Papeleta de votación",
      "servicio": "* Una planilla de servicio básico (agua, luz o teléfono)",
      "depositoFlex": "* Depósito inicial de $100 USD",
      "depositoFijo": "* Monto mínimo de $1.000 USD",
      "creditoAPI": "* Crédito para asalariados o profesionales independientes",
      "sercliente": "* Ser cliente de Banco ProCredit",
      "cuenta": "* Abrir cuenta en Banco ProCredit",
      "movimientocuenta3": "* Mínimo 3 meses de movimiento de cuenta",
      "nocreditovencast": "* No tener créditos vencidos o castigados",
      "monto1000": "* Monto mínimo $1.000",
      "monto5000": "* Monto mínimo $5.000",
      "capacidadpago": "* Tener la capacidad de pago bajo análisis de Banco ProCredit",
      "movimientocuenta6": "* Mínimo 6 meses de movimiento de cuenta",
      "monto30000": "* Monto mínimo $30.000",
      "requisitos": "Requisitos",
      "referencial": "* Los valores mostrados son referenciales.",
      "montoPA":"Monto a ahorrar",
      "tipo_cliente": "Tipo de cliente",
      "persona_natural": "Persona Natural",
      "persona_juridica": "Persona Jurídica"
    }
  },
  en: {
    "euro":{
      "title":"EUR / USD Currency Exchange",
      "conversion":"Conversion",
      "invertir":"Swap EUR and USD",
      "monto_ingresado":"Enter amount",
      "tasa":"Rate",
      "aplicar_isd":"Apply ISD",
      "monto_calculado":"Calculated amount",
      "comision":"Commission",
      "monto_transferir":"Total to transfer",
      "conversion_label":"Conversion",
      "solicitar":"Request",
      "descargar":"Download the form here!",
      "disclaimer":"The form request is received until 14:00.",
      "notas_title":"How to make the transfer?",
      "nota_1":"Download and complete the corresponding form.",
      "nota_2":"Send the signed form in PDF format to: asesoria@bancoprocredit.com.ec, Monday to Friday by 14:00.",
      "isd_tooltip":"ISD corresponds to 5% of the transfer amount. This calculation considers the current exemption of up to 3 Basic Unified Salaries (SBU), applicable within a 15-calendar-day period. The amount shown is referential and may vary at the time of the transaction.",
      "nota_comision":"The commission may vary depending on the account type and is subject to the current tariff.",
      "nota_valores":"The values shown are referential. The exchange rate, commissions, and applicable taxes may vary at the time of the transaction.",
      "info_title":"Important information",
      "info_tasa":"The rate shown in the simulator is updated daily and may vary. Its validity applies only Monday through Friday, from 09h00 to 14h00. Outside this range, the published rate will not be valid for transactions.",
      "info_contacto_title":"Contact for more information",
      "info_telefono":"Phone: +593 2 211 0000 ext. 56108",
      "info_correo":"Email: sh.divisas@bancoprocredit.com.ec"
    },
    "vivienda":{
      "title":"Housing loan Simulator",
      "matLabelTranslated": "Housing loan",
      "vivienda_eco":"Ecological home",
      "sujeta_cambios":"Subject to changes and in case of ECO credit, the rate is with previously pre-selected construction companies",
      "sujeta_cambios2":"*Subject to environmental analysis",
      "sujeta_cambios3":"*Interest rate subject to discounts in the case of green housing."
    },
    "personal":{
      "title":"Personal Investment Credit Simulator",
      "matLabelTranslated": "Personal Investment Credit"
    },
    "educativo":{
      "title":"Loan for Studies Simulator",
      "matLabelTranslated": "Education loan"
    },
  
    "flexsave":{
      "title":"FlexSave Savings Account Simulator",
      "matLabelTranslated": "FlexSave Savings Account"
    },
    "dpf":{
      "title":"Fixed Term Deposit Simulator",
      "matLabelTranslated": "Fixed term deposit",
      "titulo":"Savings Simulator DPF Banco Procredit"
    },
    "proAhorro":{
      "title":"Pro Savings Simulator",
      "matLabelTranslated": "Pro Savings Plan"
    },
    "general":{
      "monto":"Amount",
      "plazo_meses":"Term (Months)",
      "plazo_dias":"Term (Days)",
      "plazo":"Term ",
      "tabla_amortizacion":"Payment schedule",
      "tasa_interes_efectiva":"Effective interest rate:",
      "tasa_interes":"Interest rate",
      "tasa_interes_pro_plan":"ProSavings Rate plus Base",
      "anual":"Annual",
      "tiempo_minimo":"Minimum time",
      "monto_minimo":"Minimum amount",
      "monto_maximo":"maximum amount",
      "meses":"months",
      "maximo":"maximum",
      "cerrar_tabla":"Close table",
      "detalle_s_alemana":"German simulation detail:",
      "tasa_periodica":"Periodic rate",
      "seguro_desgravamen":"Relief insurance",
      "total_seguro":"Total insurance",
      "liquido_recibir":"Net to receive",
      "cuota_inicial":"Initial fee",
      "total_interes_a_pagar":"Total interest to pay",
      "detalle_simulacion_francesa":"French simulation detail",
      "cuota_a_pagar":"Installment to pay",
      "todos_los_creditos":"All the credits of the financial system will be discounted by 0.5% contribution to SOLCA by regulations of the Superintendency of Banks. The values ​​are referential and are subject to calendar days",
      "sujeto_a_dias_calendario":"*The values ​​are referential and are subject to calendar days",
      "descargar":"Download",
      "tabla_amortizacion_francesa":"French Payment schedule",
      "cuota":"Term",
      "interes_periodo":"Interest for the period",
      "capital_amortizado":"Amortized capital",
      "seguro":"Insurance",
      "saldo_remanente":"Remaining balance",
      "tabla_amortizacion_alemana":"German Payment schedule",
      "lo_quiero":"I want it",
      "simulacion_detallada":"Detailed simulation",
      "cancelar":"Cancel",
      "francesa":"French",
      "alemana":"German",
      "dias":"days",
      "detalle_de_la_simulacion":"Simulation detail",
      "plazo_dias_t":"Term days",
      "plazo_meses_t":"Term months",
      "interes_ganado_referencial":"Referential earned interest",
      "total_recibir":"Total to receive",
      "abre_tu_cuenta":"Open your account",
      "dia":"day",
      "retencionIR":"Retention",
      "espanol":"Spanish",
      "ingles":"English",
      "regresar":"Regresar",
      "lista_tasas":"List of Taxes",
      "crear":"Create",
      "tasa":"Tax",
      "descripcion":"Description",
      "fecha":"Date",
      "accion":"Action",
  
      "monto_minimo_pro_ahorro": "The minimum amount of monthly savings is 30 USD",
      "cuenta_pro_ahorro": "You must have a connected account (Daily or traditional) from where debits are made to the plan",
      "interes_pro_ahorro": "Normal interest is calculated daily and compounded (credited) each month",
      "detalle_de_la_simulacion_pro_ahorro":"Details of your ProSavings Plan",
      "tasa_interes_normal":"Normal interest rate",
      "tasa_bono": "Bonus Rate",
      "capital": "Capital",
      "interes": "Interest",
      "bono": "Bond",
      "acumulado": "Accumulated",
      "interes_bono": "*Bonus interest is calculated daily and compounded (credited) at the end of the plan",
      "depositos_adi": "*Additional deposits can be received and both the normal rate and the bonus rate are paid on these",
      "plan_permite": "*The plan allows up to 3 months of not receiving an accreditation and maintaining the benefit of the bonus rate",
      "pasado_3": "*After 3 months, if the deposit was not received, the bonus interest is lost",
      "precancelacion": "*In case of early pre-cancellation, the bonus interest will be lost",
      "tablaplanproahorro": "Pro Savings Plan",
      "periodos": "Periods",
      "ahorro": "Saving",
      "interesbase": "Base Interest",
      "interesbono": "Interest Bonus",
  
      "cedula": "* Identification card",
      "votacion": "* Ballot paper",
      "servicio": "* A basic service form (water, electricity or telephone)",
      "depositoFlex": "* Initial deposit of $100 USD",
      "depositoFijo": "* Minimum amount of $1,000 USD",
      "creditoAPI": "* Credit for employees or independent professionals",
      "sercliente": "* Being a client of Banco ProCredit",
      "cuenta": "* Open an account at Banco ProCredit",
      "movimientocuenta3": "* Minimum 3 months of account movement",
      "nocreditovencast": "* Not have overdue or written-off credits",
      "monto1000": "* Minimum amount $1,000",
      "monto5000": "* Minimum amount $5,000",
      "capacidadpago": "* Have the payment capacity under analysis of Banco ProCredit",
      "movimientocuenta6": "* Minimum 6 months of account movement",
      "monto30000": "* Minimum amount $30,000",
      "referencial": "* The values ​​shown are referential.",
      "montoPA":"Amount to save",
      "tipo_cliente": "Customer type",
      "persona_natural": "Natural Person",
      "persona_juridica": "Legal Entity"
    }
  }

}