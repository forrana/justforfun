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

@Component({
  selector: 'gallery-preview',
  providers: [GalleryService],
  template: require('./gallery-preview.html'),
  directives: [GalleryList],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GalleryPreview {
  userName: string;
  userId: string;
  galleries: Observable<Array<any>>;

  constructor(private galleryService: GalleryService,
              private store: Store<AppStore>,
              private usersService: UsersService
            ) {

    this.galleries = galleryService.loadGallerys()
                        .map(res => res.json());
  }
}
