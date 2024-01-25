import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tache } from '../classes/tache';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private url="http://localhost:4000/api/taches"

  constructor(private http: HttpClient) { }
  getAll(): Observable<Tache[]> {
    return this.http.get<Tache[]>('http://localhost:4000/api/taches');
  }
  AddTache(addtacheRequest:Tache){
    
    return this.http.post<Tache>(`${this.url}`,addtacheRequest);
  } 
  deleteTache(tacheId: string): Observable<Tache> {
    const url = `${this.url}/${tacheId}`;
    return this.http.delete<Tache>(url);
  }
  updateTache(tacheId: string | undefined, updatedTache: Tache): Observable<Tache> {
    const url = `${this.url}/${tacheId}`;
    
    // Utilisation de la méthode HTTP PUT pour mettre à jour la tâche
    return this.http.put<Tache>(url, updatedTache);
  }
  updateEtatTache(tacheId: string, etat: boolean): Observable<Tache> {
    const url = `${this.url}/${tacheId}/etat`;
    return this.http.put<Tache>(url, { etat });
  }
  
  
}
