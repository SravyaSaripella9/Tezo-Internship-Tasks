import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  screenWidth: number = 0;
  mediaType: string = "";

  onResize(): string {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 600) {
      this.mediaType = "Laptop";
    }
    else {
      this.mediaType = "Mobile";
    }
    return this.mediaType;
  }

}
