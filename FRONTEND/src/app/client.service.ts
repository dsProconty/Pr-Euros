import { Injectable } from '@angular/core';

import {Client} from './client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  data:Client[];
  url:string;



  constructor(private http:HttpClient) { }

  getFlexSaving(){
    return this.http.get(environment.url+"/flexSaving");
  }
  getDpfSaving(){
    return this.http.get(environment.url+'/dpfSaving');
  }
  getCreditoEducativo(){
    return this.http.get(environment.url+'/creditoEducativo');
  }
  getCreditoInversion(){
    return this.http.get(environment.url+'/creditoInversion');
  }
  getCreditoInmobiliario(){
    return this.http.get(environment.url+'/creditoInmobiliario');
  }
  getProPlan(){
    return this.http.get(environment.url+"/proSavingsPlan");
  }

  getSimuladorEuroTasa() {
    return this.http.get<{
      simulador_euros?: boolean;
      nota?: string;
      tasa: number;
    }>(`${environment.url}/tasas-cambio`);
  }

  updateSimuladorEuroTasa(data: { tasa: number }, token?: string) {
    return this.http.post(`${environment.url}/tasas-cambio`, data, this.withAuth(token));
  }

  getEuroComision() {
    return this.http.get<{ comision: number }>(`${environment.url}/euro-comision`);
  }

  updateEuroComision(data: { comision: number }, token?: string) {
    return this.http.post(`${environment.url}/euro-comision`, data, this.withAuth(token));
  }

  updateFlexSavingRate(data: { tasa: number }, token?: string) {
    return this.http.post(`${environment.url}/ahorro-flex/tasa`, data, this.withAuth(token));
  }

  getFlexSaveRates() {
    return this.http.get<any[]>(`${environment.url}/flex-save-rates`);
  }

  createFlexSaveRange(data: any, token?: string) {
    return this.http.post(`${environment.url}/flex-save-rates`, data, this.withAuth(token));
  }

  updateFlexSaveRange(id: number, data: any, token?: string) {
    return this.http.put(`${environment.url}/flex-save-rates/${id}`, data, this.withAuth(token));
  }

  deleteFlexSaveRange(id: number, token?: string) {
    return this.http.delete(`${environment.url}/flex-save-rates/${id}`, this.withAuth(token));
  }

  updateDpfSavingRate(data: { tasa: number }, token?: string) {
    return this.http.post(`${environment.url}/deposito-plazo-fijo/tasa`, data, this.withAuth(token));
  }

  updateCreditoInversionRate(data: { tasa: number }, token?: string) {
    return this.http.post(`${environment.url}/credito-inversion/tasa`, data, this.withAuth(token));
  }

  updateCreditoViviendaRate(data: { tasa: number }, token?: string) {
    return this.http.post(`${environment.url}/credito-vivienda/tasa`, data, this.withAuth(token));
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${environment.url}/login`, data);
  }

  getUsuarioActual(token: string) {
    return this.http.get<any>(`${environment.url}/usuario`, this.withAuth(token));
  }

  logout(token: string) {
    return this.http.post<any>(`${environment.url}/logout`, {}, this.withAuth(token));
  }

  insert(data:Client){

    return this.http.post(environment.url+'/client',data, { responseType: 'text'});

  }

  insertData(data:any){

    return this.http.post(environment.url+'/career',data, { responseType: 'text'});

  }

  private withAuth(token?: string) {
    if (!token) {
      return {};
    }
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }
}
