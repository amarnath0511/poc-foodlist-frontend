import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, sample } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/tag';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  // .set('Access-Control-Allow-Headers',
  //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

@Injectable({
  providedIn: 'root',
})

export class FoodService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL, { 'headers': headers });
  }
  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm, { 'headers': headers })
  }
  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL, { 'headers': headers });
  }
  getAllFoodsByTag(tag:string): Observable<Food[]>{
    return tag == "All"?
    this.getAll():
    this.http.get<Food[]> (FOODS_BY_TAG_URL + tag, { 'headers': headers });
  }

  getFoodById(foodId:string): Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId, { 'headers': headers });
  }
}
