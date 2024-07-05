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

Mulheres são maioria em Niterói, com mais de 40mil habitantes a mais que homens. Observando a pirâmide etária, notamos que em quase todas as faixas etárias, a população feminina é maior que a masculina. Com exceção de alguns grupos abaixo de 20 anos.
(O que fazer com essa informação?)

<div id="visGender"></div>

A cidade de Niterói é casa de toda a diversidade categorizada pelo IBGE(garantir fonte e ano), com maioria de população branca com 57.16%, seguida por pardos com 29.96%, pretos com 12.51%. E com minoria expressivamente menos representativa somando 0.37% do total, com 0.24% de amarelos e 0.13% de indígenas.

Abaixo ambos os gráficos demonstram a distribuição da população por cor ou raça.

<div id="visEtnics1"></div>

<br>
<br>
<br>
<br>

<div id="visEtnics2"></div>

<!-- <h2 class="title">Plotar população população quilombola e indígena</h2> -->

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
          title: "População",
          legend: { clipHeight: 30 },
          scale: { rangeMax: 20000 },
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

// Adjusted Vega-Lite specification
let ethinicsSpec2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A circular plot representing population by skin denomination.",
  data: {
    values: ethinicsData,
  },
  width: graphWidth,
  height: graphHeight,
  transform: [
    {
      // Calculate the total population
      window: [
        {
          op: "sum",
          field: "population",
          as: "totalPopulation",
        },
      ],
      frame: [null, null],
    },
    {
      // Calculate the percentage for each group
      calculate: "datum.population / datum.totalPopulation * 100",
      as: "percentage",
    },
    {
      // Calculate start and end angles for each slice
      window: [
        {
          op: "sum",
          field: "population",
          as: "endAngle",
          sort: { field: "skinDenomination" },
        },
        { op: "lag", field: "endAngle", as: "startAngle" },
      ],
      frame: [null, 0],
    },
    {
      // Calculate midpoint angle for text placement
      calculate: "(datum.startAngle + datum.endAngle) / 2",
      as: "midAngle",
    },
  ],
  layer: [
    {
      // Original arc marks
      mark: "arc",
      encoding: {
        theta: { field: "population", type: "quantitative", stack: true },
        color: {
          field: "skinDenomination",
          type: "nominal",
          scale: {
            domain: ["Branca", "Preta", "Amarela", "Parda", "Indígena"],
            range: ["#f0f0f0", "#000000", "#FFFF00", "#FFA500", "#8B4513"],
          },
        },
        tooltip: [
          { field: "skinDenomination", type: "nominal", title: "Cor ou raça" },
          { field: "population", type: "quantitative", title: "População" },
          {
            field: "percentage",
            type: "quantitative",
            title: "Percentual",
            format: ".2f",
            // add % to the tooltip
          },
        ],
      },
    },
    {
      // Additional layer for the black bold line around the pie chart
      mark: {
        type: "arc",
        outerRadius: Math.min(graphWidth, graphHeight) / 2, // Adjust based on your chart size
        stroke: "black", // Line color
        strokeWidth: 3, // Line width for the bold effect
        fill: null, // Ensure the circle is not filled
      },
      data: { values: [{}] }, // Dummy data to draw the circle
      encoding: {
        // Fixed value to ensure the circle encompasses the whole chart
        theta: { value: 0 },
        theta2: { value: 360 },
      },
    },
    {
      mark: { type: "text", align: "center", baseline: "middle", fontSize: 12 },
      data: { values: ethinicsData }, // Assuming ethinicsData is your data source
      encoding: {
        text: {
          field: "percentage",
          type: "quantitative",
          format: ".1f",
          condition: [
            {
              test: "datum.category === 'branca'",
              value: "datum.percentage + '%'",
            },
          ],
        },
        theta: { value: 50 }, // Position for "branca"
        radius: { value: 100 }, // Adjust as needed
        color: { value: "black" },
      },
    },
    {
      mark: { type: "text", align: "center", baseline: "middle", fontSize: 12 },
      encoding: {
        text: {
          condition: [
            {
              test: "datum.category === 'parda'",
              value: "datum.percentage + '%'",
            },
          ],
        },
        theta: { value: 260 }, // Position for "parda"
        radius: { value: 100 }, // Adjust as needed
        color: { value: "black" },
      },
    },
    {
      mark: { type: "text", align: "center", baseline: "middle", fontSize: 12 },
      encoding: {
        text: {
          condition: [
            {
              test: "datum.category === 'preta'",
              value: "datum.percentage + '%'",
            },
          ],
        },
        theta: { value: 310 }, // Position for "preta"
        radius: { value: 100 }, // Adjust as needed
        color: { value: "white" }, // White text for "preta"
      },
    },
  ],
};

vegaEmbed("#visEtnics1", ethinicsSpec)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);

vegaEmbed("#visEtnics2", ethinicsSpec2)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);
```

```js
let genderData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - População por sexo - Niterói (RJ).csv"
).csv();

parseIBGEData(genderData);

// map key values as properties of the object
genderData = genderData.map((d) => {
  d.gender = d["Sexo"];
  d.population = d["População(pessoas)"];
  return d;
});

let genderSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description:
    "Pie chart showing population by gender in Niterói (RJ) based on the 2022 census.",
  width: graphWidth,
  height: graphHeight,
  data: {
    values: genderData,
  },
  transform: [
    // add percentage
    {
      window: [
        {
          op: "sum",
          field: "population",
          as: "totalPopulation",
        },
      ],
      frame: [null, null],
    },
    {
      calculate: "datum.population / datum.totalPopulation * 100",
      as: "percentage",
    },
  ],
  layout: [],

  mark: {
    type: "arc",
    stroke: "black", // Color of the stroke
    strokeWidth: 2, // Width of the stroke for a bold appearance
  },
  encoding: {
    theta: { field: "population", type: "quantitative" },
    color: { field: "gender", type: "nominal", legend: { title: "Gênero" } },
    tooltip: [
      { field: "gender", type: "nominal", title: "Gênero" },
      { field: "population", type: "quantitative", title: "População" },
      {
        field: "percentage",
        type: "quantitative",
        title: "Percentual",
        format: ".2f",
      },
    ],
  },
  view: { stroke: null }, // This line is no longer necessary for the stroke around slices
};

vegaEmbed("#visGender", genderSpec)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);
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
