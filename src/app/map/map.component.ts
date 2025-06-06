import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {
  LatLngTuple,
  tileLayer,
  Map,
  map,
  icon,
  Marker,
  LatLng,
  marker,
  LatLngExpression,
  LeafletMouseEvent
} from 'leaflet';
import {LocationService} from '../services/location.service';
import {order} from '../shared/models/order';
import {NgIf} from '@angular/common';

@Component({
  selector: 'map',
  imports: [
    NgIf
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnChanges {
  @Input()
  order!:order;
  @Input()
  readonly = false;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  private readonly DEFAULT_LATLNG: LatLngTuple=[13.75,21.62];
@ViewChild('map', {static:true})
mapRef!: ElementRef;
map!: Map;
currentMarker!:Marker;

constructor(private locationService: LocationService) {
}


ngOnChanges() {
  if(!this.order) return;
  this.initializeMap();

  if(this.readonly&&this.addressLatLng){
    this.showLocationOnReadonlyMode();
  }
}

initializeMap(){
  if(this.map) return;

  this.map = map(this.mapRef.nativeElement,{
    attributionControl:false
  }).setView(this.DEFAULT_LATLNG,1);

  tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  this.map.on('click', (event:LeafletMouseEvent) => {
    this.setMarker(event.latlng);
  })

}

  findMyLocation(){
   this.locationService.getCurrentLocation().subscribe({
     next: (latlng) => {
       this.map.setView(latlng,this.MARKER_ZOOM_LEVEL);
       this.setMarker(latlng);
     }
   })
  }

  setMarker(latlng:LatLngExpression){
  this.addressLatLng= latlng as LatLng;
  if(this.currentMarker){
    this.currentMarker.setLatLng(latlng);
    return;
  }
  this.currentMarker = marker(latlng,{
    draggable: true,
    icon: this.MARKER_ICON,
  }).addTo(this.map);

  this.currentMarker.on('dragend', () =>{
    this.addressLatLng = this.currentMarker.getLatLng();
  })


  }

  set addressLatLng(latlng: LatLng) {
  if(!latlng.lat.toFixed) return;

  latlng.lat= parseFloat(latlng.lat.toFixed(8));
  latlng.lng = parseFloat(latlng.lng.toFixed(8));
  this.order.addressLatLng = latlng;
  console.log(this.order.addressLatLng);
  }

  get addressLatLng(){
  return this.order.addressLatLng!;
  }

  showLocationOnReadonlyMode() {

  const m = this.map;
  this.setMarker(this.addressLatLng);
  m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

  m.dragging.disable();
  m.touchZoom.disable();
  m.doubleClickZoom.disable();
  m.scrollWheelZoom.disable();
  m.boxZoom.disable();
  m.keyboard.disable();
  m.off('click');
  this.currentMarker.dragging?.disable();

  }
}
