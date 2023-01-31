import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from './stock';
import { StockDetail } from './stockDetail';

export type SortColumn = keyof Stock | '';
export type SortColumn2 = keyof StockDetail | '';
export type SortDirection = 'asc' | 'desc';

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: 'asc',
};

export const compare = (
  v1: string | number | boolean | Date,
  v2: string | number | boolean | Date
) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);


export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
export interface sortEventT2 {
  column: SortColumn2;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable],th[sortable2]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class SortableHeaderDirective {
  @Input() sortable: SortColumn = '';
  @Input() sortable2: SortColumn2 = '';
  @Input() direction: SortDirection = 'asc';
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() sortT2 = new EventEmitter<sortEventT2>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
    this.sortT2.emit({ column: this.sortable2, direction: this.direction });
  }
}
