import { Component } from '@angular/core';
import { GifService } from '../../../gifs/services/gif.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: false
})
export class SidebarComponent {

  constructor(private gifService: GifService) {
  }

  get listTags(): string[] {
    return this.gifService.tagsHistory;
  }

  searchTag(tag: string) {
    this.gifService.searchTag(tag);
  }
}
