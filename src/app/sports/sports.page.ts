import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage implements OnInit {

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  markerId: string;
  center: any;
  coordinates: any[] = [];
  searching = false;
  text = "ingrese una palabra para buscar"
  songs: any;
  song: any;
  currentSong: HTMLAudioElement;

  constructor( private musicService: MusicService) { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    await this.getcurrentPosition();
    await this.watchPosition();
    await this.createMap();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleApiKey,
      config: {
        center: this.center,
        zoom: 8,
      },
    });
    
    this.addMarket(this.center.lat, this.center.lng);
  }

  async addMarket(lat, lng) {

    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng
      },
      draggable: true
    })
  }

  async removeMarker() {
    await this.newMap.removeMarker(this.markerId);
  }

  async getcurrentPosition() {
      const coordinates = await Geolocation.getCurrentPosition();
      this.center = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      }
  }

  async setCamara(lat,lng){
    await this.newMap.removeMarker(this.markerId);
    this.addMarket(lat,lng)
    this.newMap.setCamera({
      coordinate: {
        lat: lat,
        lng: lng
      },
      animate: true
    })

  }

  async watchPosition(){
     Geolocation.watchPosition({}, position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.setCamara(position.coords.latitude,position.coords.longitude);
      this.coordinates.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      })
  }

  async getTracks(keywords: string){
    this.searching = true;
    if (keywords.length > 0 ) {
      this.musicService.searchTracks(keywords).subscribe(async resp => {
        this.songs = resp;
        if (this.songs.length === 0){
          this.text = "no se encontraorn canciones"
        }
        this.searching = false;
      });
    }else{
      this.text = "ingrese alguna palabra para buscar";
      this.songs = [];
    }
  }

}
