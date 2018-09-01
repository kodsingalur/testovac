import {Injectable, NgZone} from '@angular/core';
import {GoogleAuthService} from 'ng-gapi/lib/GoogleAuthService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

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
    private googleAuthService: GoogleAuthService, private router: Router) {
  }

  /***
   * Prihlasi na googledisk
   */
  signIn() {
    console.log('signIn');
    return new Promise((resolve, reject) => {
      this.googleAuthService.getAuth().subscribe((auth) => {
        console.log('auth');
        auth.signIn().then(res => this.signInSuccessHandler(res, resolve), (err) => reject(err));
      });
    });
  }

  /***
   * Po prihlaseni nastavi token
   */
  private signInSuccessHandler(res, resolve) {
    console.log('ngZone');

    this.ngZone.run(() => {
      sessionStorage.setItem(this.SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
      resolve();
    });

  }
  /***
   * Ulozi test do souboru s dle id. Pokud neni uzivatel prihlasen, prihlasi jej.
   */
  public signInAndSave(id, text) {
    if (!this.isSignedIn()) {
      this.signIn().then(() =>  {this.saveToFile(id, text); });
    } else {
      this.saveToFile(id, text);
    }
  }

  /***
   * Ulozi test do noveho souboru.
   */
  public save(text) {
    const token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set , authentication required');
    }

    const authtoken = sessionStorage.getItem(this.SESSION_STORAGE_KEY);

    this.httpClient.post('https://www.googleapis.com/upload/drive/v3/files', text, {
      headers: new HttpHeaders({
        'Content-Type': 'text/xml',
        'Authorization': 'Bearer ' + authtoken,
        'name': 'test.xml'
      })
    }).subscribe(res => this.router.navigate(['/' + res['id'] + '/testedit']));
  }

  /***
   * Ulozi test do souboru s dle id.
   */
  public saveToFile(id, text) {
    console.log('id ' + id);
    if (!id) {
      this.save(text);
      return;
    }
    const token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set , authentication required');
    }
    const authtoken = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    this.httpClient.patch('https://www.googleapis.com/upload/drive/v3/files/' + id, text, {
      headers: new HttpHeaders({
        'Content-Type': 'text/xml',
        'id': id,
        'Authorization': 'Bearer ' + authtoken,
      })
    }).subscribe(res => console.log('ID ' + res['id']));


  }
  /***
   * Vraci, zda je uzivatel prihlasen
   */
  public isSignedIn() {
    return this.auth2 && this.auth2.getAuthInstance().isSignedIn;
  }

  /***
   * Nacte test ze souboru dle id. Pokud neni uzivatel prihlasen, prihlasi jej.
   */
  public open(id) {
    return new Promise<string>((resolve, reject) => {
      this.openUnautorized(id).then((content) => resolve(content), () => {
        if (this.isSignedIn()) {
          resolve(this.openSigned(id));
        } else {
          this.signIn().then(res => {resolve(this.openSigned(id)); }, reject);
        }
      });
    });

  }
  /***
   * Nacte test ze souboru dle id
   */
  private openSigned(id) {
    const token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set , authentication required');
    }
    const authtoken = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    return this.httpClient.get('https://www.googleapis.com/drive/v3/files/' + id + '?alt=media', {
      responseType: 'text', headers: new HttpHeaders({
        'mimeType': 'text/xml',
        'Authorization': 'Bearer ' + authtoken,
      })
    }).toPromise();

  }

  /***
   * Nacte test ze souboru dle id bez prihlaseni.
   */
  public openUnautorized(id) {
    return this.httpClient.get('https://cors-anywhere.herokuapp.com/https://drive.google.com/uc?export=' + id, {
      responseType: 'text', headers: new HttpHeaders({
        'mimeType': 'text/xml',
        'Accept': 'text/xml',
      })
    }).toPromise();
  }
}
