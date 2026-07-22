import { Component, OnInit } from '@angular/core';
import { TaxService } from '../tax.service';
import { Tax } from '../tax';
import { TranslateService } from '@ngx-translate/core';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  taxes: Tax[]=[];
  isTranslated = false;

  constructor(public taxService: TaxService,
    public dialog: MatDialog,
    private translate: TranslateService) { 
      translate.addLangs(['es', 'en']);
      translate.setDefaultLang('es');
    }

  ngOnInit(): void {
    this.taxService.getAll().subscribe((data: Tax[])=>{
      this.taxes=data;
      console.log(this.taxes);
    })
  }

  useLanguage(language: string) {
    this.translate.use(language);
    if (language == 'es') {
      this.isTranslated = false;
    } else {
      this.isTranslated = true;
    }
  }


  deleteTax(id){
    this.taxService.delete(id).subscribe(res=>{
      this.taxes=this.taxes.filter(item => item.id !==id);
      console.log('Tax deleted');
      
    })
  }

}
