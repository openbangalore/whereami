require([
  "dojo/query",
  "esri/map",
  "esri/geometry",
  "esri/graphic",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/geometry/jsonUtils"
], function (query, Map, Geometry, Graphic, SimpleLineSymbol, SimpleFillSymbol, JsonUtils) {

  var map = new Map("map", {
    basemap: "gray",
    center: [ 77.602787,12.984108],
    zoom: 12
  });

  // create a GeoStore
  var WardsGeoStore = new Terraformer.GeoStore({
    store: new Terraformer.GeoStore.Memory(),
    index: new Terraformer.RTree()
  });
  
  // wait for the load event
  map.on('load', function () {
    // loop over counties
    for (var i = ward_b.length - 1; i >= 0; i--) {
      var w = ward_b[i];
      console.log(w);
      // insert into the index
      WardsGeoStore.add(w);

      // convert for display to an arcgis object
      var arcgis = Terraformer.ArcGIS.convert(w);

      // convert to an esri geometry
      var geometry = JsonUtils.fromJson(arcgis.geometry);

      // make a new graphic for the map
      var gfx = new Graphic(geometry, new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
        new dojo.Color([100,155,55]),1), new dojo.Color([155,255,100,0.1])));

      // add the graphic to the map
      map.graphics.add(gfx);
    }
  });

  function findMe() {
    // One-shot position request.
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      
      // Query location
        //coordinates: [ 77.542303, 12.953592 ]
        //coordinates: [ lng, lat ]
      
      var point = new Terraformer.Primitive({"type": "Point",
        coordinates: [ lng, lat ]
        });
      var def = WardsGeoStore.contains(point,function(err,results){
        if (results.length) {
          query("#whereami")[0].innerHTML = "You are at " + lng.toFixed(5) + " longitude, " + lat.toFixed(5) + " latitude, in " + results[0].properties.WARD_NAME + " ward.";

          // add highlighted county graphic to map, center and zoom
          var arcgis = Terraformer.ArcGIS.convert(results[0]);
          var geometry = JsonUtils.fromJson(arcgis.geometry);

          var gfx = new Graphic(geometry, new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color([255,155,55]),1), new dojo.Color([255,155,100,0.05])));

          map.graphics.add(gfx);
          map.setExtent(geometry.getExtent(), true);
        } else {
          query("#whereami")[0].innerHTML = "We couldn't find where you were.";
        }
      });
    });
  }

  query("#submit").on("click", findMe);

});