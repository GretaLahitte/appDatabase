import { RouterModule, Routes } from '@angular/router';

import {SchemasComponent} from "./schemas/schemas";


export const appRoutes: Routes = [
  { path: 'schemas',      component: SchemasComponent },
  { path: '',
    redirectTo: '/schemas',
    pathMatch: 'full'
  },
  { path: '**', component: SchemasComponent }
];;