import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  scheduled = [];

  constructor(
    private plt: Platform,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private router: Router) {
      this.plt.ready().then(() => {
        this.localNotifications.on('click').subscribe(res => {
          console.log('click', res);
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, res.text, msg);
        });
  
        this.localNotifications.on('trigger').subscribe(res => {
          console.log('trigger', res);
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, res.text, msg);
        });
      });
    }

  ngOnInit() {
    setTimeout(() => {
      this.scheduleNotification()
    }, 3000);
  }

  scheduleNotification() {
    this.localNotifications.schedule({
      title: 'Validação de segurança',
      text: 'Para dar continuidade ao seu processo, faça validação de gesto',
      foreground: true
    });
  }
  openDetailsWithQueryParams() {
    let navigationExtras: NavigationExtras = {

    };
    this.router.navigate(['/tab3'], navigationExtras);
  }

  openPerguntaWithQueryParams() {
    let navigationExtras: NavigationExtras = {

    };
    this.router.navigate(['/loading'], navigationExtras);
  }

  getAll() {
    this.localNotifications.getAll().then(res => {
      this.scheduled = res;
      console.log(this.scheduled)
    });
  }

  showAlert(header, sub, msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: [
        {
          text: 'Fazer validação',
          handler: () => {
            console.log('Yes selected');
            this.openPerguntaWithQueryParams();
          }
        },
        {
          text: 'Mais tarde',
          handler: () => {
            console.log('No selected!');
            alert("Tudo bem... mas não esqueça de validar!");
          }
        }
      ]
    }).then(alert => alert.present());
  }

}
