---
theme: dashboard
# title: 2023 Spotify Streams
title: 1- Analisando os sucessos
---

# Análise dos Sucessos de 2023 no Spotify

<p style="text-align:justify;">
Neste trabalho de Visualização de Dados, buscamos entender as características que mais influenciam o sucesso de uma música no Spotify. Para isso, analisamos as músicas mais populares de 2023 e comparamos suas propriedades com sua popularidade na plataforma, com o objetivo de identificar correlações significativas.
</p>

## Organização dos dados

<p style="text-align:justify;">
A seguir, apresentamos 10 gráficos do tipo scatter plot, onde o eixo vertical representa sempre a quantidade de streams (acessos) e o eixo horizontal representa diferentes características das músicas analisadas. Esse tipo de representação gráfica nos permite observar correlações entre duas variáveis e suas tendências. Nos gráficos onde a cor não é especificada, ela varia proporcionalmente ao valor do eixo vertical: quanto mais streams uma música tiver, mais vermelho será o ponto. Utilizamos mapas de calor como o esquema de cores padrão para facilitar a visualização dessas tendências.
</p>

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
      displayLabelX = "Dançabilidade (%)";
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
      displayLabelX = "Liveness (%)";
      break;
    case "speechiness_%":
      displayLabelX = "Speechness (%)";
      break;
    default:
      displayLabelX = valX;
  }

  switch(valY) {
    case "streams":
      displayLabelY = "Acessos (M)";
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
    style: {fontSize: 50},
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

# Análise dos Dados
<p style="text-align:justify;">
A análise dos dados foi realizada de acordo com as observações obtidas ao plotar as correlações. Os comentários foram divididos quanto às características que apresentavam maior impacto, possível impacto, menor impacto e as que não apresentavam impacto.
</p>

### Maior Impacto
<p style="text-align:justify;">
As tendências mais claras que encontramos foram relacionadas ao ano de lançamento e ao tom das músicas. A proximidade do lançamento com o ano atual parece ter um impacto significativo na popularidade das músicas. Isso pode indicar diversos fatores, como o perfil de ouvintes que preferem consumir músicas novas, a natureza das pessoas que acessam música através das plataformas digitais, a promoção intensiva de músicas recém-lançadas ou até mesmo a criação de músicas especificamente direcionadas para esses públicos.
</p>
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

#### Impacto Possível
<p style="text-align:justify;">
Observamos uma tendência muito forte de que músicas com mais streams possuem menos instrumentalidade. Todas as músicas com mais de 1 bilhão de streams têm menos de 25% de instrumentalidade, e aquelas com mais de 1,5 bilhão têm menos de 10%, com uma grande concentração em 0%.
</p>

<p style="text-align:justify;">
Embora essa tendência seja clara, consideramos a possibilidade de impacto, pois a alta concentração de valores em torno de 0% pode indicar que os dados estejam enviesados. Isso pode ser causado por valores inválidos ou faltantes.
</p>
<br>

<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => instrumentalnessStreamsScatter(sortedData, {width}))}
  </div>
</div>

<br>

### Menor Impacto
<p style="text-align:justify;">
Alguns aspectos musicais parecem influenciar a popularidade, mas uma análise proporcional revela que esses padrões são questionáveis quando consideramos também a distribuição das músicas menos populares.
</p>

<p style="text-align:justify;">
Dois exemplos claros são o percentual de palavras faladas ("speechness") na música e o percentual de elementos de performance ao vivo ("liveness"). A maioria das músicas populares tem menos de 40% de elementos de performance ao vivo e menos de 30% de palavras faladas. Quanto menor a porcentagem desses aspectos, mais popular é a música. No entanto, a distribuição das músicas menos populares segue um padrão semelhante, com uma concentração muito maior em valores baixos.
</p>

<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => speechnessStreamsScatter(sortedData, {width}))}
  </div>

  <div class="card">
    ${resize((width) => livenessStreamsScatter(sortedData, {width}))}
  </div>
</div>

<p style="text-align:justify;">
O BPM, a dançabilidade, a energia e a acústica mostram comportamentos semelhantes. Embora menos densas, tanto as músicas mais populares quanto as menos populares seguem o mesmo padrão de concentração em certos intervalos. A dançabilidade, por exemplo, tem uma concentração global entre 30% e 95%.
</p>
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

</div>

<br>

### Sem impacto
<p style="text-align:justify;">
Dentre os aspectos analisados, o mês de lançamento, o modo das músicas e a positividade do conteúdo, parece não impactar na popularidade das músicas. A distribuição de músicas populares e menos populares é homogênea em relação a essas características, sugerindo uma distribuição aleatória. Em outras palavras, lançar uma música em um mês específico, com um modo musical particular ou com um conteúdo mais positivo não parece conferir benefício em termos de popularidade.
</p>
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


