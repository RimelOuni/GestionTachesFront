import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/classes/tache';
import { TacheService } from 'src/app/services/tache.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  taches: Tache[] = [];
  showAddForm = false;
  newTache: Tache = { _id:'', titre: '', description: '', etat: false, date: new Date() };
  editingTache: Tache | null = null;

  constructor(private tacheService: TacheService) { }

  ngOnInit(): void {
    this.loadTaches();
  }

  loadTaches(): void {
    this.tacheService.getAll().subscribe(taches => {
      this.taches = taches;
    });
  }

  addTache(): void {
    this.showAddForm = true;
  }

  onSubmit(): void {
    if (this.editingTache) {
      // Appel à la méthode de modification de la tâche
      this.updateTache();
    } else {
      // Appel à la méthode d'ajout de la tâche
      this.tacheService.AddTache(this.newTache).subscribe(() => {
        this.loadTaches();
        this.resetForm();
      });
    }
  }
  deleteTache(tacheId: string): void {
    this.tacheService.deleteTache(tacheId).subscribe(() => {
      this.loadTaches();
    });
  }
  updateEtatTache(tache: Tache): void {
    this.tacheService.updateEtatTache(tache._id, tache.etat).subscribe(() => {
  
      this.loadTaches();
    });
  }
  
  
   
    showEditDialog(tache: Tache): void {
      // Affecter la tâche à éditer
      this.editingTache = tache;
      
      // Pré-remplir le formulaire avec les informations de la tâche à éditer
      this.newTache = { ...tache };
  
      // Afficher le formulaire d'ajout/modification
      this.showAddForm = true;
    }
    updateTache(): void {
      // Appeler la méthode de modification dans le service
      this.tacheService.updateTache(this.editingTache?._id, this.newTache).subscribe(() => {
        // Recharger la liste des tâches après la modification
        this.loadTaches();
  
        // Réinitialiser le formulaire
        this.resetForm();
      });
    }

    resetForm(): void {
      this.showAddForm = false;
      this.newTache = {_id:'', titre: '', description: '', etat: false, date: new Date() };
      this.editingTache = null; // Assurez-vous de réinitialiser également la tâche en cours d'édition
    }



    printTaskList(): void {
      // Ouvrir une nouvelle fenêtre pour l'impression
      const printWindow = window.open('', '_blank');
    
      if (printWindow) { // Vérifier si la fenêtre est non nulle
        // Construire le contenu HTML pour l'impression
        const printContent = `
          <html>
            <head>
              <title>Liste des Tâches</title>
              <style>
                /* Ajoutez ici vos styles d'impression */
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
    
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                }
    
                th {
                  background-color: #f2f2f2;
                }
    
                .completed {
                  text-decoration: line-through;
                  color: #777;
                }
              </style>
            </head>
            <body>
              <h1>Liste des Tâches</h1>
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>État</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.generatePrintableRows()}
                </tbody>
              </table>
            </body>
          </html>
        `;
    
        // Écrire le contenu HTML dans la nouvelle fenêtre
        printWindow.document.write(printContent);
    
        // Fermer le document après l'impression
        printWindow.document.close();
    
        // Lancer le processus d'impression
        printWindow.print();
      } else {
        console.error("La fenêtre d'impression est null.");
      }
    }
    
    
    generatePrintableRows(): string {
      // Générer les lignes du tableau pour l'impression
      return this.taches.map(tache => `
        <tr>
          <td>${tache.titre}</td>
          <td>${tache.description}</td>
          <td>${tache.date}</td>
          <td class="${tache.etat ? 'completed' : ''}">${tache.etat ? 'Terminée' : 'En cours'}</td>
        </tr>
      `).join('');
    }
    

}
