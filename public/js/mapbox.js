export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZmFyemluaiIsImEiOiJjbHBxMTR6MWMwM2g4MmpwZjR3bWUwaGhzIn0.Wn52Dt98_EPzsq9Sy9j08Q';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/farzinj/clpq20jed00bo01pxf0kjbsqb',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: 150,
  });

  map.addControl(new mapboxgl.NavigationControl());
};
