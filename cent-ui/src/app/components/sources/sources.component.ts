import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Source } from '../../interfaces/source';
import { SourcesService } from '../../services/sources/sources.service';
import { DialogAddSourceComponent } from '../dialog-add-source/dialog-add-source.component';

@Component({
  selector: 'app-sources',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    CurrencyPipe,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './sources.component.html',
  styleUrl: './sources.component.css',
})
export class SourcesComponent {
  sourcesUah: Source[] = [];
  sourcesUsd: Source[] = [];
  sourcesEur: Source[] = [];
  displayedColumns: string[] = [];

  constructor(
    public dialog: MatDialog,
    private sourcesService: SourcesService
  ) {
    this.displayedColumns = [
      'sources-name',
      'sources-balance',
      'sources-debit',
      'sources-credit',
      'sources-currency',
    ];
  }

  ngOnInit() {
    // this.dataSource = this.ELEMENT_DATA;
    this.sourcesService.getSources().subscribe((sources: any) => {
      console.log('sources', sources);
      this.sourcesUah = [
        ...sources.filter((s: Source) => s.currency === 'UAH'),
      ];
      this.sourcesUsd = [
        ...sources.filter((s: Source) => s.currency === 'USD'),
      ];
      this.sourcesEur = [
        ...sources.filter((s: Source) => s.currency === 'EUR'),
      ];
    });
  }

  getTotal(sources: Source[], prop: string) {
    if (prop === 'balance') {
      return sources
        .map((s: any) => s.balance)
        .reduce((acc, value) => acc + value, 0);
    }

    return sources
      .map((s: any) => s[prop])
      .reduce((acc, value) => acc + value, 0);
  }

  getDebit(source: Source) {
    const diff = source.balance - source.credit;

    if (diff < 0) {
      return 0;
    }

    return diff;
  }

  getTotalDebit(sources: Source[]) {
    return sources.reduce((acc, source) => acc + this.getDebit(source), 0);
  }

  openAddSourceDialog() {
    const dialogRef = this.dialog.open(DialogAddSourceComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
