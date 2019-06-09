import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor( 
    private router: Router,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.openPerguntaWithQueryParams()
    }, 2000);
  }

  openPerguntaWithQueryParams() {
    let navigationExtras: NavigationExtras = {

    };
    this.router.navigate(['/validacao'], navigationExtras);
  }

}
