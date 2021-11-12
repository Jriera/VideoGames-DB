import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {
@Input() game: Game = {
  background_image: '',
  name: '',
  released: '',
  metacritic_url: '',
  website: '',
  description: '',
  metacritic:0,
  genres:[],
  parent_platforms:[],
  publishers:[],
  ratings:[],
  short_screenshots:[],
  trailera:[],
  id:1
}

  constructor(private http:HttpService) { }

  ngOnInit(): void {
    
  }
  
  


  

}
