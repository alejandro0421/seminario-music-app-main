import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit{

  slideOpt = {
    initialSlide: 0, //slide inicial
    slidesPerView: 1, //slide por vista
    centeredSlides: true, //que las slides esten centradas
    speed: 400 //velocidad de transicion de casa slide en milisegundo
  }

  slides = [
    {
      title: 'Titulo 1',
      subtitle: 'Sub title 1',
      icon: 'musical-notes-outline',
      img: 'assets/images/img1.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'
    },
    {
      title: 'Titulo 2',
      subtitle: 'Sub title 2',
      icon: 'musical-note-outline',
      img: 'assets/images/img2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'
    },
    {
      title: 'Titulo 3',
      subtitle: 'Sub title 3',
      icon: 'play-outline',
      img: 'assets/images/img3.png',
      // eslint-disable-next-line max-len
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'
    },
    {
      title: 'Titulo 4',
      subtitle: 'Sub title 4',
      icon: 'play-outline',
      img: 'assets/images/img4.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'
    }
  ]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  finish() {
    Storage.set({key: 'isIntroShowed', value: 'true'});
    this.router.navigateByUrl('/login');
  }

}
