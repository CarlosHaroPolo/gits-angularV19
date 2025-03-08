import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GifsService } from '../../../services/gifs.service';
// vamos a crear una interface
interface MenuOption {
  label: string,
  subLabel: string,
  route: string,
  icon: string
}
@Component({
  selector: 'gits-side-menu-options',
  imports: [RouterLink],
  templateUrl: './side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptionsComponent {

/*   searhHistoryKeys
 */

gitService = inject(GifsService);

  menuOption: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route:'/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route:'/dashboard/search'
    },
  ];


}
