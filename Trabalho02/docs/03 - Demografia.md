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

<!-- <div style="width: 100%; margin-top: 15px;">
    <div id="ex01" style="width: 100%; margin-top: 15px;">
        ${ vl.render(plotAgePiramid(divWidth01, transformedData)) }
    </div>
</div> -->

<div id="vis"></div>

```js
// Criar Radio Box
let radioboxPop = view(
  Inputs.radio(["Densidade Demográfica (2022)", "População (2022)"], {
    label: "Exibir dados: ",
    value: "Densidade Demográfica (2022)",
  })
);
```

<div class="hero">
  <h2 style="margin-bottom: 50px; margin-top: 50px;">População</h2>
</div>

Em 2022, a população era de 481.749 habitantes e a densidade demográfica era de 3.601,67 habitantes por quilômetro quadrado. Na comparação com outros municípios do estado, ficava nas posições 7 e 7 de 92. Já na comparação com municípios de todo o país, ficava nas posições 44 e 29 de 5570.

População em 2010: 487.562

População em 2022: 481.758

Inserir gráfico do crescimento populacional # csv do IBGE

Aqui serão plotados os dados do número de pessoas, população por cor e raça, por sexo e pirâmide etária.

<h2 class="title">Plotar pirâmide etária por gênero</h2>

<h2 class="title">Plotar população população quilombola e indígena</h2>

```js
const geojson = await FileAttachment("Tabelas_panorama/geojs-33-mun.json").json(
  { typed: true }
);
const IDHM = await FileAttachment("Tabelas_panorama/RJ_IDHM.csv").csv();
const ageData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - Pirâmide etária - Niterói (RJ).csv"
).csv();
const popGrowthData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - Crescimento Populacional - Niterói (RJ).csv"
).csv();

plotAgePiramid(ageData);
```

```js
function plotAgePiramid(ageData) {
  // Plotar pirâmide etária por gênero

  ageData.forEach((d) => {
    // get key and split it into many keys using the semi-colon separator
    // same for values, and each value is then assigned to the new key
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
  let i = 0;
  //  map key values as properties of the object
  const transformedData = ageData.map((d) => {
    d.id = i++;
    d.age = d["Grupo de idade"];
    d.female = d["População feminina(pessoas)"];
    d.male = d["População masculina(pessoas)"];
    return d;
  });

  // for item in transformedData, print item
  for (const item of transformedData) {
    console.log(item);
  }
  const divWidth01 = Generators.width(document.querySelector("#ex01"));

  var spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description:
      "A population pyramid showing absolute values for male and female populations, with females on the left and males on the right, each line labeled by age.",
    data: {
      values: transformedData,
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
    width: 800,
    height: 500,
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
              range: ["#522731", "#1f77b4"],
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
              title: "Population",
              labelExpr: "abs(datum.value)",
            },
            scale: { domain: [0, 25000] },
          },
          color: {
            value: "#1f77b4",
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
    ],
    config: {
      view: { stroke: null },
      axis: { grid: false },
    },
  };

  // Embed the visualization in the container with id 'vis'
  vegaEmbed("#vis", spec)
    .then(function (result) {
      // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    })
    .catch(console.error);
}
```
