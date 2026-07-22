import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaxService } from '../tax.service';
import { TranslateService } from '@ngx-translate/core';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @ViewChild('mattabgroup', { static: false }) mattabgroup: MatTabGroup;

  form: FormGroup;
  matLabelTranslated = '';
  isTranslated = false;

  constructor(
    public taxService: TaxService,
    private router: Router,
    public dialog: MatDialog,
    private translate: TranslateService
    ) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      tax: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
    this.matLabelTranslated = this.translate.instant('key');
  }

  
  useLanguage(language: string) {
    this.translate.use(language);
    if (language == 'es') {
      this.isTranslated = false;
    } else {
      this.isTranslated = true;
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.taxService.create(this.form.value).subscribe(res => {
      console.log('tax created');
      this.router.navigateByUrl('tax/index');
    })
  }

}
