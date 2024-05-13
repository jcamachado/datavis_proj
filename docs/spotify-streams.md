---
title: 2023 Spotify Streams
---

# Maiores Sucessos do Spotify em 2023 🎵

## Existe alguma característica que faz uma música ter mais chance de se tornar popular?

Para analisar quais características podem aumentar as chances de uma música se tornar popular no Spotify, é necessário considerar uma combinação de atributos técnicos, musicais e metadados associados às faixas.

## Pré-Processamento dos Dados
O dataset já está com os streams como atributo numérico e em ordem decrescente. Foi necessário realizar este pré processamento devido à atributos ausentes de uma instância. Além disso, as colunas 'key' e 'in_shazam_charts' também possuem atributos ausentes, então é necessário atenção ao analisá-las.


```js
// O dataset já está com os streams como atributo numérico e em ordem decrescente
const Spotify = FileAttachment("spotify_2023.csv").csv()
```

```js
const dataToDisplay = Spotify.map(d => ({
  TrackName: d['track_name'],
  'Streams (M)': (d['streams']/ 1000000)
}));
```

```js
Inputs.table(dataToDisplay)
```

# Mostrando os artistas mais ouvidos

```js
async function artistCounts() {

  // Separando os artistas para contabilizar os streams individualmente
  const expandedArtists = Spotify.flatMap(d => 
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

```
```js
const artistCount = await artistCounts();
```

```js
display(artistCount);
```

```js
Inputs.table(artistCount)
```

# Músicas Mais Tocadas no Spotify em 2023

```js
let range = view(Inputs.range([10, 32], {label: "Número de músicas:", step: 1, value: 10}))
```

```js
vl.layer(
  // Camada de barras
  vl.markBar()
    .data(Spotify.slice(0,range)).title({"text": "Músicas Mais Tocadas 2023", fontSize: 20})
    .encode(
      vl.x().fieldQ("streams").title("Streams"),
      vl.y().fieldN("track_name").title("Track Name").sort(null).axis(null),
      vl.text().fieldN("track_name"),
      vl.color().fieldN("track_name").scale({scheme: 'category10'}).legend(null) // Esquema de cores opcional
    ),
  
  // Camada de texto
  vl.markText({
    align: 'right',
    baseline: 'middle',
    dx: -10,  // Deslocamento horizontal do texto para a direita, ajuste conforme necessário
    color: 'white'}
  )
    .data(Spotify.slice(0,range))
    .encode(
      vl.x().fieldQ("streams"),
      vl.y().fieldN("track_name").sort(null),
      vl.text().fieldN("track_name")
    ),

    vl.markText({
    align: 'left',
    baseline: 'middle',
    dir: 'rtl',
    dx: -340,  // Deslocamento horizontal do texto para a direita, ajuste conforme necessário
    color: 'white'})
    .data(Spotify.slice(0,range))
    .encode(
      vl.x().fieldQ(0),
      vl.y().fieldN("track_name").sort(null),
      vl.text().fieldN("artist(s)_name")
    )

).width(700).height(range * 20).render()

```

