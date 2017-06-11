import { RouterModule, Routes } from '@angular/router';

import {SchemasComponent} from "./schemas/schemas";


export const appRoutes: Routes = [
  { path: '',
    redirectTo: '/schemas',
    pathMatch: 'full'
  },
  { path: 'schemas',      component: SchemasComponent },
  { path: 'test', loadChildren: 'app/test/test.module#TestModule' },
  
  
  { path: '**', component: SchemasComponent }
];