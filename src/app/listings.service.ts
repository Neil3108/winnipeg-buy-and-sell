import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing } from './types';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(
    private http: HttpClient
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('https://buy-and-sell-backend-mongodb.onrender.com/api/listings');
  }

  getListingById(id: string): Observable<Listing>{
    return this.http.get<Listing>(`https://buy-and-sell-backend-mongodb.onrender.com/api/listings/${id}`);
  }

  addViewToListing(id: string): Observable<Listing>{
    return this.http.post<Listing>(`https://buy-and-sell-backend-mongodb.onrender.com/api/listings/${id}/add-view`,
    {},
    httpOptions)
  }

  getListingForUser(): Observable<Listing[]>{
    return this.http.get<Listing[]>(`https://buy-and-sell-backend-mongodb.onrender.com/api/listings/user/12345`)
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete<any>(`https://buy-and-sell-backend-mongodb.onrender.com/api/edit-listing/${id}`)
  }

  createListing(name: string, description: string, price: number): Observable<Listing>{
    return this.http.post<Listing>(
      'https://buy-and-sell-backend-mongodb.onrender.com/api/new-listing',
      {name, description, price},
      httpOptions,
    );
  }

  editListing(id: string, name: string, description: string, price: number): Observable<Listing>{
    return this.http.patch<Listing>(
      `https://buy-and-sell-backend-mongodb.onrender.com/api/edit-listing/${id}`,
      {name, description, price},
      httpOptions,
    );
  }
}