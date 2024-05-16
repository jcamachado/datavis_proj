---
theme: dashboard
# title: 2023 Spotify Streams
title: Analisando os sucessos
---

<!-- Load and transform the data -->
```js
const spotify_file = await FileAttachment("spotify-2023.csv").csv({typed: true});
spotify_file.forEach(d => {
  d.in_spotify_charts = isNaN(+d.in_spotify_charts) ? null : +d.in_spotify_charts;
});

// // Sort data by 'in_spotify_charts' attribute in ascending order
const sortedData = spotify_file.sort((a, b) => {
  const aValue = +a.in_spotify_charts === 0 ? NaN : +a.in_spotify_charts;
  const bValue = +b.in_spotify_charts === 0 ? NaN : +b.in_spotify_charts;

  if (isNaN(aValue) || isNaN(bValue)) {
    return isNaN(aValue) ? 1 : -1;
  }

  return aValue - bValue;
});

// Get only the first 100 records
const first100Records = sortedData.slice(0, 10);
```




<!-- Graphs blueprint -->

```js
function scatterPlot(data, valX, valY, valColor="streams", valLegend=false, hideX=false, {width} = {}) {
  const filteredData = data.filter(d => d.in_spotify_charts !== 0);
  let displayLabelX, displayLabelY;
  switch (valX) {
    case "released_year":
      displayLabelX = "Ano de lançamento";
      break;
    case "released_month":
      displayLabelX = "Mês de lançamento";
      break;
    case "bpm":
      displayLabelX = "BPM";
      break;
    case "key":
      displayLabelX = "Tom";
      break;
    case "track_name":
      displayLabelX = "Músicas (valores não ordenados)";
      break;
    case "mode":
      displayLabelX = "Modo";
      break;
    case "danceability_%":
      displayLabelX = "Dançante (%)";
      break;
    case "valence_%":
      displayLabelX = "Positividade do conteúdo (%)";
      break;
    case "energy_%":
      displayLabelX = "Energia (%)";
      break;
    case "acousticness_%":
      displayLabelX = "Acústica (%)";
      break;
    case "instrumentalness_%":
      displayLabelX = "Instrumental (%)";
      break;
    case "liveness_%":
      displayLabelX = "Animação (%)";
      break;
    case "speechiness_%":
      displayLabelX = "Qtd de palavras (%)";
      break;
    default:
      displayLabelX = valX;
  }

  switch(valY) {
    case "streams":
      displayLabelY = "Acessos";
      break;
    default:
      displayLabelY = valY;
  }

  const xAxis = hideX ? {label: displayLabelX, ticks: 0, tickFormat: () => ""} : {label: displayLabelX};

  return Plot.plot({
    color: {legend: valLegend},
    stroke: valColor,
    marks: [
      Plot.dot(filteredData, {x: valX, y: valY, fill: valColor})
    ],
    width,
    x: xAxis,
    y: {label: displayLabelY}
  });
}

function densityChart(data, valX, valY, valColor, {width} = {}) {
  // return Plot.rectY(data, {x: valX, y: valY}).plot()
  return Plot.plot({
    inset: 10,
    grid: true,
    x: {type: "linear"},
    y: {type: "linear"},
    marks: [
      Plot.density(data, {x: valX, y: valY, stroke: "density"})
    ],
  })
}
```


<!-- Graph intantiations -->
```js
let valX;
let valY;
let valColor;
function yearStreamsScatter(data, {width} = {}) {
    // (released_year, streams)
    let valX = "released_year";
    let valY = "streams";
    let valColor = "streams";
  return scatterPlot(data, valX, valY);
}
// function bpmDensity(data, {width} = {}) {
//   return densityChart(data, valX, valY, valColor);
// }

// (released_month, streams)
function monthStreamsScatter(data, {width} = {}) {
  let valX = "released_month";
  let valY = "streams";
  let valColor = "streams"; 
  return scatterPlot(data, valX, valY);
}

// (bpm, streams)
function bpmStreamsScatter(data, {width} = {}) {
  let valX = "bpm";
  let valY = "streams";
  let valColor = "streams";
  return scatterPlot(data, valX, valY);
}

// (key, streams)

function keyStreamsScatter(data, {width} = {}) {
  let valX = "key";
  let valY = "streams";
  let valColor = "streams";
  return scatterPlot(data, valX, valY, valColor);
}

// (nome da musica, streams)
function songStreamsScatter(data, {width} = {}) {
  valX = "track_name";
  valY = "streams";
  valColor = "mode";
  return scatterPlot(data, valX, valY, valColor, true, true);
}

// function modeStreamsScatter(data, {width} = {}) {
//   // (mode, streams)
//   valX = "mode";
//   valY = "streams";
//   valColor = "streams";
//   return scatterPlot(data, valX, valY, valColor);
// }
  

// (danceability_%, streams)
function danceabilityStreamsScatter(data, {width} = {}) {
  valX = "danceability_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor, false, false);
}


// (valence_%, streams)
function valenceStreamsScatter(data, {width} = {}) {
  valX = "valence_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor);
}

// (energy_%, streams)
function energyStreamsScatter(data, {width} = {}) {
  valX = "energy_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor);
}

// (acousticness_%, streams)
function acousticnessStreamsScatter(data, {width} = {}) {
  valX = "acousticness_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor);
}

// (instrumentalness_%, streams)
function instrumentalnessStreamsScatter(data, {width} = {}) {
  valX = "instrumentalness_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor);
}

// (liveness_%, streams)
function livenessStreamsScatter(data, {width} = {}) {
  valX = "liveness_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor);
}

// (speechness_%, streams)
function speechnessStreamsScatter(data, {width} = {}) {
  valX = "speechiness_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor);
}
```



<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => yearStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => monthStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => bpmStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => keyStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => songStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => danceabilityStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => valenceStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => energyStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => acousticnessStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => instrumentalnessStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => livenessStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => speechnessStreamsScatter(sortedData, {width}))}
  </div>
</div>


<!-- <div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => bpmDensity(first100Records, {width}))}
  </div>
</div> -->