import { Component , ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  public isLoaded : boolean = false;

  constructor(private cdr: ChangeDetectorRef) {

    this.show();

   }

  show()
  {
    this.isLoaded = false;  
    
  }

  hide()
  {
    this.isLoaded = true;
    this.cdr.detectChanges();
  }
  
}
