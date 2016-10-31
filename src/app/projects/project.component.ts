// ```
// expenses.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.component.js may be freely distributed under the MIT license
// ```

// # Expenses Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppStore} from '../app.store';

import {Project} from './project.store';
import {ProjectService} from './project.service';
import {UsersService} from '../user/users.service';
import {ProjectDetails} from './project-details.component';
import {ProjectList} from './project-list.component';

@Component({
  selector: 'Projects',
  providers: [],
  template: require('./project.html'),
  directives: [ProjectList, ProjectDetails],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Projects {
  userName: string;
  userId: string;
  projects: Observable<Array<Project>>;
  statusMessage: String;

  selectedProject: Observable<Project>;

  constructor(private projectService: ProjectService,
              private store: Store<AppStore>,
              private usersService: UsersService
            ) {

    // Bind to the `recipes` observable on `RecipeService`
    this.projects = projectService.projects;

    // Bind the `selectedRecipe` observable from the store
    this.selectedProject = store.select('selectedProject');

    // DEBUG
    this.selectedProject.subscribe(v => console.log(v));

    this.getCureentUser();

    // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event
    // to our store which in turn updates the `recipes` collection
    projectService.loadProjects();
  }

  getCureentUser() {
      this.usersService
          .getCurrentUser()
          .subscribe(
            success => {
                        this.userName = success.json().username;
                        this.userId = success.json()._id;
                    },
            error =>  console.log(<any>error.text())
          );
  }

  selectProject(project: Project) {

    this.store.dispatch({
      type: 'SELECT_PROJECT',
      payload: project
    });
  }

  deleteProject(project: Project) {

    this.projectService.deleteProject(project);
  }

  resetProject() {
    let emptyProject: Project = {
        _id: null,
        tags: [],
        name: null,
        description: '',
        pictures: null,
        user: this.userId
    };

    this.store.dispatch({
      type: 'SELECT_PROJECT',
      payload: emptyProject
    });
  }

  saveProject(project: Project) {
    project.user = this.userId;
    this.projectService.saveProject(project);
    this.resetProject();
  }

  checkIsUserLogged() {

  }
}
