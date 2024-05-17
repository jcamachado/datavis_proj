---
theme: dashboard
title: Plataformas Musicais
---
# Diferenças entre os charts das plataformas Spotify, Deezer, Apple Music e Shazam

```js
let Spotify = await FileAttachment("spotify-2023.csv").csv();
Spotify.sort((a, b) => b.streams - a.streams);
```

<p style="text-align:justify;">
As músicas estão organizadas de acordo com os maiores streams no Spotify em 2023. O gráfico exibe a posição de cada música nos charts de várias plataformas. Os pontos vermelhos no eixo zero indicam que a música possui valor zero em determinado chart, ou seja, não está presente nessa plataforma.
</p>
<p style="text-align:justify;">
Essa visualização é útil para comparar a divergência entre as plataformas: linhas mais próximas indicam maior semelhança entre os charts, enquanto linhas mais distantes indicam maior diferença. Observa-se que plataformas como Deezer e Spotify apresentam valores mais próximos, indicando uma maior similaridade, enquanto a Apple Music exibe maior divergência em relação às outras.
</p>


```js

// Importe a biblioteca d3
import {rollup, sum} from "d3-array";

// Transforme os dados
let transformedData = Spotify.map((d, i) => ({
  num: i + 1,
  track: d["track_name"],
  artist: d["artist(s)_name"],
  streams: Number(d.streams),
  apple: Number(d.in_apple_charts),
  deezer: Number(d.in_deezer_charts),
  shazam: Number(d.in_shazam_charts),
  spotify: Number(d.in_spotify_charts)
}));

// Filtrar valores NaN ou undefined
transformedData = transformedData.filter(d => 
  !isNaN(d.apple) && d.apple !== undefined &&
  !isNaN(d.deezer) && d.deezer !== undefined &&
  !isNaN(d.shazam) && d.shazam !== undefined &&
  !isNaN(d.spotify) && d.spotify !== undefined
);
//display(transformedData)
```

```js
let range = view(Inputs.range([10,50], {label: "Número de Músicas: ", step: 1}));
```

```js
// Crie o gráfico
let max = range;

let appleData = transformedData.filter(d => d.apple === d.shazam || d.apple === d.deezer || d.apple === d.spotify).slice(0, max);
let shazamData = transformedData.filter(d => d.shazam === d.apple || d.shazam === d.deezer || d.shazam === d.spotify).slice(0, max);
let deezerData = transformedData.filter(d => d.deezer === d.apple || d.deezer === d.shazam || d.deezer === d.spotify).slice(0, max);
let spotifyData = transformedData.filter(d => d.spotify === d.apple || d.spotify === d.shazam || d.spotify === d.deezer).slice(0, max);

//concat all these data
let newConcatData = appleData.concat(shazamData, deezerData, spotifyData);

let chart = Plot.plot({
  x: {
    label: "Música",
    axis: null,
    grid: true,
    domain: [0, max]
  },
  y: {
    label: "Posição nos Charts",
    domain: [200, 0],
  },
  color: {
    type: "ordinal",
    legend: true,
    label: "Plataforma",
    domain: ["Apple", "Shazam", "Deezer", "Spotify"],
    range: ["white", "cyan", "yellow", "green"],
    marginLeft: 400
  },
  marks: [
    Plot.line(transformedData.slice(0, max), {x: "num", y: "apple", sort: "num", stroke: "white"}),
    Plot.line(transformedData.slice(0, max), {x: "num", y: "shazam", sort: "num", stroke: "cyan"}),
    Plot.line(transformedData.slice(0, max), {x: "num", y: "deezer", sort: "num", stroke: "yellow"}),
    Plot.line(transformedData.slice(0, max), {x: "num", y: "spotify", sort: "num", stroke: "green"}),

    Plot.dot(appleData, {x: "num", y: "apple", fill: "red", r: 3}),
    Plot.dot(shazamData, {x: "num", y: "shazam", fill: "red", r: 3, }),
    Plot.dot(deezerData, {x: "num", y: "deezer", fill: "red", r: 3}),
    Plot.dot(spotifyData, {x: "num", y: "spotify", fill: "red", r: 3}),

    Plot.ruleX(transformedData, {x: "num", stroke: "transparent", tip:true, channels: {Musica: "track", Artista:"artist", Acessos: "streams"},}),

  ]
});
view(chart)
```