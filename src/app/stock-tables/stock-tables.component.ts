import { Component, OnInit} from '@angular/core';
import { Stock } from '../stock';
import { StockDetail } from '../stockDetail';
import { StockService } from '../stock.service';
import stockVals from '../../assets/StockValues.json'
import stocks_ from '../../assets/Stocks.json'
import {
  SortEvent,
  compare,
  sortEventT2
} from '../sortable-header.directive';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-stock-tables',
  templateUrl: './stock-tables.component.html',
  styleUrls: ['./stock-tables.component.css']
})
export class StockTablesComponent implements OnInit {
  stock: Stock[] = [];
  stockValues: StockDetail[] = stockVals;
  stock_: Stock[] = stocks_;
  selectedStocks: Stock[] = [];
  selectedStockValues: StockDetail[] = []
  stockHeading: string = '';
  searchQuery = '';
  searchResults: Stock[] = [];
  sortedData: Stock[] = [];
  searchMessage: string = "";

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getStocks();
  }
  onSort({ column, direction }: SortEvent) {
    let el= document.getElementById("searchQuery") as HTMLInputElement;
    el.value="";

    if (column === '') {
      this.stock = this.stock_
    } else {
      this.stock = [...this.stock_].sort((a, b) => {
        const res = compare(a[column].toString(), b[column].toString());
        return direction === 'asc' ? res : -res;
      });
    }
  }
  sortData({ column, direction }: sortEventT2) {
    if (column === '') {
      this.selectedStockValues = this.stockValues;

    } else {
      this.selectedStockValues = [...this.stockValues].sort((a, b )=> {
        const res = compare(a[column].toString(), b[column].toString());
        return direction === 'asc' ? res : -res;
      });
    }
  }

  getStocks(): void {
    this.stockService.getAllStocks()
      .subscribe(stock => this.stock = stock);
  }
  getStocksDetails(): void {
    this.stockService.getAllStockdetail()
      .subscribe(stockValue => this.stockValues = stockValue);
  }

  exportAsJson() {
    const fileName = this.stockHeading + '.json'
    let exportData = this.selectedStockValues;
    return saveAs(
      new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON' }), fileName
    );

  }

  selectHandler(row: Stock) {
    this.fillSecondTable(row.id);
    this.getheading(row.stock.toString());
  }
  getheading(heading: string) {
    return this.stockHeading = heading.toLocaleUpperCase()
  }
  fillSecondTable(id: Number) {
    console.log(
      this.selectedStockValues = this.stockValues.filter(x => x.stock_id === id));
  }
  search(event: any) {
    this.searchQuery = event.target.value;
    if (this.searchQuery !== "") {
      this.searchResults = this.stock.filter(
        (x) => x && x.stock.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      );
      this.stock = this.searchResults;
      this.searchMessage = this.searchResults.length == 0 ? 'Could not find any data based on your search, please try again...' : '';
    } else {
      this.getStocks()
    }
  }

}
