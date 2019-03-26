import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OccamRequesterService } from '../providers/occam-requester.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [flipCard()],
  providers: [OccamRequesterService]
})

export class CardsComponent implements OnInit {

  private flip = 'inactive';
  private test: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private occamRS: OccamRequesterService) { }

  ngOnInit() { }

  toggleFlip() {
    this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
  }

}
function flipCard() {
  return trigger('flipState', [
    state('active', style({ transform: 'rotateY(180deg)' })),
    state('inactive', style({ transform: 'rotateY(0deg)' })),
    transition('active => inactive', [animate('500ms ease-in')]),
    transition('inactive => active', [animate('500ms ease-out')])
  ]);
}