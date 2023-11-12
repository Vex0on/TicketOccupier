import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { SpotHistoryComponent } from './spot-history/spot-history.component';

export const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'history/:id', component: SpotHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
