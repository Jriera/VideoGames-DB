import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game, Screenshot, Trailer } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {
gameRating:number = 0;
gameId:number = 1;
game:Game={
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
  id:this.gameId
}

routeSub:Subscription = new Subscription();
gameSub:Subscription = new Subscription();
imageSub:Subscription = new Subscription();
trailerSub:Subscription = new Subscription();
gottenScreenshots:Screenshot[] = [];
gottenTrailers:Trailer[] = [];

  constructor(private activatedRoute:ActivatedRoute,private httpService:HttpService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.gameId = params.id;
      this.getGameDetails(this.gameId);
      this.getGameScreenshots(this.gameId);
      this.getGameTrailers(this.gameId);
      
    })
  }

  getGameDetails(id:number){
    this.gameSub = this.httpService.getGameDetails(id).subscribe((gameRes:Game) => {
      this.game={
        ...gameRes,
        short_screenshots:this.gottenScreenshots,
        trailera:this.gottenTrailers
      }
      console.log(this.game);
      
      setTimeout(() => {
        this.gameRating=this.game.metacritic;
      } , 1000);
    })
  }

   


  getColor(value:number):string{
    if(value > 75){
      return '#5ee432';
    }
    else if(value > 50){
      return '#fffa50';
    }
    else if(value > 30){
      return '#f7aa38';
    }else{
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.gameSub.unsubscribe();
    this.imageSub.unsubscribe();
    
  }

  getGameScreenshots  (id:number){
    this.imageSub = this.httpService.getGameScreenshots(id).subscribe((imageRes:any) => {
      this.gottenScreenshots=  imageRes.results;
      console.log(this.game.short_screenshots);
    });
  }

  getGameTrailers  (id:number){
    this.trailerSub = this.httpService.getGameTrailers(id).subscribe((trailerRes:any) => {
      this.gottenTrailers=  trailerRes.results;
      console.log(this.game.trailera);
    });
  }



}
