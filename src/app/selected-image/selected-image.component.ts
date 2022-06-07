import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PointModel } from '../point-model.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-selected-image',
  templateUrl: './selected-image.component.html',
  styleUrls: ['./selected-image.component.css']
})
export class SelectedImageComponent implements OnInit {
  activePoint: PointModel = new PointModel(0, 0);
  points: Array<PointModel> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPoints();
  }

  clicked(event: MouseEvent): void {
    this.removeUnsavedPoints();
    this.activePoint = new PointModel(0, 0);
    this.activePoint.x = event.pageX;
    this.activePoint.y = event.pageY;
    this.activePoint.visible = true;
    this.activePoint.editable = true;
    this.points?.push(this.activePoint)
  }

  private removeUnsavedPoints(): void {
    this.points = this.points.filter(x => x.saved);
  }

  onChildNotify(msg: string): void {
    if (msg == 'save') {
      this.loadPoints();
    }
    this.removeUnsavedPoints();
    this.activePoint = new PointModel(0, 0);
    console.log(msg);
  }

  loadPoints() {
    this.http.get<any>('https://observationpointapi20220608040642.azurewebsites.net/observationpoints')
      .subscribe(data => {
        this.points = data.map((obj: any) => { 
          let point = new PointModel(obj.x, obj.y);
          point.crackLength = obj.crackLength;
          point.saved = true;
          point.x = obj.x;
          point.y = obj.y;
          point.name = obj.name;
          point.images = obj.images.map((img: any) => { return img.imageData; })
          return point;
        });
      });
  }

  showPointDetail(event: MouseEvent, point: PointModel) {
    event.stopPropagation();
    this.removeUnsavedPoints();
    this.activePoint = point;
    this.activePoint.visible = true;
    this.activePoint.editable = false;
  }
}
