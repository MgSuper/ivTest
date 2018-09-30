import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';
import { HomePage } from '../home/home';

/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {

  data: any;
  onSuccess: boolean = false;

  constructor(public api: ApiproviderProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get("d");
    console.log("Data " + JSON.stringify(this.data));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
  }

  update(data) {
    this.api.updateBrand(data);
    this.onSuccess = true;
    //this.navCtrl.setRoot(HomePage);
  }

}
