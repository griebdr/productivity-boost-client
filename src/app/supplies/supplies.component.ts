import { Component, OnInit, ViewChild } from '@angular/core';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';
import { TableOptions } from 'gdr-data-table';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent implements OnInit {
  supplies: Promise<object[]>;
  options = new TableOptions();

  constructor(private crudService: CrudService) {
    this.supplies = this.crudService.find('supply')
      .pipe(
        map(supplies => Lodash.sortBy(supplies, ['name']))
      ).toPromise();
  }

  ngOnInit() {
    this.options.columnTypes = [
      { name: 'name', type: 'Text' },
      { name: 'quantity', type: 'Number' }
    ];
  }

  onModification(modification: any) {
    this.crudService.modify('supply', modification).then(result => console.log(result));
  }

}
