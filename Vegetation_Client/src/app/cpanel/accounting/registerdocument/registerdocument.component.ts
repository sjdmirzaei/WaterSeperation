import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder ,FormsModule} from "@angular/forms";
import { SearchRegisterDocument,Transaction} from '../../../../model/barrel';
import{RegisterdocumentService} from '../../../../services/registerdocument.service';


@Component({
  selector: 'app-registerdocument',
  templateUrl: './registerdocument.component.html',
  styleUrls: ['./registerdocument.component.css']
})
export class RegisterdocumentComponent implements OnInit {


  public showtabel: boolean = false;
  public savefail: boolean = false;
  public disableInsert: boolean = false;
  public fromdate: string;
  public todate:string;
  public searchfeild: SearchRegisterDocument;
  public listCount: number = 1;
  public list: Array<Transaction> = [];
  constructor(private _service: RegisterdocumentService) { }

  ngOnInit() {
    this.searchfeild = new SearchRegisterDocument();
  }

  search() {
  this.showtabel=true;

//   this.searchfeild.fromdate=this.fromdate;
//   this.searchfeild.todate=this.todate;
  this.load();
}

load() {
    this._service.getAll(this.searchfeild).subscribe(rec => {

        this.list = rec.list;
        this.listCount = rec.count;
    });

    }
insert(){
    if(this.list.filter(rec=>rec.selectitem==true).length<=0)
    this.disableInsert=true;
    else 
{
    this.disableInsert=false;
    this._service.save(this.list.filter(rec=>rec.selectitem==true).map(rec=>rec.id)).subscribe(rec => {
        this.savefail = false;
    },error => {

            if(error.status == 400)
                this.savefail = true;
        });
    }
    

}

selectitem(e) {

    if(e.target.checked){
        this.list.forEach(element => {
          if(element.checkCode){
          element.selectitem=true;
         
          }
      });
    }
    else{
        this.list.forEach(element => {
          element.selectitem=false;
         
        });
    }
 }

}
