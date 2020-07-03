import { Component, OnInit } from '@angular/core';
import { data } from "./../../../../assets/data/data";

@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.scss']
})
export class SitiosComponent implements OnInit {

  sitios = data.sitios;

  constructor() { }

  ngOnInit() {
  }

}