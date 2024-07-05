```js
import maplibregl from "npm:maplibre-gl";
```

<style>
    body {
        font-family: 'Roboto', sans-serif;
        color: #333;
        background-color: #f4f4f9;
        line-height: 1.6;
        padding: 20px;
    }

    h1, h2, h3 {
        font-family: 'Merriweather', serif;
        text-align: justify;
        text-indent: 0;
        color: #003366;
    }

    p {
        text-align: justify;
        text-justify: inter-word;
        margin-bottom: 20px;
        text-indent: 1.5em;
        max-width: none;
    }

    .container {
        width: 80%;
        margin: auto;
        overflow: hidden;
    }

    .chart {
        background-color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 0 10px #ccc;
    }

    @media (max-width: 768px) {
        .container {
            width: 95%;
        }
    }

    div {
        text-align: center; /* Centraliza o conteúdo dentro das divs */
        max-width: none;
        margin: auto; /* Centraliza a própria div */
    }

    li, ol { 
        max-width: none; 
    }

</style>

<div class="hero">
  <h1 style="margin-bottom: 50px; margin-top: 50px;">Introdução</h1>
</div>

O Censo Demográfico é uma ferramenta essencial para compreender a demografia e as características socioeconômicas de uma população a partir de dados coletados, idealmente, a cada 10 anos. Além de descrever a população, o censo é indispensável para identificar e mitigar desigualdades sociais. O Censo de 2022 é especialmente significativo, marcando 150 anos desde o primeiro recenseamento no Brasil, realizado em 1872 durante o período imperial.

Inicialmente, questionava-se aos entrevistados aspectos como sua condição de "livre" ou "escravo"; e os formulários eram distribuídos a cavalo. A realização do censo foi interrompida em apenas três ocasiões—1880, 1910 e 1930—devido a instabilidades políticas. Detalhes históricos e informações adicionais estão disponíveis no site do IBGE (<a href="https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/33495-em-150-anos-conheca-a-historia-que-o-censo-conta">a história que o Censo conta</a>).

Após uma interrupção na série decenal iniciada em 1940, o 10º Recenseamento Geral do Brasil foi planejado em 1987 e concretizado em 1991, sob o lema “Ajude o Brasil a ter um bom censo”. Esta edição introduziu inovações significativas como a Comissão Consultiva, o Projeto Escola, e a divulgação dos resultados em disquetes. Agora em um contexto democrático e com maior estabilidade política, pouco foi alterado sobre o que era pesquisado, e mais sobre como era feita esse processo. Dada essa maior consistência nos dados disponíveis, este trabalho focará nos resultados censitários desde 1991.

Paralelamente ao Censo Demográfico, a Pesquisa Nacional por Amostra de Domicílios (PNAD) Contínua também fornece dados valiosos sobre a população brasileira, com objetivos e periodicidades distintas. Enquanto o Censo oferece um retrato detalhado e abrangente, ideal para análises de longo prazo e planejamento de políticas públicas, a PNAD Contínua é realizada anualmente, facilitando o monitoramento de tendências e mudanças sociais.

Este trabalho foca nos dados recentes de Niterói, explorando aspectos como Demografia, Índice de Desenvolvimento Humano (IDH) e desigualdade, com base nos censos de 1991, 2000, 2010 e parcialmente 2022 (pois ainda estão pendentes a divulgação de alguns dados). As informações foram coletadas dos sites do IBGE, da Prefeitura Municipal de Niterói, e do Atlas do Desenvolvimento Humano no Brasil — uma colaboração entre o PNUD, IPEA e Fundação João Pinheiro. Estes dados refletem o retrato mais recente da situação atual e histórica de Niterói, destacando a contínua evolução da cidade em termos de desenvolvimento humano.

<div id="map" style="height: 500px"></div>

<br>

```js
const niteroiCoordinates = [-43.12, -22.8833]; // Niterói coordinates
const brazilCoordinates = [-47.9292, -15.7801]; // center

const map = new maplibregl.Map({
  container: "map",
  zoom: 3,
  // brasil coordinates
  center: brazilCoordinates,
  style: "https://demotiles.maplibre.org/style.json",
  antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
  overflow: "hidden",
  watch: false,
  hash: true,
});
const size = 200;

// implementation of StyleImageInterface to draw a pulsing dot icon on the map
// Search for StyleImageInterface in https://maplibre.org/maplibre-gl-js/docs/API/
const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // get rendering context for the map canvas when layer is added to the map
  onAdd() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },

  // called once before every frame where the icon will be used
  render() {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;

    // draw outer circle
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 200, 200,${1 - t})`;
    context.fill();

    // draw inner circle
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 100, 100, 1)";
    context.strokeStyle = "white";
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // update this image's data with data from the canvas
    this.data = context.getImageData(0, 0, this.width, this.height).data;

    // continuously repaint the map, resulting in the smooth animation of the dot
    map.triggerRepaint();

    // return `true` to let the map know that the image was updated
    return true;
  },
};

map.on("load", () => {
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

  map.addSource("points", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: niteroiCoordinates,
          },
        },
      ],
    },
  });
  map.addLayer({
    id: "points",
    type: "symbol",
    source: "points",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });
});
```
