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
import {ProjectList} from './project-list.component';

@Component({
  selector: 'projects-preview',
  providers: [],
  template: require('./project-preview.html'),
  directives: [ProjectList],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectsPreview {
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

    // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event
    // to our store which in turn updates the `recipes` collection
    projectService.loadProjects();
  }

}
