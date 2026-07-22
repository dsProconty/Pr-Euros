import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClientService } from '../client.service';

type CurrencyCode = 'EUR' | 'USD';

@Component({
  selector: 'app-simulators-euro',
  templateUrl: './simulators-euro.component.html',
  styleUrls: ['./simulators-euro.component.css']
})
export class SimulatorsEuroComponent implements OnInit {
  amount = 0;
  conversionRate = 0;
  commissionUsd = 0;
  sbUsd = 482;
  readonly isdRate = 0.05;
  applyIsd = true;
  fromCurrency: CurrencyCode = 'EUR';
  toCurrency: CurrencyCode = 'USD';
  isLoadingRate = false;
  rateError = '';
  isTranslated = false;

  constructor(
    private service: ClientService,
    private translate: TranslateService
  ) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.isTranslated = language !== 'es';
  }

  ngOnInit(): void {
    this.amount = 1000;
    this.fetchExchangeRate();
    this.fetchCommission();
  }

  swapConversionDirection(): void {
    const currentFrom = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = currentFrom;
  }

  sanitizeNumbers(): void {
    this.amount = this.normalizePositiveNumber(this.amount);
    this.conversionRate = this.normalizePositiveNumber(this.conversionRate);
    this.commissionUsd = this.normalizePositiveNumber(this.commissionUsd);
    this.sbUsd = this.normalizePositiveNumber(this.sbUsd);
  }

  get calculatedAmount(): number {
    if (!this.conversionRate || !this.amount) {
      return 0;
    }
    return this.fromCurrency === 'EUR'
      ? this.amount * this.conversionRate
      : this.amount / this.conversionRate;
  }

  get isdAmount(): number {
    if (!this.applyIsd) {
      return 0;
    }
    const taxableBase = this.usdBaseAmount - 3 * this.sbUsd;
    return Math.round(Math.max(0, taxableBase) * this.isdRate * 100) / 100;
  }

  get totalToTransfer(): number {
    return this.usdBaseAmount + this.commissionUsd + this.isdAmount;
  }

  get conversionLabel(): string {
    return this.fromCurrency + ' -> ' + this.toCurrency;
  }

  get usdBaseAmount(): number {
    return this.fromCurrency === 'USD' ? this.amount : this.calculatedAmount;
  }

  formatTruncated(value: number, decimals = 2): string {
    const truncated = this.truncate(value, decimals);
    return truncated.toLocaleString('es-ES', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  private fetchCommission(): void {
    this.service.getEuroComision().subscribe(
      (response) => {
        this.commissionUsd = this.normalizePositiveNumber(response.comision);
      },
      () => {
        this.commissionUsd = 0;
      }
    );
  }

  private fetchExchangeRate(): void {
    this.isLoadingRate = true;
    this.rateError = '';

    this.service.getSimuladorEuroTasa().subscribe(
      (response) => {
        this.conversionRate = this.normalizePositiveNumber(response.tasa);
        this.isLoadingRate = false;
      },
      () => {
        this.rateError = 'No se pudo obtener la tasa actual.';
        this.isLoadingRate = false;
      }
    );
  }

  private normalizePositiveNumber(value: number): number {
    const normalized = Number(value);

    if (!isFinite(normalized) || normalized < 0) {
      return 0;
    }

    return normalized;
  }

  private truncate(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }
}
