
  // view map awal default
  const defaultView = [-7.2199655894775905, 108.21507975302251];
  let map = L.map("map", {zoomControl : false}).setView(defaultView, 12.5);
  L.control.zoom({position : "bottomright"}).addTo(map)

  // Basemap tile Layer Esri
  const esriSatelitBasemap = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
      attribution: "Tiles &copy; Esri &mdash; Source",
    }
  );

  const osmBasemap = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );

  const OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: ' &copy;  <a href="https://opentopomap.org">OpenTopoMap</a>'
  }).addTo(map);

 



  // popup jika di click (data apa yang mucul)
  function popupDesa(f, l) {
    const attribute = f.properties;
    let outDesa = [];

    if (attribute) {
      // hanya beberapa data
      const activeData = outDesa.push(
        "Nama Desa/Kelurahan" + ": " + attribute.NAMOBJ
      );

      l.bindPopup(outDesa.join("<br />"));
      l.on("click" , function(e) {
       const coba =  map.flyTo([e.latlng.lat, e.latlng.lng], 15, {
        animate:true,
        duration: 5
       })
     
      })
      
    }
  }

  function popupKesehatan(f, l) {
    const fasilitas = f.properties
    let fasilitasArray = [];
    if (fasilitas) {
              // ambil semua atribut data table
              for (key in fasilitas) {
                fasilitasArray.push(key + ": " + fasilitas[key]);
              }
   
      l.bindPopup(fasilitasArray.join("<br />"));
      l.setIcon(hospitalIcon)
      l.on("click" , function(e) {
         map.flyTo([e.latlng.lat, e.latlng.lng], 17, {
         animate:true,
         duration: 3
        })
      
       })
    }
}
  
// stylizing

  const myStyle = {
    color: "yellow",
    weight: 2,
    opacity: 0.7,
  };

  const hospitalIcon = L.icon({
    iconUrl : "./../GIS/hospital-fill.png",
    iconSize : [30,30],
  })

 

//   layer GeoJson
  const shpDesa = new L.GeoJSON.AJAX(["./../gis/cihaubertiDesa.geojson"], {
    onEachFeature: popupDesa,
    style: myStyle,
  }).addTo(map);


  const fasilitasKesehatan = new L.GeoJSON.AJAX(
    ["./../gis/fasilitaskesehatan.geojson"],{onEachFeature: popupKesehatan }
    ).addTo(map)


// layer panel
const baseMaps = {
    "OpenTopoMap": OpenTopoMap,
    "OpenStreetMap": osmBasemap,
    "EsriSatelite" : esriSatelitBasemap,
};

const overlayMaps = {
    "Kecamatan Cihaurbeti" : shpDesa,
    "Fasilitas Kesehatan": fasilitasKesehatan,
};

var layerControl = L.control.layers(baseMaps, overlayMaps, {position : "bottomleft",}).addTo(map);



// MAP EVENT

map.on("mousemove",function (e){
  const lattitude = e.latlng.lat
  const longtitude = e.latlng.lng

  document.querySelector("#coordinate").innerHTML = `Lat : ` + lattitude +"  " + `Long : ` + longtitude
})

map.on("click", function(e){
  console.log(lattitude)
})




//   const marker = L.marker([-7.197473104777248, 108.19978565088994]).addTo(map);



//   function dataDesa(f) {
//     let outDesa = [];

//     if (f.properties) {
//       // hanya beberapa data
//       // ambil semua atribut data table
//       for (key in f.properties) {
//         outDesa.push(key + ": " + f.properties[key]);
//       }

//       console.log(key);
//     }

//     // let kec = []
//     // // looping semua data
//     //
//   }