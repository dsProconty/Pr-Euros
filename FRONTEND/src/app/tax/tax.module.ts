import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxRoutingModule } from './tax-routing.module';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, of } from 'rxjs';

@NgModule({
  declarations: [IndexComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    TaxRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatTabsModule,
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
    MatInputModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:mockTranslateLoader,
        deps:[HttpClient]
      }
    }),
  ]
})
export class TaxModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/images/', '.json');
}

export function mockTranslateLoader(): TranslateLoader {
  return {
    getTranslation: (lang: string) => of(mockTranslations[lang] || {})
  } as TranslateLoader;
}

export const mockTranslations = {
  es: {
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
      "movimientocuenta3": "* Mínimo 3 meses de movimiento de cuenta",
      "nocreditovencast": "* No tener créditos vencidos o castigados",
      "monto5000": "* Monto mínimo $5.000",
      "capacidadpago": "* Tener la capacidad de pago bajo análisis de Banco ProCredit",
      "movimientocuenta6": "* Mínimo 6 meses de movimiento de cuenta",
      "monto30000": "* Monto mínimo $30.000",
      "requisitos": "Requisitos",
      "referencial": "* Los valores mostrados son referenciales.",
      "montoPA":"Monto a ahorrar"
    }
  },
  en: {
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
      "movimientocuenta3": "* Minimum 3 months of account movement",
      "nocreditovencast": "* Not have overdue or written-off credits",
      "monto5000": "* Minimum amount $5,000",
      "capacidadpago": "* Have the payment capacity under analysis of Banco ProCredit",
      "movimientocuenta6": "* Minimum 6 months of account movement",
      "monto30000": "* Minimum amount $30,000",
      "referencial": "* The values ​​shown are referential.",
      "montoPA":"Amount to save"
    }
  }
  
}