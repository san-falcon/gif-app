import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: false
})
export class GifCardComponent implements OnInit {

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif property is required');
  }
}
