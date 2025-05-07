import {Component, OnInit} from '@angular/core';
import {Gep} from '../shared/models/gep';
import {GepService} from '../services/gep.service';
import {RouterLink} from '@angular/router';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-home',
    imports: [
        RouterLink,
        NgForOf,
        CurrencyPipe,

    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  gepek: any[] = [];

  constructor(private gepService: GepService) {}

  ngOnInit(): void {
    this.gepService.getAll().subscribe({
      next: (data) => this.gepek = data,
      error: (err) => console.error('Error loading data:', err)
    });
  }
}
