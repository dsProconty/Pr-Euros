import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../client.service';

type RateKey = 'euro' | 'euro-comision' | 'flex' | 'dpf' | 'inversion' | 'vivienda';

interface FlexSaveRange {
  id: number;
  client_type: string;
  min_amount: number;
  max_amount: number | null;
  label: string;
  rate: number;
  orden: number;
  isLoading?: boolean;
}

interface RateRow {
  key: RateKey;
  simulador: string;
  categoria: string;
  tasa: number;
  isLoading: boolean;
  decimals?: number;
  unit?: string;
}

interface CurrentUser {
  name: string;
  email: string;
  role_id: number;
}

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {
  rows: RateRow[] = [
    { key: 'euro',         simulador: 'Simulador EUR/USD',      categoria: 'Cambio',   tasa: 0, isLoading: false, decimals: 4, unit: '%' },
    { key: 'euro-comision',simulador: 'Comisión EUR/USD',       categoria: 'Cambio',   tasa: 0, isLoading: false, decimals: 2, unit: 'USD' },
    { key: 'dpf',          simulador: 'Depósito a plazo fijo',  categoria: 'Ahorros',  tasa: 0, isLoading: false, decimals: 2, unit: '%' },
    { key: 'inversion',    simulador: 'Crédito Inversión',      categoria: 'Créditos', tasa: 0, isLoading: false, decimals: 2, unit: '%' },
    { key: 'vivienda',     simulador: 'Crédito Vivienda',       categoria: 'Créditos', tasa: 0, isLoading: false, decimals: 2, unit: '%' },
  ];
  isLoading = true;
  isSaving = false;
  isModalOpen = false;
  selectedRow: RateRow | null = null;
  modalRate = 0;
  token = '';
  currentUser: CurrentUser | null = null;

  // Rangos PN/PJ del simulador FlexSave
  flexSaveRanges: FlexSaveRange[] = [];
  isLoadingFlexRanges = false;
  isFlexModalOpen = false;
  isFlexNewMode = false;   // true = crear, false = editar
  selectedFlexRange: FlexSaveRange | null = null;
  isSavingFlex = false;
  isDeletingFlex = false;
  confirmDeleteId: number | null = null;
  confirmDeleteLabel: string = '';

  // Formulario del modal (editar + crear)
  flexForm = { client_type: 'PN', min_amount: 0, max_amount: null as number | null, label: '', rate: 0 };

  constructor(
    private service: ClientService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('pc_token') || '';
    if (!this.token) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.loadCurrentUserAndRates();
  }

  loadAllRates(): void {
    this.isLoading = true;
    let pending = this.rows.length;

    this.rows.forEach((row) => {
      this.loadRate(row, () => {
        pending -= 1;
        if (pending === 0) {
          this.isLoading = false;
        }
      });
    });
  }

  openEditModal(row: RateRow): void {
    if (!this.canEditRow(row)) {
      this.toastr.warning('No tienes permisos para editar esta tasa.');
      return;
    }
    this.selectedRow = row;
    this.modalRate = row.tasa;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedRow = null;
  }

  saveRate(): void {
    if (!this.selectedRow) {
      return;
    }
    if (!this.token) {
      this.toastr.warning('Debes iniciar sesión para editar.');
      return;
    }

    this.modalRate = this.normalizePositiveNumber(this.modalRate);
    this.isSaving = true;

    this.getUpdateRequest(this.selectedRow.key, this.modalRate).subscribe(
      () => {
        if (this.selectedRow) { this.selectedRow.tasa = this.modalRate; }
        this.isSaving = false;
        this.toastr.success('Tasa actualizada correctamente.');
        this.closeModal();
      },
      () => {
        this.isSaving = false;
        this.toastr.error('No se pudo guardar la tasa. Verifica sesión y permisos.');
      }
    );
  }

  logout(): void {
    const activeToken = this.token;
    this.clearSession();
    this.router.navigateByUrl('/login');
    if (!activeToken) {
      return;
    }
    this.service.logout(activeToken).subscribe(
      () => this.toastr.success('Sesión cerrada.'),
      () => this.toastr.info('Sesión local cerrada.')
    );
  }

  canEditRow(row: RateRow): boolean {
    if (!this.currentUser) {
      return false;
    }
    const roleId = this.currentUser.role_id;
    if (roleId === 3) {
      return true;
    }
    if (roleId === 1) {
      return row.key === 'euro' || row.key === 'euro-comision';
    }
    if (roleId === 2) {
      return row.key !== 'euro' && row.key !== 'euro-comision';
    }
    return false;
  }

  get visibleRows(): RateRow[] {
    if (!this.currentUser) {
      return [];
    }
    const roleId = this.currentUser.role_id;
    if (roleId === 3) {
      return this.rows;
    }
    if (roleId === 1) {
      return this.rows.filter((r) => r.key === 'euro' || r.key === 'euro-comision');
    }
    if (roleId === 2) {
      return this.rows.filter((r) => r.key !== 'euro' && r.key !== 'euro-comision');
    }
    return [];
  }

  formatTruncated(value: number, decimals = 2): string {
    const truncated = this.truncate(value, decimals);
    return truncated.toLocaleString('es-ES', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  private loadCurrentUserAndRates(): void {
    this.service.getUsuarioActual(this.token).subscribe(
      (res) => {
        const user = res?.user || res;
        this.currentUser = {
          name: user?.name || 'Usuario',
          email: user?.email || '',
          role_id: Number(user?.role_id || 0)
        };
        this.loadAllRates();
        this.loadFlexSaveRanges();
      },
      () => {
        this.clearSession();
        this.toastr.warning('Sesión expirada, vuelve a iniciar sesión.');
        this.router.navigateByUrl('/login');
      }
    );
  }

  private loadRate(row: RateRow, done: () => void): void {
    row.isLoading = true;

    this.getReadRequest(row.key).subscribe(
      (response) => {
        row.tasa = this.extractRate(row.key, response);
        row.isLoading = false;
        done();
      },
      () => {
        row.isLoading = false;
        this.toastr.warning(`No se pudo cargar la tasa de ${row.simulador}.`);
        done();
      }
    );
  }

  private getReadRequest(key: RateKey) {
    switch (key) {
      case 'euro':
        return this.service.getSimuladorEuroTasa();
      case 'euro-comision':
        return this.service.getEuroComision();
      case 'flex':
        return this.service.getFlexSaving();
      case 'dpf':
        return this.service.getDpfSaving();
      case 'inversion':
        return this.service.getCreditoInversion();
      case 'vivienda':
        return this.service.getCreditoInmobiliario();
      default:
        return this.service.getSimuladorEuroTasa();
    }
  }

  private getUpdateRequest(key: RateKey, tasa: number) {
    switch (key) {
      case 'euro':
        return this.service.updateSimuladorEuroTasa({ tasa }, this.token);
      case 'euro-comision':
        return this.service.updateEuroComision({ comision: tasa }, this.token);
      case 'flex':
        return this.service.updateFlexSavingRate({ tasa }, this.token);
      case 'dpf':
        return this.service.updateDpfSavingRate({ tasa }, this.token);
      case 'inversion':
        return this.service.updateCreditoInversionRate({ tasa }, this.token);
      case 'vivienda':
        return this.service.updateCreditoViviendaRate({ tasa }, this.token);
      default:
        return this.service.updateSimuladorEuroTasa({ tasa }, this.token);
    }
  }

  private extractRate(key: RateKey, response: any): number {
    if (key === 'euro-comision') {
      return this.normalizePositiveNumber(response?.comision);
    }
    if (Array.isArray(response) && response.length > 0) {
      const item = response[0] || {};
      if (key === 'flex' || key === 'dpf') {
        return this.normalizePositiveNumber(item.rate);
      }
      return this.normalizePositiveNumber(item.tasa ?? item.rate);
    }
    return this.normalizePositiveNumber(response?.tasa ?? response?.rate);
  }

  private normalizePositiveNumber(value: any): number {
    const normalized = this.toNumber(value);
    if (!isFinite(normalized) || normalized < 0) {
      return 0;
    }
    return normalized;
  }

  private truncate(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.trunc(value * factor) / factor;
  }

  private toNumber(value: any): number {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string') {
      const cleanValue = value.trim().replace(',', '.');
      return Number(cleanValue);
    }
    return Number(value);
  }

  // ── Rangos FlexSave PN/PJ ────────────────────────────────────────────────

  get canEditFlexRanges(): boolean {
    return this.currentUser?.role_id === 2 || this.currentUser?.role_id === 3;
  }

  get flexRangesPN(): FlexSaveRange[] {
    return this.flexSaveRanges.filter(r => r.client_type === 'PN');
  }

  get flexRangesPJ(): FlexSaveRange[] {
    return this.flexSaveRanges.filter(r => r.client_type === 'PJ');
  }

  loadFlexSaveRanges(): void {
    this.isLoadingFlexRanges = true;
    this.service.getFlexSaveRates().subscribe(
      (rates) => {
        this.flexSaveRanges = rates;
        this.isLoadingFlexRanges = false;
      },
      () => {
        this.isLoadingFlexRanges = false;
        this.toastr.warning('No se pudieron cargar los rangos FlexSave.');
      }
    );
  }

  openFlexEditModal(range: FlexSaveRange): void {
    this.isFlexNewMode = false;
    this.selectedFlexRange = range;
    this.flexForm = {
      client_type: range.client_type,
      min_amount: range.min_amount,
      max_amount: range.max_amount,
      label: range.label,
      rate: range.rate,
    };
    this.isFlexModalOpen = true;
  }

  openFlexCreateModal(clientType: string): void {
    this.isFlexNewMode = true;
    this.selectedFlexRange = null;
    this.flexForm = { client_type: clientType, min_amount: 0, max_amount: null, label: '', rate: 0 };
    this.isFlexModalOpen = true;
  }

  closeFlexModal(): void {
    this.isFlexModalOpen = false;
    this.selectedFlexRange = null;
  }

  saveFlexRange(): void {
    this.isSavingFlex = true;

    const obs = this.isFlexNewMode
      ? this.service.createFlexSaveRange(this.flexForm, this.token)
      : this.service.updateFlexSaveRange(this.selectedFlexRange!.id, this.flexForm, this.token);

    obs.subscribe(
      () => {
        this.isSavingFlex = false;
        this.toastr.success(this.isFlexNewMode ? 'Rango creado correctamente.' : 'Rango actualizado correctamente.');
        this.closeFlexModal();
        this.loadFlexSaveRanges();
      },
      () => {
        this.isSavingFlex = false;
        this.toastr.error('No se pudo guardar. Verifica sesión y permisos.');
      }
    );
  }

  confirmDeleteFlex(id: number, label: string): void {
    this.confirmDeleteId = id;
    this.confirmDeleteLabel = label;
  }

  cancelDeleteFlex(): void {
    this.confirmDeleteId = null;
    this.confirmDeleteLabel = '';
  }

  deleteFlexRange(): void {
    if (!this.confirmDeleteId) { return; }
    this.isDeletingFlex = true;
    this.service.deleteFlexSaveRange(this.confirmDeleteId, this.token).subscribe(
      () => {
        this.isDeletingFlex = false;
        this.cancelDeleteFlex();
        this.toastr.success('Rango eliminado correctamente.');
        this.loadFlexSaveRanges();
      },
      () => {
        this.isDeletingFlex = false;
        this.toastr.error('No se pudo eliminar. Verifica sesión y permisos.');
      }
    );
  }

  // ─────────────────────────────────────────────────────────────────────────

  private clearSession(): void {
    this.token = '';
    this.currentUser = null;
    localStorage.removeItem('pc_token');
  }
}
