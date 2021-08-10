import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CLIENT_ID, CLIENT_SECRET } from '../credentials/GithubCred';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient: HttpClient) { }


  //for github profile
  public getProfile(searchQuery:string):Observable<any>{
    let dataURL = `https://api.github.com/users/${searchQuery}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    return this.httpClient.get<any>(dataURL).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  




  //for github repos
  public getRepos(searchQuery: string):Observable<any[]>{
    let dataURL = `https://api.github.com/users/${searchQuery}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    return this.httpClient.get<any[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleErrors)
    )
    
  }


  
  //for handling errors
  public handleErrors(error: HttpErrorResponse){
    let errorMessage: string = "";
    if(error.error instanceof ErrorEvent){
      //client side error
      errorMessage = `MESSAGE : ${error.error.message}`;
    }
    else{
      //server side error
      errorMessage = `STATUS : ${error.status} MESSAGE: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}




