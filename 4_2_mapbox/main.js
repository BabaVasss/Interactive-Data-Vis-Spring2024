//constants and globals for all graphs
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7;
let svg;

//Map Building
mapboxgl.accessToken = 'pk.eyJ1IjoiYWtlZW1zaGVwaGVyZCIsImEiOiJjbHZianY3am4wOXZpMmpsNDR0enNwbWtyIn0.W-Bc7R2RIh11qf5f0EbA8A';

const usMap = new mapboxgl.Map({
  container: 'map',
  center: [-73.98066323065026, 40.76101009762772],//[-122.420679, 37.772537], // starting position [lng, lat] 
  zoom: 14, // starting zoom
  style: 'mapbox://styles/akeemshepherd/clvbm7eh8016p01ph9vfr931o',
})

const MoMaPopUp = new mapboxgl.Popup().setText("Museum of Modern Art [MoMa]")

const MoMa = new mapboxgl.Marker()
    .setLngLat([-73.98066323065026, 40.76101009762772])
    .setPopup(MoMaPopUp)
    .addTo(usMap)    
//end of map building



