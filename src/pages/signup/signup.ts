import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, AlertController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Settings } from "../../settings";

//@IonicPage({})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  newUser: any = {};
  billing_shipping_same: boolean;
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController,
    private loadingController: LoadingController,public http: Http) {

    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.billing_shipping_same = false; 
    this.newUser.billing_address.country = "223";
    this.newUser.billing_address.state = "1";
    this.newUser.shipping_address.state = "1";
    this.newUser.shipping_address.country = "223";
  }

  signup(){
    let loading = this.loadingController.create();
    loading.present();

    
    let customerData = {
      customer : {}
    }

    customerData.customer = {
      "email": this.newUser.email,
      "firstname": this.newUser.first_name,
      "lastname": this.newUser.last_name,
      "username": this.newUser.username,
      "password": this.newUser.password,
      "api_key":Settings.jbackend_api_key,
      "billing_address": {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.billing_address.address_1,
        "address_2": this.newUser.billing_address.address_2,
        "city": this.newUser.billing_address.city,
        "state": this.newUser.billing_address.state,
        "zip": this.newUser.billing_address.postcode,
        "country": this.newUser.billing_address.country,
        "email": this.newUser.email,
        "phone_1": this.newUser.billing_address.phone,
        "virtuemart_state_id":this.newUser.billing_address.state,
     "virtuemart_country_id":this.newUser.billing_address.country
      },
      "shipping_address": {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.shipping_address.address_1,
        "address_2": this.newUser.shipping_address.address_2,
        "city": this.newUser.shipping_address.city,
        "state": this.newUser.shipping_address.state,
        "zip": this.newUser.shipping_address.postcode,
        "country": this.newUser.shipping_address.country,
        "virtuemart_state_id":this.newUser.shipping_address.state,
     "virtuemart_country_id":this.newUser.shipping_address.country
      }
    }

    if(this.billing_shipping_same){
      this.newUser.shipping_address = this.newUser.shipping_address;
    }

    this.http.post(Settings.store_url + "/index.php?option=com_jbackend&view=request&action=post&module=user&resource=register",
    customerData.customer) 
        .subscribe((res) => {
            
     
            let response = res.json();
           // console.log(response);
          
         //   alert(response.error_code);
      //      let user_info = response;
        // let customer_info =response;
       //  console.log(customer_info);
      
            if (response['error_code']) {
              this.toastCtrl.create({
                message: response['error_description'],
                duration: 5000
              }).present();
      
              loading.dismiss();
              return;
            }
         
              this.alertCtrl.create({
                title: "Account Created",
                message: "Your account has been created successfully! Please login to proceed.",
                buttons: [{
                  text: "Login",
                  handler: ()=> {
                    this.navCtrl.pop();
                  }
                }]
              }).present();
            
              loading.dismiss();

      
          
          }, (err) => {
            loading.dismiss();
            this.toastCtrl.create({
                message: "An error occurred.",
                duration: 5000
              }).present();
          });
      
     
        

   
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  checkEmail(){

    let validEmail = false;

    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(reg.test(this.newUser.email)){
      //email looks valid

      this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then( (data) => {
        let res = (JSON.parse(data.body));

        if(res.errors){
          validEmail = true;

          this.toastCtrl.create({
            message: "Congratulations. Email is good to go.",
            duration: 3000
          }).present();

        } else {
          validEmail = false;

          this.toastCtrl.create({
            message: "Email already registered. Please check.",
            showCloseButton: true
          }).present();
        }

        console.log(validEmail);

      })

  



    } else {
      validEmail = false;
      this.toastCtrl.create({
        message: "Invalid Email. Please check.",
        showCloseButton: true
      }).present();
      console.log(validEmail);
    }

  }

  signup_old(){

      let customerData = {
        customer : {}
      }

      customerData.customer = {
        "email": this.newUser.email,
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "username": this.newUser.username,
        "password": this.newUser.password,
        "billing_address": {
          "first_name": this.newUser.first_name,
          "last_name": this.newUser.last_name,
          "company": "",
          "address_1": this.newUser.billing_address.address_1,
          "address_2": this.newUser.billing_address.address_2,
          "city": this.newUser.billing_address.city,
          "state": this.newUser.billing_address.state,
          "postcode": this.newUser.billing_address.postcode,
          "country": this.newUser.billing_address.country,
          "email": this.newUser.email,
          "phone": this.newUser.billing_address.phone
        },
        "shipping_address": {
          "first_name": this.newUser.first_name,
          "last_name": this.newUser.last_name,
          "company": "",
          "address_1": this.newUser.shipping_address.address_1,
          "address_2": this.newUser.shipping_address.address_2,
          "city": this.newUser.shipping_address.city,
          "state": this.newUser.shipping_address.state,
          "postcode": this.newUser.shipping_address.postcode,
          "country": this.newUser.shipping_address.country
        }
      }

      if(this.billing_shipping_same){
        this.newUser.shipping_address = this.newUser.shipping_address;
      }

      this.WooCommerce.postAsync('customers', customerData).then( (data) => {

        let response = (JSON.parse(data.body));

        if(response.customer){
          this.alertCtrl.create({
            title: "Account Created",
            message: "Your account has been created successfully! Please login to proceed.",
            buttons: [{
              text: "Login",
              handler: ()=> {
                this.navCtrl.pop();
              }
            }]
          }).present();
        } else if(response.errors){
          this.toastCtrl.create({
            message: response.errors[0].message,
            showCloseButton: true
          }).present();
        }

      })

    }

}
