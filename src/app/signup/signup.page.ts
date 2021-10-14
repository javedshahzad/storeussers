import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../service/server.service';
import { ToastController,NavController,Platform,LoadingController } from '@ionic/angular';
import firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  
  text:any;
  showcaptecha:boolean=true;
  confirmationResult: firebase.auth.ConfirmationResult;
  recaptchaVerifier:any;
  lowershow:boolean=false;
  users:any={};
  countrywithcode: any;
  phoneNumber: any;
  confirmotp: boolean=false;
  phoneNo: any;
  phoneshow:boolean=true;
  
  constructor(private route: ActivatedRoute,public server : ServerService,public toastController: ToastController,private nav: NavController,public loadingController: LoadingController){

  this.text = JSON.parse(localStorage.getItem('app_text'));
  
  }

  ngOnInit()
  {
  
  }

  async signup()
  {
   
    this.users.phone=this.phoneNo
    console.log(this.users)
    const loading = await this.loadingController.create({
      message: '',
      spinner : 'bubbles'
    });
    await loading.present();

    this.server.signup(this.users).subscribe((response:any) => {
  
    if(response.msg != "done")
    {
    	this.presentToast(this.text.s_email_error);
    }
    else
    {
    	this.presentToast(this.text.s_signup_msg);
        this.nav.navigateBack('/login');
    }

    loading.dismiss();

    });
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position : 'top',
      mode:'ios',
      color:'dark'
    });
    toast.present();
  }


  sendotp(){
   
    this.phoneNo=this.countrywithcode+this.users.phone;
   if(this.phoneNo){
    console.log(this.phoneNo);
    if(this.phoneNo){
    firebase.auth().signInWithPhoneNumber(  this.phoneNo, this.recaptchaVerifier).then((result) => {
    console.log(result);
    this.phoneNumber = this.phoneNo;
    this.phoneshow = false;
    this.confirmotp=true;
    this.confirmationResult = result;
    this.showcaptecha=false;
    }).catch(err => {
      this.presentToast("Your number is temporarly blocked!Try later");
    console.log(err);
    })
    }
   }else{
    this.presentToast("Enter Number");
   }
}
verifyOTP() {
  //  var otp = (<HTMLInputElement>document.getElementById("otp")).value;
 if(this.users.otpvalue){
  console.log(this.users.otpvalue);
  this.confirmationResult.confirm(this.users.otpvalue).then((data) => {
  console.log(data)
  this.confirmotp=false;
  console.log("Succesfull");
    this.presentToast("OTP verification Success");
  this.lowershow=true;
  }).catch(err => {
    this.presentToast("Invalid OTP");
  console.log(err);
  })
 }
}

  ionViewDidEnter(){
    setTimeout(() => {
     this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recapta-container', { 'size': 'normal' });
    }, 3000);
   }
}
