---
theme: dashboard
# title: 2023 Spotify Streams
title: Analisando os sucessos
---

# Análise dos sucessos de 2023

## Introdução

Para tentarmos entender quais características que mais influenciam para o sucesso de uma música, analisamos as músicas mais populares de 2023 no Spotify e comparamos suas propriedades contra sua popularidade na plataforma, a fim de buscar correlações coerentes. 

## Organização dos dados
A seguir, exibiremos 10 gráficos do tipo scatter plot, onde o eixo vertical sempre representará a quantidade de streams (acessos) e o eixo horizontal representará uma das características das músicas analisadas.
Em todos os graficos em que a cor não é especificada, ela mudará proporcionamente ao valor do eixo vertical, ou seja, quanto mais streams, mais vermelho será o ponto, pois usaremos mapas de calor como sistema de cores padrão. 

<!-- Load and transform the data -->
```js
const spotify_file = await FileAttachment("spotify-2023.csv").csv({typed: true});
spotify_file.forEach(d => {
  d.in_spotify_charts = isNaN(+d.in_spotify_charts) ? null : +d.in_spotify_charts;
  d.streams = d.streams / 1e6; // divide by one million
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
function scatterPlot(data, valX, valY, valColor="streams", valLegend=false, hideX=false, isPercent=false, {width} = {}) {
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
      displayLabelX = "Palavras faladas (%)";
      break;
    default:
      displayLabelX = valX;
  }

  switch(valY) {
    case "streams":
      displayLabelY = "Acessos (milhões)";
      break;
    default:
      displayLabelY = valY;
  }

  let xAxis = hideX ? {label: displayLabelX, ticks: 0, tickFormat: () => ""} : {label: displayLabelX};
  if (isPercent) {
    xAxis.domain = [0, 100];
  }

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
  return scatterPlot(data, valX, valY, valColor, false, false, true);
}


// (valence_%, streams)
function valenceStreamsScatter(data, {width} = {}) {
  valX = "valence_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor, false, false, true);
}

// (energy_%, streams)
function energyStreamsScatter(data, {width} = {}) {
  valX = "energy_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor, false, false, true);
}

// (acousticness_%, streams)
function acousticnessStreamsScatter(data, {width} = {}) {
  valX = "acousticness_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor, false, false, true);
}

// (instrumentalness_%, streams)
function instrumentalnessStreamsScatter(data, {width} = {}) {
  valX = "instrumentalness_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor, false, false, true);
}

// (liveness_%, streams)
function livenessStreamsScatter(data, {width} = {}) {
  valX = "liveness_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor, false, false, true);
}

// (speechness_%, streams)
function speechnessStreamsScatter(data, {width} = {}) {
  valX = "speechiness_%";
  valY = "streams";
  valColor = "streams";
  return scatterPlot(data, valX, valY, valColor, false, false, true);
}
```

## Análise dos dados

### Mais impacto
As tendencias mais claras que encontramos foram em relação ao ano de lançamento e ao tom da musica.
A proximidade do lançamento com o ano atual parece ter um impacto muito grande na popularidade da musica. Isso pode indicar fatores como o perfil de ouvintes que consomem mais musicas novas, o perfil de pessoas que acessam musica pelas plataformas, a promoção de musicas novas, ou até mesmo as musicas sendo feitas com estes publicos como alvo.

<br>

<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => yearStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => keyStreamsScatter(sortedData, {width}))}
  </div>
</div>

<br>

#### Impacto possivel

Existe uma tendencia muito forte de que musicas com mais streams possuem menos instrumentalidade, invariavelmente. Todas as musicas com mais de 1 bilhao de streams possuem menos de 25% de instrumentalidade. e todas com mais de 1.5 bilhao possuem menos de 10%, e um adensamento muito grande em 0%. 

Este dado foi posta como possibilidade de impacto, pois embora a tendencia seja clara, a concentração de valores em volta de 0% levanta a possibilidade de que os dados estejam enviesados, como por exemplo, valores invalidos ou faltantes.

<br>

<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => instrumentalnessStreamsScatter(sortedData, {width}))}
  </div>
</div>

<br>

### Menos impacto

Alguns aspectos musicais, embora apresentem alguma tendencia em aumentar popularidade, analisando proporcionalmente, estes padrões se tornam duvidosos quando olhamos para a distribuição de musicas menos populares tambem. 

Os exemplos mais obvios sao a % de palavras na musica e a % de animacao. A grande maioria das musicas populares possuem menos de 40$ de animacao e menos de 30% de palavras. E quanto menos % desses aspectos, mais popular a musica. Porem, a distribuicao de musicas menos populares segue um padrao parecido, com um adensamento muito maior em valores baixos.

BPM, dançabilidade, energia e acustica seguem um comportamento parecido. Embora muito menos densas, as musicas mais populares e menos populares seguem o mesmo padrao de adensamento em certos intervalos. Dançabilidade apresenta uma concentração global entre 30% e 95%. Embora entre outros intervalos, estas outras características apresentam uma distribuição proporcional.

<br>

<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => bpmStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => danceabilityStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => energyStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => acousticnessStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => livenessStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => speechnessStreamsScatter(sortedData, {width}))}
  </div>
</div>

<br>

### Sem impacto

Dentre os aspectos analisados, o mês de lançamento, o modo musical e a positividade do conteúdo parecem não ter impacto na popularidade das músicas. A distribuição de músicas populares e menos populares é homogênea em relação a essas características, parecendo aleatória. Ou seja, não parece haver nenhum benefício em lançar uma música em um mês específico, em um modo musical específico ou com um conteúdo mais positivo, o que pode indicar um grau maior de liberdade na produção musical.

<br>

<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => monthStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => songStreamsScatter(sortedData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => valenceStreamsScatter(sortedData, {width}))}
  </div>
</div>

<!-- <div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => bpmDensity(first100Records, {width}))}
  </div>
</div> -->


