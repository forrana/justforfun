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

import {GalleryService} from './gallery.service';
import {UsersService} from '../user/users.service';
import {GalleryList} from './gallery-list.component';

import {FileUploaderComponent} from '../shared/file-uploader/file-uploader';

import {AppState} from '../app.service';

@Component({
  selector: 'Gallery',
  providers: [GalleryService],
  template: require('./gallery.html'),
  directives: [GalleryList, FileUploaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Gallery {
  userName: string;
  userId: string;
  statusMessage: String;
  galleries: Observable<Array<any>>;

  constructor(private galleryService: GalleryService,
              private store: Store<AppStore>,
              private usersService: UsersService,
              private appState: AppState
            ) {

    this.galleries = galleryService.loadGallerys()
                        .map(res => res.json());

    console.log(this.galleries);
    this.getCureentUser();
  }

  isLoggedIn() {
      return this.appState.get('isLoggedIn');
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
}
