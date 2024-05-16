---
theme: dashboard
title: 2023 Spotify Streams
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

// // // Get only the first 100 records
const first100Records = sortedData.slice(0, 100);
```

<!-- Graphs -->

```js
function scatterPlot(data, valX, valY, valColor, {width} = {}) {
  const filteredData = data.filter(d => d.in_spotify_charts !== 0);
  
  return Plot.auto(data, {x: valX, y: valY, color: valColor}).plot();
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


```js
// BPM Block
let valX = "released_year";
let valY = "streams";
let valColor = "streams";

function bpmScatter(data, {width} = {}) {
  return scatterPlot(data, valX, valY, valColor);
}

function bpmDensity(data, {width} = {}) {
  return densityChart(data, valX, valY, valColor);
}

```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => bpmScatter(first100Records, {width}))}
  </div>
</div>

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => bpmDensity(first100Records, {width}))}
  </div>
</div>