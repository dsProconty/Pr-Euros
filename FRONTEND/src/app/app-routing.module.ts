import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulatorsEComponent } from './simulators-e/simulators-e.component';
import {SimulatorsAdpfComponent} from './simulators-adpf/simulators-adpf.component';
import {SimulatorsAfComponent } from './simulators-af/simulators-af.component';
import {SimulatorsIpComponent} from './simulators-ip/simulators-ip.component';
import {SimulatorsVComponent} from './simulators-v/simulators-v.component';
import {SimulatorsPAComponent } from './simulators-pa/simulators-pa.component';
import {CareerPageComponent } from './career-page/career-page.component';
import { SimulatorsEuroComponent } from './simulators-euro/simulators-euro.component';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { LoginComponent } from './login/login.component';

const routes:Routes =[

  //{path: 'creditoEducativo', component:SimulatorsEComponent},
  {path:'ahorroDpf',component:SimulatorsAdpfComponent},
  {path:'ahorroFlexSave',component:SimulatorsAfComponent },
  {path:'creditoInversionPersonal',component:SimulatorsIpComponent },
  {path:'creditoInversionVivienda',component:SimulatorsVComponent },
  {path:'planProAhorro',component:SimulatorsPAComponent },
  {path:'paginaCarrera',component:CareerPageComponent },
  {path:'cotizadorEuros',component:SimulatorsEuroComponent },
  {path:'login',component:LoginComponent },
  {path:'tasasCambio',component:ExchangeRatesComponent },
  {path:'',redirectTo:'login',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

