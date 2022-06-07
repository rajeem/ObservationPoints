import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PointModel } from '../point-model.model';

@Component({
  selector: 'app-observation-detail',
  templateUrl: './observation-detail.component.html',
  styleUrls: ['./observation-detail.component.css']
})
export class ObservationDetailComponent implements OnInit {
  @Input() activePoint: PointModel = new PointModel(0, 0);
  @Output() onNotify = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    console.log('ngOnInit');
  }

  ngOnInit(): void {
  }

  inputFileChanged(target: EventTarget | null): void {
    if (target) {
      let inputElement = (target as HTMLInputElement);
      let file = inputElement.files![0];
      this.addImage(file);
      inputElement.value = "";
    }
  }

  addImage(file: File) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        let resultString = (reader.result as string);
        this.activePoint.images.push(resultString);
      }
    };
  }

  submit(): void {
    if (this.valid()) {
      this.http.post<any>('https://observationpointapi20220608040642.azurewebsites.net/observationpoints',
        {
          name: this.activePoint.name,
          x: this.activePoint.x,
          y: this.activePoint.y,
          crackLength: this.activePoint.crackLength,
          images: this.activePoint.images
        }).subscribe(data => {
          window.alert('Observation Point Saved');
          this.reset();
          this.onNotify.emit("save");
        })
    }
  }

  valid(): boolean {
    return name !== null && this.activePoint.name.trim() !== '' && this.activePoint.crackLength >= 0 && this.activePoint.images.length > 0;
  }

  cancel(): void {
    this.reset();
    this.onNotify.emit("cancel");
  }

  private reset() {
    this.activePoint.crackLength = 0;
    this.activePoint.x = 0;
    this.activePoint.y = 0;
    this.activePoint.visible = false;
    this.activePoint.name = "";
    this.activePoint.images = [];
  }
}
