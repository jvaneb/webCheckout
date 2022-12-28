import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-respuesta',
  templateUrl: './form-respuesta.component.html',
  styleUrls: ['./form-respuesta.component.css']
})
export class FormRespuestaComponent implements OnInit {

  @Input() prueba: string = '';

  data: any;

  constructor(private router: Router,
              public _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = this._activeRoute.snapshot.params['data'];
    console.log(this.data);
    
  }

}
