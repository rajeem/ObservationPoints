export class PointModel {
    x: number = 0;
    y: number = 0;
    name: string = "";
    crackLength: number = 0;
    saved: boolean = false;
    images: Array<string> = [];
    visible: boolean = false;
    editable: boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
