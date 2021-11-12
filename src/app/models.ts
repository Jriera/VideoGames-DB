export interface Game{
    background_image: string;
    name:string;
    released:string;
    metacritic_url:string;
    website:string;
    description:string;
    metacritic:number;
    genres:Array<Genre>;
    parent_platforms:Array<ParentPlatform>;
    publishers:Array<Publisher>;
    ratings:Array<Rating>;
    short_screenshots:Array<Screenshot>;
    trailera:Array<Trailer>;
    id:number;
}

export interface APIResponse<T>{
    results : Array<T>;
}

interface Genre{
    name:string;
}

interface ParentPlatform{
    platform:{
        name:string;
        id:number;
        slug:string;
    }
}

interface Publisher{
    name:string;
}


interface Rating {
    id: number;
    count: number;
    title: string;
  }
  
 export interface Screenshot {
      id:number;
    image: string;
    widht:number;
    height:number;
    is_deleted:boolean;
  }
  
  export interface Trailer {
    data: {
      max: string;
    };

}

export interface ScreenshotResponse{
    results:Array<Screenshot>;
    count:number;

}

export interface TrailerResponse{
    results:Array<Trailer>;
    count:number;

}


