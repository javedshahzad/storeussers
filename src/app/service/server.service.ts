import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  //put /api/store/ after your url e.g https://www.abc.com/api/store/
  url = "https://dema.qa/portal/api/";


  constructor(private http: HttpClient) { }
  FBconfigApp() {
    firebase.initializeApp(environment.firebaseConfig);
  }
  plan()
  {
    return this.http.get(this.url+'plan')
             .pipe(map(results => results));
  }

  login(data)
  {
    return this.http.post(this.url+'login',data)
             .pipe(map(results => results));
  }

  signup(data)
  {
    return this.http.post(this.url+'signup',data)
             .pipe(map(results => results));
  }

  homepage(id,status)
  {
    return this.http.get(this.url+'homepage?id='+id+'&lid='+localStorage.getItem('lid')+'&status='+status)
             .pipe(map(results => results));
  }

  lang()
  {
    return this.http.get(this.url+'lang')
             .pipe(map(results => results));
  }

  getDboy(id)
  {
    return this.http.get(this.url+'getDboy?id='+id)
             .pipe(map(results => results));
  }

  userInfo(id)
  {
    return this.http.get(this.url+'userInfo/'+id)
             .pipe(map(results => results));
  }

  updateInfo(data)
  {
    return this.http.post(this.url+'updateInfo?user_id='+localStorage.getItem('user_id'),data)
             .pipe(map(results => results));
  }

  upLocation(data)
  {
    return this.http.post(this.url+'updateLocation',data)
             .pipe(map(results => results));
  }

  forgot(data)
  {
    return this.http.post(this.url+'forgot',data)
             .pipe(map(results => results));
  }

  getCount(id)
  {
    return this.http.get(this.url+'getCount?id='+id)
             .pipe(map(results => results));
  }

  verify(data)
  {
    return this.http.post(this.url+'verify',data)
             .pipe(map(results => results));
  }

  updatePassword(data)
  {
    return this.http.post(this.url+'updatePassword',data)
             .pipe(map(results => results));
  }

  storeOpen(type)
  {
    return this.http.get(this.url+'storeOpen/'+type)
             .pipe(map(results => results));
  }

  orderProcess(id,status)
  {
    return this.http.get(this.url+'orderProcess?id='+id+'&status='+status)
             .pipe(map(results => results));
  }

  getItem(id)
  {
    return this.http.get(this.url+'getItem?store_id='+id+'&lid='+localStorage.getItem('lid')+'&for_store=true')
             .pipe(map(results => results));
  }

  changeStatus(id,status)
  {
    return this.http.get(this.url+'changeStatus?id='+id+'&status='+status)
             .pipe(map(results => results));
  }

  editItem(data)
  {
    return this.http.post(this.url+'editItem',data)
             .pipe(map(results => results));
  }

  getLang(id)
  {
    return this.http.get(this.url+'getLang?lang_id='+id)
             .pipe(map(results => results));
  }

   page()
  {
    return this.http.get(this.url+'page?lid='+localStorage.getItem('lid'))
             .pipe(map(results => results));
  }
}
