// ```
// recipes.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// expense.component.js may be freely distributed under the MIT license
// ```

// # Expense Component

import {Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {ProjectService} from './project.service';
import {UsersService} from '../user/users.service';
import {Project} from './project.store';
import {AppStore} from '../app.store';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'project-detail',
  template: require('./project-details.html'),
})
export class ProjectDetails implements OnInit{
  originalTitle: string;
  currentDate: string;
  selectedProject: Project;
  userName: string;
  user: any;
  // Assign our `recipe` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
  // which we will use to bind our form to
  setProject = (value) => {
      if (value) this.originalTitle = value.name;
      this.selectedProject = Object.assign({user: this.userName
                                            }, value);
      // DEBUG
      console.log('this.selectedProject: ');
      console.log(this.selectedProject);
  }

  @Input('project') set _project(value: Project) {
      this.setProject(value);

      this.usersService
          .getCurrentUser()
          .subscribe(
            success => {
                this.user.userName = success.json().username;
            },
            error =>  {
                console.log(<any>error.text());
            }
          );
  }

  // Allow the user to save/delete a `recipe or cancel the
  // operation. Flow events up from here.
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor(private usersService: UsersService) {
      this.user = {};
      this.currentDate = new Date().toISOString().slice(0, 10);
  }
  onInit(){
      this.cancelled.emit(this.selectedProject);
  }

  ngOnInit(){
     this.getCureentUser().subscribe(
         success => this.userName = success.json().username,
         error =>  console.log(<any>error.text())
     );
  }

  getCureentUser() {
      return this.usersService
          .getCurrentUser();
  }
  // Whenever the user needs to add a new `tag`, push an
  // empty `tag` object to the `tags` array on the
  // `selectedRecipe`
  newTag() {
    // blank `tag` object
    let tag = {
      name: ''
    };

    // Check to see if the `tags` array exists before
    // attempting to push a `tag` to it
    if (!this.selectedProject.tags)
      this.selectedProject.tags = [];

    this.selectedProject.tags.push(tag);
  }

  deleteTag(tag) {
    // loop through all of the `tags` in the `selectedRecipe`
    for (let i = 0; i < this.selectedProject.tags.length; i++) {
      // if the `tag` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedProject.tags[i] === tag) {
        // delete the `tag` at the current index
        this.selectedProject.tags.splice(i, 1);
      }
    }
  }
}
