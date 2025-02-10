import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar</h5>
  <input type="text" class="form-control"
  (keyup.enter)="searchTag()" #txtTagInput
  placeholder="Buscar gift">
  `,
  styleUrl: './search-box.component.css',
  standalone: false
})
export class SearchBoxComponent {

  //? Con el signo de '!' le decimos a ts que siempre tendra un valor
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifService) {

  }

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;
    this.gifService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
