import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { truncate } from 'fs';

/*
FONCTIONS PRINCIPALES DE DRAGULA

 - drag(): An item is currently being dragged. In that case we will change the background color

 - removeModel(): An item was dropped, but not inside another group but outside any group.
At that point the item will be removed and we’ll show a little toast.

 - dropModel(): An item was dropped into a new group. We’ll again change the color to reflect
that something happened.

 - createGroup(): This one defines some options for our group, in our case that all items dropped
outside the group should be spilled which means removed.
*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

 public q1 = [
    { value: 'Buy Milk', color: 'primary' },
    { value: 'Write new Post', color: 'primary' }
  ];
 public q2 = [
    { value: 'Schedule newsletter', color: 'secondary' },
    { value: 'Find new Ionic Academy topics', color: 'secondary' }
  ];
 public q3 = [
    { value: 'Improve page performance', color: 'tertiary' },
    { value: 'Clean the house', color: 'tertiary' }
  ];
 public q4 = [
    { value: 'Unimportant things', color: 'warning' },
    { value: 'Watch Netflix', color: 'warning' }
  ];
  public todo = { value: '', color: '' };
  public selectedQuadrant = 'q1';

  constructor(private dragulaService: DragulaService, private toastCtrl: ToastController) {

    this.dragulaService.drag('bag').subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'danger');
    });

    this.dragulaService.removeModel('bag').subscribe(({ item }) => {
      item['color'] = 'success';
      this.toastCtrl
        .create({ message: 'Removed' + item.value, duration: 2000 })
        .then(toast => toast.present());
    });

    this.dragulaService.dropModel('bag').subscribe(({ item }) => {
      item['color'] = 'success';
    });

    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });

  }

addTodo() {
  switch (this.selectedQuadrant) {
    case 'q1':
      this.todo.color = 'primary';
      break;
      case 'q2':
      this.todo.color = 'secondary';
      break;
      case 'q3':
      this.todo.color = 'tertiary';
      break;
      case 'q4':
      this.todo.color = 'warning';
      break;
    default:
      break;
  }

  // transformation d'un objet js en tableau
  this[this.selectedQuadrant].push(this.todo);
  // réinitialisation avec nouvelles données
  this.todo = {value: '', color: ''};
  }

}
