import { Component, OnInit } from '@angular/core';
import { Reagent } from 'src/app/models/reagent.model';
import { ReagentService } from 'src/app/services/reagent.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  reagents?: Reagent[];
  constructor(private reagentService: ReagentService) {}

  ngOnInit(): void {
    this.retrieveProviders();
  }
  retrieveProviders(): void {
    this.reagentService.getAll().subscribe({
      next: (data) => {
        this.reagents = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
