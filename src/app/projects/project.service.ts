// ```
// recipe.service.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe.service.js may be freely distributed under the MIT license
// ```

// # Recipe Service

import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Project} from './project.store';
import {AppStore} from '../app.store';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ProjectService {

  projects: Observable<Array<Project>>;

  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http, private store: Store<AppStore>) {

    // Bind an observable of our `expenses` to `ExpenseService`
    // Since this is essentially a `key, value` system, we can
    // set our `recipes` by calling `store.select('recipes')`
    this.projects = store.select('projects');
  }

  loadProjects() {

        this.http.get('/api/project')
            // map the `HTTP` response from `raw` to `JSON` format
            // using `RxJs`
            // Reference: https://github.com/Reactive-Extensions/RxJS
            .map(res => res.json())
            // call `map` again to create the object we want to dispatch
            // to our reducer
            // This combo of `map` method calls is an observable sequence
            // in that every result gets passed through this sequence of
            // operations
            .map(payload => ({ type: 'ADD_PROJECT', payload }))
            // Subscribe to this sequence and hand off control to the
            // reducer by dispatching the transformed results
            .subscribe(action => this.store.dispatch(action));
    }

    saveProject(project: Project) {
        (project._id) ? this.updateProject(project) : this.createProject(project);
    }

    createProject(project: Project) {

        this.http.post('/api/project', JSON.stringify(project), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_PROJECT', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateProject(project: Project) {

        this.http.put(`/api/project/${project._id}`, JSON.stringify(project), HEADER)
          // Dispatch action to reducer in subscribe block here
          .subscribe(action => this.store.dispatch({ type: 'UPDATE_PROJECT', payload: project }));
    }

    deleteProject(project: Project) {

        this.http.delete(`/api/project/${project._id}`)
          .subscribe(action => this.store.dispatch({ type: 'DELETE_PROJECT', payload: project }));
    }
}
