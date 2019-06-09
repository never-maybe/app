import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'validacao', loadChildren: './tab1/tab1.module#Tab1PageModule'},
  { path: 'loading', loadChildren: './tab3/tab3.module#Tab3PageModule'},
  { path: 'rejected', loadChildren: './tab4/tab4.module#Tab4PageModule'},
  { path: 'accepted', loadChildren: './tab5/tab5.module#Tab5PageModule'}


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
