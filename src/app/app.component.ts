import {Component, HostListener, OnInit} from '@angular/core';
import { NgpSortModule } from 'ngp-sort-pipe';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  class = 'on';
  tClass = 'nav-toggle';
  db = null;
  firebaseConfig = {

  };
  educations = [];
  experiences = [];

  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    this.class = 'on';
    this.tClass = 'nav-toggle';
    this.changeMenu();
  }

  scroll(e: any, id: string): void {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
  }

  toggleClass(e: any): void {
    e.preventDefault();
    if (this.class === 'on') {
      this.class = 'of';
      this.tClass = 'nav-toggle active';
    } else {
      this.class = 'on';
      this.tClass = 'nav-toggle';
    }
    this.changeMenu();
  }

  changeMenu(): void {
    document.getElementsByTagName('body')[0].setAttribute('class', this.class);
  }

  ngOnInit(): void {
    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp( this.firebaseConfig);
    this.db = firebase.firestore();

    this.db.collection('education').get().then((data) => {
      data.forEach((doc) => {
        this.educations.push(doc.data());
      });
    });

    this.db.collection('experience').get().then((data) => {
      data.forEach((doc) => {
        this.experiences.push(doc.data());
      });
    });
    console.log(this.educations);
  }


}
