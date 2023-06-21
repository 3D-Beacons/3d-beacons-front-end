import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SequenceService } from './sequence.service';
import { Hit } from './search-result.model';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent implements OnInit {

  private sub: any;
  job_id: string;
  message: string = null;
  searching: boolean = false;
  resultData: Hit[] = null;
  tableSource: MatTableDataSource<Hit> = new MatTableDataSource<Hit>();
  displayedColumns: string[] = ['accession', 'id', 'description', 'struct_count', 'hsp_align_length', 'hsp_identity'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private sequenceService: SequenceService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.job_id = params.id;

      this.sequenceService.getSequenceSearchResult(this.job_id).subscribe(
        response => {
          let message = response.message;

          if (message && message.startsWith("Search in progress")) {
            this.message = "Search in progress, please check back later";
            this.titleService.setTitle("Search in progress");
            this.searching = true;
            setTimeout(() => {window.location.reload();}, 30000);
          } else {
            this.searching = false;
            this.titleService.setTitle("3D-Beacons");
            this.resultData = response;
            this.tableSource = new MatTableDataSource(this.resultData);
            this.tableSource.paginator = this.paginator;
          }
        },
        err => {
          this.searching = false;
          this.message = "No results found for this sequence!";
        }
      );

    });
  }


}
