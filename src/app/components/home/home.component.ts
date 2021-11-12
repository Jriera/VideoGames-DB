import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
sort:string = 'asc';
games:Array<Game> = [];
page:number = 1;
  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;
  constructor(private httpService:HttpService, private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.routeSub=this.activatedRoute.params.subscribe(params => {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      }else{
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort:string, page?:string,search?:string,){
    this.gameSub=this.httpService.getGameList(sort,search).subscribe((gameList:APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(this.games);
    });
  }

  openGameDetails(id:number){
    this.router.navigate(['details',id]);
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.gameSub.unsubscribe();
  }

  onScroll(){
    this.page++;
    const pageParam=this.page.toString();
    this.gameSub=this.httpService.getGameList(this.sort,'',pageParam).subscribe((gameList:APIResponse<Game>) => {
      this.games = this.games.concat(gameList.results);
    });
  }


}


