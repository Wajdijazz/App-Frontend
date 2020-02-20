import {Component, OnInit} from '@angular/core';
import {PersonService} from '../services/person.service';
import {ProjectService} from '../services/project.service';
import {Project} from '../entities/project';
import {Person} from '../entities/person';
import {Intervention} from '../entities/intervention';
import {InterventionService} from '../services/intervention.service';
import {DetailsComponent} from '../details/details.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
    selector: 'app-interventions',
    templateUrl: './interventions.component.html',
    styleUrls: ['./interventions.component.scss']
})


export class InterventionsComponent implements OnInit {
    interventions: Intervention[];
    newArr = [];
    persons: Person[];
    projects: Project [];
    intervention: Intervention = {
        interventionId: null,
        date: null,
        person: null,
        project: null,
        mode: null,
        startDate: null,
        endDate: null,
    }
    project: Project = {
        projectId: null,
        projectName: '',
        clientId: null,
        managerId:null
    }
    person: Person = {
        personId: null,
        firstName: '',
        lastName: '',
        managerId: null
    }
    personId;
    projectId;
    private listInterventions: void;

    constructor(public dialog: MatDialog, private personService: PersonService,
                private projectService: ProjectService,
                private interventionService: InterventionService) {
    }

    ngOnInit() {
        this.getAllPersons();
        this.getAllProject();
        this.getAllInterventions();
    }

    getAllInterventions() {
        this.interventionService.getInterventions().subscribe((data: Intervention[]) => {
            this.interventions = data;
            this.interventions.forEach((item, index) => {
                if (this.newArr.findIndex(i => i.person.personId == item.person.personId
                    && i.project.projectId == item.project.projectId) === -1) {
                    this.newArr.push(item);
                }
            });
        })

    }

    getAllPersons() {
        this.personService.getPersons().subscribe((data: Person[]) => {
            this.persons = data;
        })
    }

    getAllProject() {
        this.projectService.getProjects().subscribe((data: Project[]) => {
            this.projects = data;
        })
    }

    selectProject(projectId) {
        this.projectId = projectId;
    }

    selectPerson(personId) {
        this.personId = personId;
        console.log(personId);
    }

    addIntervention(data: Intervention) {
        this.listInterventions = this.getAllInterventions()
        this.interventionService.saveIntervention(data, this.projectId, this.personId);
        window.location.reload();
    }

    deletIntervention(personId, projectId) {
        this.interventionService.deleteIntervention(personId, projectId);
        window.location.reload();
    }

    /**
     * Cette focntion permet d'ouvrire un poup et afficher les detaills de l'intervention dans le composant details
     * @param intervention
     */
    openDialog(intervention): void {
        let dialogRef = this.dialog.open(DetailsComponent, {
            width: '900px',
            data: {person: intervention.person, project: intervention.project}
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
