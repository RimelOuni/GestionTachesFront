import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/classes/tache';
import { Subscription } from 'rxjs';
import { TacheService } from 'src/app/services/tache.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  public totalTasks: number = 0;
  public completedTasks: number = 0;
  public tasksSubscription!: Subscription;

  constructor(private taskService: TacheService) { }

  ngOnInit(): void {
    // Utilisez votre service de gestion des tâches pour obtenir des informations
    this.tasksSubscription = this.taskService.getAll().subscribe(
      (tasks: Tache[]) => {
        this.totalTasks = tasks.length;
        this.completedTasks = tasks.filter(task => task.etat==true).length;
      },
      error => {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    );
  }


}
