import {Injectable, NgZone} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {GoogleAuthService} from 'ng-gapi/lib/GoogleAuthService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {Http, RequestOptions} from '@angular/http';



import {
  GoogleApiModule,
  GoogleApiService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from 'ng-gapi';

@Injectable()
export class FileService {
  googleAuth: any;
  private readonly gapiUrl: string = 'https://apis.google.com/js/api.js';
  private readonly SESSION_STORAGE_KEY: string = 'accessToken';
  private CLIENT_ID = '956049352134-lovepdf3k4jo6ceijhlk0tp2hjuce75f.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyDr3nRfMZV9qtelhrzNDEzDtYNDwY1VZIIAIzaSyDr3nRfMZV9qtelhrzNDEzDtYNDwY1VZII';
  private SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  private DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
  private auth2;
  private readonly API_URL: string = 'https://sheets.googleapis.com/v4/spreadsheets';


  constructor(private httpClient: HttpClient, private ngZone: NgZone, private gapiService: GoogleApiService,
    private googleAuthService: GoogleAuthService) {
  }

  signIn() {
    console.log('signIn');
    this.googleAuthService.getAuth().subscribe((auth) => {
      console.log('auth');
      auth.signIn().then(res => this.signInSuccessHandler(res), err => console.log(err));
    });
  }

  private signInSuccessHandler(res) {
    console.log('ngZone');
    this.ngZone.run(() => {
      sessionStorage.setItem(
        this.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
      );
    });
  }

  public save(text) {
    let token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error("no token set , authentication required");
    }
    let authtoken = sessionStorage.getItem(this.SESSION_STORAGE_KEY);

    this.httpClient.post("https://www.googleapis.com/upload/drive/v3/files", text, {headers: new HttpHeaders({
      'Content-Type': 'text/xml',
      'Authorization': 'Bearer ' + authtoken,
      'name': 'test.xml'
    })}).subscribe(res => console.log(res));;
  }

  public saveToFile(id, text) {
    id = '1LAgksHdsjZ9qEKiiFsjgPcVsj6ytZbNM'; //TODO

    let token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error("no token set , authentication required");
    }
    let authtoken = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    this.httpClient.patch("https://www.googleapis.com/upload/drive/v3/files/" + id, text, {headers: new HttpHeaders({
      'Content-Type': 'text/xml',
      'id': id,
      'Authorization': 'Bearer ' + authtoken,
    })}).subscribe(res => console.log(res));;


  }
  
    public open(id) {
    let token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error("no token set , authentication required");
    }
    let authtoken = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    this.httpClient.get("https://www.googleapis.com/drive/v3/files/" + id + "/export", {headers: new HttpHeaders({
      'mimeType': 'text/xml',
      'Authorization': 'Bearer ' + authtoken,
    })}).subscribe(res => console.log(res));;

      

  }

}
