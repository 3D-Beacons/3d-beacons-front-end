import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SequenceService } from './sequence.service';
import { Hit, SearchResult } from './search-result.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent implements OnInit {

  private sub: any;
  job_id: string;
  error: string = null;
  waiting: boolean = false;
  resultData: Hit[] = null;
  tableSource: MatTableDataSource<Hit> = new MatTableDataSource<Hit>();
  displayedColumns: string[] = ['accession', 'id', 'description', 'struct_count', 'hsp_align_length', 'hsp_identity'];
  isFetching: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private sequenceService: SequenceService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.job_id = params.id;

      this.sequenceService.getSequenceSearchResult(this.job_id).subscribe(
        response => {
          let message = response.message;

          if (message && message.startsWith("Search in progress")) {
            this.error = message;
            this.waiting = true;
            this.handleError(message);
          } else {
            console.log(response);
            this.waiting = false;
            this.resultData = response;
            this.tableSource = new MatTableDataSource(this.resultData);
            this.tableSource.paginator = this.paginator;
            this.isFetching = false;
          }
        },
        err => {
          this.handleError("No results found for this sequence!");
        }
      );

    });
  }

  handleError(message: string) {
    this.resultData = null;
    this.isFetching = false;
    this.error = message;
  }


}
