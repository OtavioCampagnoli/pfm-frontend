import { Injectable } from '@angular/core';
import { Classifier } from '../model/classifier.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ClassifierService {

  constructor(private http: HttpClient) { }

  listAll(): Observable<Classifier[]> {
    return this.http.get<Classifier[]>(`${environment.apiURL}/classifier/listAll`);
  }

  getById(id: number): Observable<Classifier> {
    return this.http.get<Classifier>(`${environment.apiURL}/classifier/${id}`);
  }

  search(classifier: Classifier): Observable<Classifier[]> {
    return this.http.post<Classifier[]>(`${environment.apiURL}/classifier/search`, classifier);
  }

  listAllByType(type: string): Observable<Classifier[]> {
    let params = new HttpParams();
    params = params.append("type", type);
    return this.http.get<Classifier[]>(`${environment.apiURL}/classifier/listAllByType`, { params: params } );
  }

  save(classifier: Classifier): Observable<Classifier> {
    return this.http.post<Classifier>(`${environment.apiURL}/classifier`, classifier);
  }

  update(classifier: Classifier): Observable<Classifier> {
    return this.http.put<Classifier>(`${environment.apiURL}/classifier`, classifier);
  }

  delete(id?: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${environment.apiURL}/classifier/${id}`);
  }
}
