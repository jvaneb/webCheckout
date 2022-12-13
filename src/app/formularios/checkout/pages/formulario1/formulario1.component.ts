import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-formulario1',
  templateUrl: './formulario1.component.html',
  styleUrls: ['./formulario1.component.css']
})
export class Formulario1Component implements OnInit {

  contentLoaded = false;
  icono: any;
  form: FormGroup = new FormGroup({});

  constructor(private formbuild: FormBuilder,
              private spinner: NgxSpinnerService,
              private router: Router,
              public translate: TranslateService) 
              {
                translate.setDefaultLang('es');
                translate.use('es');
                translate.addLangs(['es','en','pt']);

                // const browserLang: any = translate.getBrowserLang();
                // translate.use(browserLang.match(/en|es/|pt/) ? browserLang : 'es');
              }

  ngOnInit(): void {
    this.crearFormulario();
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);

    this.icono = '../../../../../assets/img/tarjeta.png';
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
  }

  crearFormulario() {
    this.form = this.formbuild.group({      
      nombre: new FormControl('',[Validators.required]),
      telefono: new FormControl('',[Validators.required]),
      id_tipo_documento: new FormControl('',[Validators.required]),
      numero_documento: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      ref_pago: new FormControl('',[Validators.required]),
      id_sucursal: new FormControl('',[Validators.required]),
      id_banco_pse: new FormControl('',[Validators.required]),
      id_tipo_persona_pse: new FormControl('',[Validators.required]),
    });
  }

  keyUpEvent(numeros: any){
    
    // Agregar un espacio cada 4 numeros
    numeros.target.value = numeros.target.value.replace(/([0-9]{4})$/g, '$1 ');
    // console.log('despues... ',numeros.target.value.replace(/ /g,''));
    
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

    if (num.lenght == 0 || num == '') {
      this.icono = '../../../../../assets/img/tarjeta.png';
      return;
    }

    // visa
    let re = new RegExp("^4");
    if (num.match(re) != null )
    this.icono = '../../../../../assets/img/visa.png';

    // Mastercard
    let mastercard = new RegExp("^5");
    let mastercard2 = new RegExp("^2");
    if (num.match(mastercard) != null || num.match(mastercard2) != null )
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

  respuesta() {
    console.log(this.form.value);
    
    // this.router.navigate(['/formulario/checkout/formRespuesta/:'+ data]);
  }

}
