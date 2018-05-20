import {Injectable, NgZone} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {GoogleAuthService} from 'ng-gapi/lib/GoogleAuthService';
import {
    GoogleApiModule, 
    GoogleApiService, 
    NgGapiClientConfig, 
    NG_GAPI_CONFIG,
    GoogleApiConfig
} from "ng-gapi";

@Injectable()
export class FileService {
  googleAuth: any;
  private readonly gapiUrl: string = 'https://apis.google.com/js/api.js';
  private readonly SESSION_STORAGE_KEY: string = "accessToken";
  private CLIENT_ID = '956049352134-lovepdf3k4jo6ceijhlk0tp2hjuce75f.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyDr3nRfMZV9qtelhrzNDEzDtYNDwY1VZIIAIzaSyDr3nRfMZV9qtelhrzNDEzDtYNDwY1VZII';
  private SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
  private auth2;


  constructor(private ngZone: NgZone, private gapiService: GoogleApiService, private googleAuthService: GoogleAuthService) {
   // this.loadGapi();
    this.gapiService.onLoad().subscribe(()=>{this.createButton()});
  }
  
  createButton(){
      const node = document.createElement('button');
      node.onclick = this.signIn;
      node.type = 'text/javascript';
     // node.style = 'utf-8';
      document.getElementsByTagName('body')[0].appendChild(node);
      node.onload = () => {
       node.click();
      };

  }
  
  signIn(){
    console.log("signIn");
          this.googleAuthService.getAuth().subscribe((auth) => {
            console.log("auth");
          
            auth.signIn().then(res => this.signInSuccessHandler(res), err => console.log(err));
        });
  }
  private loadGapi() {
    let node = document.createElement('script');
    node.src = this.gapiUrl;
    node.type = 'text/javascript';
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
    node.onload = () => {
      
      const node = document.createElement('button');
      node.onclick = ()=>{
        this.auth();
        //  this.auth2.signIn().then(res => this.signInSuccessHandler(res), (e) => {console.log(e);});
      };
      node.type = 'text/javascript';
     // node.style = 'utf-8';
      document.getElementsByTagName('body')[0].appendChild(node);
      node.onload = () => {
       node.click();
      };

  //    this.auth();
    };
  }

  private auth() {

    window['gapi'].load('auth2', () => {
      this.auth2 = window['gapi'].auth2.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES
      });
      this.signIn();

    });
  }

  public signInS() {
    console.log("Sing in called");
    this.auth2.signIn().then(res => this.signInSuccessHandler(res), (e) => {console.log(e);});
  }

  signinChanged() {
    console.log("Prihlasen");
    this.auth2.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    }).then(function(response) {
      console.log(response.result.files());
    });

  }
    private signInSuccessHandler(res) {
      console.log("ngZone");
        this.ngZone.run(() => {
            sessionStorage.setItem(
                this.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
            );
        });
    }

}
