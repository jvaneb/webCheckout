import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-formulario1',
  templateUrl: './formulario1.component.html',
  styleUrls: ['./formulario1.component.css']
})
export class Formulario1Component implements OnInit {

  contentLoaded = false;
  icono: any;

  constructor(private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
  }

  ponerEspacios(e: any) {   
    
  }

  //Function para campo fecha expiración, formatea fecha solo mes/año

  formatString(e: any) {
    let inputChar = String.fromCharCode(e.keyCode);
    let code = e.keyCode;
    let allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    e.target.value = e.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
      /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
      /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
      /\/\//g, '/' // Prevent entering more than 1 `/`
    );
    
  }

  //Function para campo CVV, solo números en el campo
  soloNumeros(e: any) {
    
    // code is the decimal ASCII representation of the pressed key.
			let code = (e.which) ? e.which : e.keyCode;
			
			if(code==8) { // backspace.
			  return true;
			} 
      else if(code>=48 && code<=57) { // is a number.
			  return true;
			} 
      else{ // other keys.
			  return false;
			}
  }

  GetCardType(number: any)
  {
    let num = number.target.value;
    
    // visa
    let re = new RegExp("^4");
    if (num.match(re) != null)
    this.icono = '../../../../../assets/img/visa.png';

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(num))
    this.icono = '../../../../../assets/img/mastercard.png';

    // American express
    re = new RegExp("^3[47]");
    if (num.match(re) != null)
    this.icono = '../../../../../assets/img/american.png';

    // Diners
    re = new RegExp("^36");
    if (num.match(re) != null)
    this.icono = '../../../../../assets/img/diners.png';

    // Diners
    re = new RegExp("^3(?:0[0-59]{1}|[689])[0-9]{0,}");
    if (num.match(re) != null)
    this.icono = '../../../../../assets/img/diners.png';

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (num.match(re) != null)
    this.icono = '../../../../../assets/img/diners.png';


  }

  GetCardType2(cc: any) {
    let num = cc.target.value;

    let amex = new RegExp('^3[47][0-9]{13}$');
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');
    let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');


    if (visa.test(num) != null) {
      this.icono = '../../../../../assets/img/visa.png';
      console.log('visa');
      
    }
    else if (amex.test(cc.target.value)) {
      this.icono = '../../../../../assets/img/american.png';
      console.log('amex');
      
    }
    else if (mastercard.test(cc.target.value) || mastercard2.test(cc.target.value)) {
      this.icono = '../../../../../assets/img/mastercard.png';
      console.log('mastercard');
      
    }
    else if (diners.test(cc.target.value)) {
      this.icono = '../../../../../assets/img/diners.png';
      console.log('diners');
      
    }
    else {
      this.icono = '../../../../../assets/img/tarjeta.png'
      console.log('ninguna');
      
    }
  }

  respuesta() {
    let data = {
      nombre: 'Jeimmy',
      email: 'jeimmy.bautista@pagodigital.co',
      celular: '3225999626'
    }
    this.router.navigate(['/formulario/checkout/formRespuesta/:'+ data]);
  }

}
