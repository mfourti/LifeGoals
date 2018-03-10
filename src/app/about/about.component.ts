import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //give as acces to the router parameters
import { Router } from '@angular/router';
import { DataService } from "../data.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  goals :any ;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService ) {      //  instance of ActivatedRouter  pour injecter les dépendance 
     this.route.params.subscribe(res => console.log(res.id))    //pour récupurer le id
  }

  ngOnInit() {
     this._data.goal.subscribe(res => this.goals = res);
  }

  sendMeHome(){
    this.router.navigate(['']);  //méthode de rédirection 
  }

}
