import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { Formulario1Component } from './pages/formulario1/formulario1.component';
import { FormRespuestaComponent } from './pages/form-respuesta/form-respuesta.component';

// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    Formulario1Component,
    FormRespuestaComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckoutModule { }
