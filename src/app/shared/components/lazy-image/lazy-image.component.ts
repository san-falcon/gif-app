import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'share-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css',
  standalone: false
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt!: string;

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('Method not implemented.');
  }

  onLoad(): void {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1500);
  }

}
