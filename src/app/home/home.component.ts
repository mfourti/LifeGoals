import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *', [      //any to any (any component to any component)
        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [             // délai entre chaque séquace
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),    // au début 
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),  // au milieu
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),       // la fin de l'animation 
          ]))
        ]), {optional: true}),

        query(':leave', stagger('300ms', [             // délai entre chaque séquace
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),    // au début 
            style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),  // au milieu
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),       // la fin de l'animation 
          ]))
        ]), {optional: true})
      ])
    ])  
  ]
})

export class HomeComponent implements OnInit {

  itemCount: number = 4;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  goals = []; //tableau des objectif  

  constructor(private _data: DataService) { }  // _data = instance for data service 

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
        this.itemCount = this.goals.length; // au démarrage itemCount = 0
    this._data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }
  removeItem(i){
    this.goals.splice(i , 1) ;
    this._data.changeGoal(this.goals);
  }

}
