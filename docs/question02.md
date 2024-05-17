---
theme: dashboard
title: Músicas Lançadas no Mesmo Ano
---
# Análise da Variação do Conjunto das Top 10 Músicas e Artistas por Ano de Lançamento

<p style="text-align:justify;">
Para observar a variação das Top 10 músicas e dos Top 10 artistas de acordo com o ano de lançamento das músicas, o dataset foi agrupado por ano de lançamento. Para contabilizar os artistas, somamos o número de streams de cada música em que o artista aparece, incluindo as colaborações ("feats"). Optamos por utilizar gráficos de barras porque este tipo de visualização facilita a comparação entre os números de streams de cada item. As barras proporcionam uma maneira clara e visualmente intuitiva de identificar diferenças e semelhanças nas popularidades. Cada barra representa uma música ou um artista.
</p>
<p style="text-align:justify;">
A análise dos dados de reprodução das músicas e artistas revela que o conjunto dos Top 10 artistas, apesar de mudanças, apresenta alguns artistas que permanecem populares ao longo dos anos. Por exemplo, em 2020, 3 artistas continuaram no Top 10 em comparação com 2019.
</p>
<p style="text-align:justify;">
Considerando músicas lançadas em anos muito anteriores a 2023, os artistas que aparecem no Top 10 são frequentemente os mesmos que estão no Top 10 de canções. Nos anos mais recentes, existem músicas cujos artistas não estão entre os mais tocados no Top 10 (embora a maioria esteja), pois a contabilização dos artistas mais tocados inclui suas parcerias e várias músicas que não necessariamente estão no Top 10.
</p>

```js
let Spotify = await FileAttachment("spotify-2023.csv").csv();

Spotify = Spotify
  .filter(d => !isNaN(Number(d.streams)))
  .map(d => ({ ...d, streams: Number(d.streams) }));
```

```js
// O dataset já está com os streams como atributo numérico e em ordem decrescente
const uniqueReleasedYears = [...new Set(Spotify.map(d => d.released_year))];
uniqueReleasedYears.sort((a, b) => b - a);
```

```js
let range = view(Inputs.select(uniqueReleasedYears, {label: "Ano de Lançamento: "}));
```

```js
// Filtrando por ano
function filterByYear(data, year) {
  return data.filter(d => d.released_year === year);
}

// Use a função para criar um novo conjunto de dados
let songsFromSpecificYear = filterByYear(Spotify, range); // Substitua 2023 pelo ano desejado
//display(songsFromSpecificYear)
```

```js
async function artistCounts(data) {

  // Separando os artistas para contabilizar os streams individualmente
  const expandedArtists = data.flatMap(d => 
    d['artist(s)_name'].split(', ').map(artist => ({
    artist: artist,
    streams_in_millions: (d['streams']/ 1000000)
    }))
  );
  const artistStreams = {}
  expandedArtists.forEach(artistData => {
  // Verifica se o artista já existe no objeto
    if (artistStreams.hasOwnProperty(artistData.artist)) {
      // Se já existe, soma os streams
      artistStreams[artistData.artist] += artistData.streams_in_millions;
    } else {
      // Se não existe, inicializa com o valor atual
      artistStreams[artistData.artist] = artistData.streams_in_millions;
    }
  })
  const artistArray = Object.entries(artistStreams).map(([artist, streams]) => {
    return {artist, streams};
  });
  artistArray.sort((a, b) => b.streams - a.streams);
return artistArray
};
const artistCount = await artistCounts(songsFromSpecificYear);
//view(Inputs.table(artistCount))
```

```js
function generateBarPlot(data, xColumn, yColumn) {
  return Plot.plot({
    marginLeft: 0,
    marginRight: 0,
    x: { label: "Streams (M)", tickColor: 'black' },
    y: { label: "Artistas", axis: null},
    marks: [
      Plot.barX(data, {
        x: xColumn,
        y: yColumn,
        sort: { y: "x", reverse: true, limit: 10 }
      }),

     Plot.text(data, {
        fontSize: 10,
        text: d => `${Math.floor(d[xColumn])} M`,
        y: yColumn,
        x: xColumn,
        textAnchor: "end",
        dx: -3,
        fill: "black"
      }),

      Plot.text(data, {
        fontSize: 10,
        text: d => d[yColumn],
        y: yColumn,
        x: 0,
        textAnchor: "start",
        dx: 3,
        fill: "black"
      })
    ]
  });
}
```
## Top 10 Artistas por Ano de Lançamento

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => generateBarPlot(artistCount, "streams", "artist"))}
  </div>
</div>

```js
function trackCounts(dataset) {
  return dataset.map(item => {
    return {
      track_name: item.track_name,
      streams: item.streams / 1e6,
      'artist(s)_name': item['artist(s)_name']
    };
  });
};

let trackCount = await trackCounts(songsFromSpecificYear);
trackCount.sort((a, b) => b.streams - a.streams);
//display(trackCount)
//view(Inputs.table(trackCount))
```

```js
function generateBarPlot02(data, xColumn, yColumn) {
  let maxStreams = Math.max(...data.map(d => d[xColumn]));
  return Plot.plot({
    marginLeft: 0,
    marginRight: 0,
    x: { label: "Streams (M)", tickColor: 'black' },
    y: { label: "Artistas", axis: null},
    marks: [
      Plot.barX(data, {
        x: xColumn,
        y: yColumn,
        sort: { y: null },
        title: d => `${d[yColumn]} by ${d["artist(s)_name"]}`
}),

     Plot.text(data, {
        fontSize: 10,
        text: d => `${Math.floor(d[xColumn])} M`,
        y: yColumn,
        x: xColumn,
        textAnchor: "end",
        dx: -3,
        fill: "black"
      }),
      
      Plot.text(data, {
        fontSize: 10,        
        text: d => {
          // Calcule a proporção de streams para esta instância em relação ao máximo
          let proportion = d[xColumn] / maxStreams;

          // Use essa proporção para calcular o número de caracteres a exibir
          let numChars = Math.floor(proportion * 35); // Ajuste o valor 100 conforme necessário

          // Retorne a substring
          return `${d[yColumn].substring(0, numChars)} by ${d["artist(s)_name"].substring(0, numChars)}`;
        },
        y: yColumn,
        x: 0,
        textAnchor: "start",
        dx: 3,
        fill: "black"
      })
    ]
  });
}
```
## Top 10 Músicas por Ano de Lançamento

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => generateBarPlot02(trackCount.slice(0,10), "streams", "track_name"))}
  </div>
</div>

```js
// Concatena os gráficos horizontalmente
let plot1 = generateBarPlot(artistCount, "streams", "artist");
let plot2 = generateBarPlot02(trackCount.slice(0,10), "streams", "track_name");

```

<div class="grid grid-cols-2">

  <div class="card">
    ${resize((width) => generateBarPlot(artistCount, "streams", "artist"))}
  </div>

  <div class="card">
    ${resize((width) => generateBarPlot02(trackCount.slice(0,10), "streams", "track_name"))}
  </div>

</div>