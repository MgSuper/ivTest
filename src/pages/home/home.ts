import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { ApiproviderProvider } from '../../providers/apiprovider/apiprovider';

import { AngularFireDatabase } from '@angular/fire/database';
import { UpdatePage } from '../update/update';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  allBrands: any;
  newBrands = { brand: '', description: '', code: ''};

  brandData = [];

  itemFilters: any;

  constructor(public fdb: AngularFireDatabase, public loadingCtrl:LoadingController, public toastCtrl: ToastController, public api: ApiproviderProvider, public navCtrl: NavController) {
  }

  ionViewDidLoad()
  {
    this.getBrand();
  }

  doRefresh(refresher) {
    this.getBrand();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  filterItems(): void{
    this.allBrands = this.itemFilters;
  }

  filterTechnologies(param : any) : void{
    this.filterItems();
    const val = param.target.value;
    if(val.trim() !== '')
    {
      this.allBrands = this.allBrands.filter((item) => {
        return item.brand.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
  }

  getBrand() {
    this.api.getBrand()
      .then(data => {
        this.allBrands = data;
        this.itemFilters = this.allBrands;
        console.log(JSON.stringify(this.allBrands));
      });
  }

  insert(data){
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    })
    if(this.newBrands.brand =='' || this.newBrands.description == '' || this.newBrands.code == '')
    {
      toaster.setMessage('All fields are required dude ! ');
      toaster.present();
    }
    else
    {
      this.api.saveBrand(data).then(res => {
        this.getBrand();
      });
    }
  }

  deletebrand(id){
    this.api.delBrand(id)
      .then(res => {
        console.log("Result " + JSON.stringify(res));
        this.getBrand();
      });
  }

  updatebrand(data){
    this.navCtrl.push(UpdatePage, {
      d: data
    })
  }


}
