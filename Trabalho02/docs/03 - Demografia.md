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

```js
import * as vega from "npm:vega";
import * as vegaLite from "npm:vega-lite";
import * as vegaLiteApi from "npm:vega-lite-api";
const vl = vegaLiteApi.register(vega, vegaLite);
```

<head>
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
</head>
<div class="hero">
  <h1 style="margin-bottom: 50px;">Demografia</h1>
</div>

```js
// Criar Radio Box
// let radioboxPop = view(
//   Inputs.radio(["Densidade Demográfica (2022)", "População (2022)"], {
//     label: "Exibir dados: ",
//     value: "Densidade Demográfica (2022)",
//   })
// );
```

<div class="hero">
  <h2 style="margin-bottom: 50px; margin-top: 50px;">Crescimento populacional</h2>
</div>

Até 2010, a população niteroiense crescia em um ritmo desacelerado, indo de 397.135 habitantes em 1991 para 487.562 em 2010 e uma taxa média de crescimento de 12.75% por década. Mas entre 2010 e 2022 houve um decréscimo da população em 1.2%, chegando a 481.758 habitantes.

<div id="visPopGrow"></div>

A redução populacional é um aspecto com diversos fatores e sutilezas que, embora alguns sejam abordados, não serão aprofundados aqui. Como discutido na seção da página anterior (2), o IDH da cidade tem consistentemente crescido, e já é considerado alto a algumas pesquisas. E assim como é tendência em países com alto IDH, a taxa de natalidade tende a diminuir quando políticas publicas de igualdade de gênero não visam lidar com fatores que permitem a segurança para criação de filhos, como por exemplo, creches e licença paternidade equiparada.

Consequentemente, a pirâmide etária da cidade desloca seu centro de massa para idades mais avançadas. Pois além de menos natalidade, a longevidade também vai sendo aprimorada.

<div id="visAge"></div>

<div class="hero">
  <h2 style="margin-bottom: 50px; margin-top: 50px;">Diversidade</h2>
</div>
<div id="visEtnics"></div>

<h2 class="title">Plotar população população quilombola e indígena</h2>

```js
const goldenYellow = "#FFD700";
const turquoise = "#40e0d0";
const graphWidth = 800;
const graphHeight = 500;

const geojson = await FileAttachment("Tabelas_panorama/geojs-33-mun.json").json(
  { typed: true }
);
const IDHM = await FileAttachment("Tabelas_panorama/RJ_IDHM.csv").csv();

function parseIBGEData(data) {
  data.forEach((d) => {
    Object.keys(d).forEach((k) => {
      if (k.includes(";")) {
        const keys = k.split(";");
        const values = d[k].split(";");
        keys.forEach((key, i) => {
          d[key] = values[i];
        });
        delete d[k];
      }
    });
  });
}
```

```js
// Diversity
let quilombolaData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - População quilombola - Niterói (RJ).csv"
).csv();
let nativeData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - População indígena - Niterói (RJ).csv"
).csv();
let ethinicsData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - População por cor ou raça - Niterói (RJ).csv"
).csv();

parseIBGEData(quilombolaData);
parseIBGEData(nativeData);
parseIBGEData(ethinicsData);

// population is undefined

quilombolaData.population = quilombolaData[0]["População quilombola (pessoas)"];
nativeData.ethinicAndSkinAffirmative = nativeData[0]["pessoas"];
nativeData.selfDeclared = nativeData[1]["pessoas"];
nativeData.population = nativeData[2]["pessoas"];

// d.population has to be number
ethinicsData.forEach((d) => {
  d.skinDenomination = d["Cor ou raça"];
  d.population = d["População (pessoas)"];
  d.population = parseInt(d.population);

  // if population is null or 0, drop d
  if (d.population === "0" || d.population === "") {
    ethinicsData = ethinicsData.filter((item) => item !== d);
  }
});

console.log(quilombolaData);

let ethinicsSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A circular plot representing population by skin denomination.",
  data: {
    values: ethinicsData,
  },
  width: graphWidth,
  height: graphHeight,
  layer: [
    {
      mark: {
        type: "circle",
        opacity: 0.8,
        stroke: "black",
        strokeWidth: 1,
      },
      encoding: {
        x: {
          field: "skinDenomination",
          type: "nominal",
          axis: { title: "Cor ou raça", grid: false },
        },
        y: {
          field: "population",
          type: "quantitative",
          axis: { title: "População" },
        },
        size: {
          field: "population",
          type: "quantitative",
          title: "Population Size",
          legend: { clipHeight: 30 },
          scale: { rangeMax: 5000 },
        },
        color: {
          field: "skinDenomination",
          type: "nominal",
          scale: {
            domain: ["Branca", "Preta", "Amarela", "Parda", "Indígena"],
            range: ["#f0f0f0", "#000000", "#FFFF00", "#FFA500", "#8B4513"],
          },
          legend: null,
        },
        tooltip: [
          { field: "skinDenomination", type: "nominal", title: "Cor ou raça" },
          { field: "population", type: "quantitative", title: "População" },
        ],
      },
    },
    {
      data: { values: [{}] },
      mark: {
        type: "text",
        align: "right",
        baseline: "bottom",
        dx: graphWidth / 2, // Adjust the position based on the size of your visualization
        dy: graphHeight / 2 + 50, // Adjust the distance from the bottom of your visualization
        text: "Fonte?, 2022?",
      },
      encoding: {
        text: { type: "nominal" },
      },
    },
    {
      // New dotted line layer
      mark: {
        type: "rule",
        strokeDash: [4, 4], // Creates a dotted line pattern
        stroke: "grey", // Color of the line
      },
      encoding: {
        x: { field: "skinDenomination", type: "nominal" }, // Use the same x encoding as your circles
        y: {
          field: "population",
          type: "quantitative",
        },
        y2: {
          // This sets the end point of the lines at the baseline (0)
          // Adjust this value if your baseline is different
          value: 0,
        },
      },
    },
  ],
};
vegaEmbed("#visEtnics", ethinicsSpec)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);
```

```js

```

```js
// plot the population growth
let popGrowthData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - Crescimento Populacional - Niterói (RJ).csv"
).csv();
parseIBGEData(popGrowthData);

popGrowthData = popGrowthData.map((d) => {
  d.year = d["Ano da pesquisa"];
  d.population = d["População(pessoas)"];
  return d;
});

const divWidth02 = Generators.width(document.querySelector("#ex02"));

var specPopGrow = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A simple bar chart with embedded data.",
  data: {
    values: popGrowthData,
  },
  width: graphWidth,
  height: graphHeight,
  layer: [
    {
      mark: {
        type: "line",
        point: true,
      },
      encoding: {
        x: {
          field: "year",
          type: "ordinal",
          axis: { title: "Ano", labelAngle: 0 },
        },
        y: {
          field: "population",
          type: "quantitative",
          axis: { title: "População" },
        },
      },
    },
    {
      data: { values: [{}] },
      mark: {
        type: "text",
        align: "right",
        baseline: "bottom",
        dx: graphWidth / 2, // Adjust the position based on the size of your visualization
        dy: graphHeight / 2 + 50, // Adjust the distance from the bottom of your visualization
        text: "IBGE, 2022",
      },
      encoding: {
        text: { type: "nominal" },
      },
    },
  ],
};

// Embed the visualization in the container with id 'vis'
vegaEmbed("#visPopGrow", specPopGrow)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);
```

```js
// Plotar pirâmide etária por gênero

let ageData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - Pirâmide etária - Niterói (RJ).csv"
).csv();

parseIBGEData(ageData);
let i = 0;
//  map key values as properties of the object
ageData = ageData.map((d) => {
  d.id = i++;
  d.age = d["Grupo de idade"];
  d.female = d["População feminina(pessoas)"];
  d.male = d["População masculina(pessoas)"];
  return d;
});

const divWidth01 = Generators.width(document.querySelector("#ex01"));

var specAge = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description:
    "A population pyramid showing absolute values for male and female populations, with females on the left and males on the right, each line labeled by age.",
  data: {
    values: ageData,
  },
  transform: [
    {
      calculate: "datum.female * -1",
      as: "female",
    },
    {
      calculate: "abs(datum.male)",
      as: "male",
    },
    {
      calculate: "'População Feminina'",
      as: "gender_female",
    },
    {
      calculate: "'População Masculina'",
      as: "gender_male",
    },
    {
      calculate: "abs(datum.female)",
      as: "absFemale",
    },
  ],
  width: graphWidth,
  height: graphHeight,
  layer: [
    {
      mark: "bar",
      encoding: {
        y: {
          field: "age",
          type: "ordinal",
          axis: { title: "Faixa etária" },
          sort: {
            field: "id",
            order: "ascending",
          },
        },
        x: {
          field: "female",
          type: "quantitative",
          axis: { title: "População", orient: "top", labelAngle: 0 },
          scale: { domain: [-25000, 0], nice: false, padding: 10 },
        },
        color: {
          field: "gender_female",
          type: "nominal",
          legend: {
            title: "Gender",
            values: ["População Feminina", "População Masculina"],
            orient: "right",
          },
          scale: {
            domain: ["População Feminina", "População Masculina"],
            range: [goldenYellow, turquoise],
          },
        },
        tooltip: [
          { field: "age", type: "ordinal", title: "Faixa etária" },
          {
            field: "absFemale",
            type: "quantitative",
            title: "População Feminina",
            aggregate: "sum",
            format: ",.0f",
            // multiply by -1 to get the absolute value
          },
        ],
      },
    },
    {
      mark: "bar",
      encoding: {
        y: {
          field: "age",
          type: "ordinal",
          sort: {
            field: "id",
            order: "ascending",
          },
        },
        x: {
          field: "male",
          type: "quantitative",
          axis: {
            title: "População",
            labelExpr: "abs(datum.value)",
          },
          scale: { domain: [0, 25000] },
        },
        color: {
          value: turquoise,
        },
        tooltip: [
          { field: "age", type: "ordinal", title: "Faixa etária" },
          {
            field: "male",
            type: "quantitative",
            title: "População Masculina",
            aggregate: "sum",
            format: ",.0f",
          },
        ],
      },
    },
    {
      data: { values: [{}] },
      mark: {
        type: "text",
        align: "right",
        baseline: "bottom",
        dx: graphWidth / 2, // Adjust the position based on the size of your visualization
        dy: graphHeight / 2 + 10, // Adjust the distance from the bottom of your visualization
        text: "IBGE, 2022",
      },
      encoding: {
        text: { type: "nominal" },
      },
    },
  ],
  config: {
    view: { stroke: null },
    axis: { grid: false },
  },
};

// Embed the visualization in the container with id 'vis'
vegaEmbed("#visAge", specAge)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);
```
