import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `<h1>Reading a file: {{percentDone}}% done</h1>
  `})
export class AppComponent{

  title = 'progressevents';

  mydata: any;
  percentDone: number;


  constructor(private httpClient: HttpClient) {

    this.percentDone = 0;

    const req = new HttpRequest('GET',
      './data/Big-JSON-Data.json', {
        reportProgress: true
      });

    httpClient.request(req)
      .subscribe(data => {
        if (data.type === HttpEventType.DownloadProgress) {
          if (data.total){
            this.percentDone = Math.round(100 * data.loaded / data.total);
            console.log(`Read ${this.percentDone}% of ${data.total} bytes`);
          }
        } else {
          this.mydata = data
        }
      });
  }
}
