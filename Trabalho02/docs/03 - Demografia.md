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

De acordo com os dados do IBGE em 2022, Niterói se destaca como uma das cidades mais populosas do estado do Rio de Janeiro, com densidade demográfica de 3.601,67 habitantes por km². Com uma população estimada em 481.758 habitantes, Niterói se posiciona como o 5º município mais populoso do Rio de Janeiro e o 44º do Brasil.

O mapa apresentado facilita a visualização comparativa da densidade populacional e do número de habitantes dos municípios do Rio de Janeiro. Niterói se destaca nitidamente em tons mais escuros, revelando sua alta concentração populacional. Essa característica, atrelada à sua localização estratégica na Região Metropolitana do Rio de Janeiro, torna Niterói um polo cultural, econômico e social em constante crescimento.

<div style="width: 100%; margin-top: 15px;">
    <div id="ex01" style="width: 100%; margin-top: 15px;">
        ${ vl.render(plotMap(divWidth - 200, geojson, IDHM, radioboxPop)) }
    </div>
</div>

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
  <h2 style="margin-bottom: 50px; margin-top: 50px;">Crescimento populacional</h2>
</div>

Até 2010, a população niteroiense crescia em um ritmo desacelerado, indo de 397.135 habitantes em 1991 para 487.562 em 2010 e uma taxa média de crescimento de 12.75% por década. Mas entre 2010 e 2022 houve um decréscimo da população em 1.2%, chegando a 481.758 habitantes.

<div id="visPopGrow"></div>

A redução populacional é um aspecto com diversos fatores e sutilezas que, embora alguns sejam abordados, não serão aprofundados aqui. Como discutido na seção da página anterior (2), o IDH da cidade tem consistentemente crescido, e é considerado alto a algumas pesquisas. E assim como é tendência em países com alto IDH, a taxa de natalidade tende a diminuir quando políticas públicas de igualdade de gênero.

Consequentemente, a pirâmide etária da cidade desloca seu centro de massa para idades mais avançadas. Pois além de menos natalidade, a longevidade também vai sendo aprimorada.

<div id="visAge"></div>

<div class="hero">
  <h2 style="margin-bottom: 50px; margin-top: 50px;">Diversidade</h2>
</div>

Mulheres são maioria em Niterói, com mais de 40mil habitantes a mais que homens. Observando a pirâmide etária, notamos que em quase todas as faixas etárias, a população feminina é maior que a masculina. Com exceção de alguns grupos abaixo de 20 anos. Esta tendência é nacional e também fruto de diversos estudos que apontam uma maior longevidade para mulheres, e também uma maior taxa de mortalidade para homens. Fatores como violência, cuidados com a saúde e acidentes de trânsito pesam na comparação entre os gêneros.

<div id="visGender"></div>

Outro importante retrato da diversidade de uma população é a distribuição pelo aspecto chamado "de cor ou raça". Este aspecto é registrado segundo a autodeclaração do entrevistado, e é um importante indicador de desigualdades sociais e raciais.
A cidade de Niterói é casa de toda a diversidade categorizada pelo IBGE(garantir fonte e ano), com maioria de população branca com 57.16%, seguida por pardos com 29.96%, pretos com 12.51%. E com minoria expressivamente menos representativa somando 0.37% do total, com 0.24% de amarelos e 0.13% de indígenas.

Abaixo ambos os gráficos demonstram a distribuição da população por cor ou raça em Niterói.

<div id="visEtnics1"></div>

<br>
<br>
<br>
<br>
 
Esta distribuição constrasta com a distribuição nacional que possui uma maioria de pardos <a href="https://educa.ibge.gov.br/jovens/conheca-o-brasil/populacao/18319-cor-ou-raca.html/">(45,35%)</a>. E contranstando com a distribuição de brancos nacionamelmente, com 43.46%.
A única outra categoria que possui maior representatividade com relação ao contexto nacional é a de pessoas de pele preta, que possui 10.17% contrastando com os 12.51% locais. Indígenas nacionalmente são 0.6% da população, e amarelos 0.42%. Ambas representações maiores do que a soma destas categorias no escopo municipal.

<div id="visEtnics2"></div>

<div class="hero">
  <h2 style="margin-bottom: 50px; margin-top: 50px;">População quilombola </h2>
</div>

Embora não seja um grupo etnico, os quilombolas também estão presentes na cidade de niterói. Comparativamente, eles são bem poucos, menos que amarelos e indígenas. Mas é importante visibilizar esta população históricamente marginalizada e para que se construam políticas públicas que garantam a preservação de sua cultura e território.

<div id="visQuilombola"></div>

<!-- <h2 class="title">Plotar população população quilombola e indígena</h2> -->

```js
let goldenYellow = "#FFD700";
let turquoise = "#40e0d0";
let bgColor = "#f4f4f9";
let divWidth = Generators.width(document.querySelector("#ex01"));

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

let nativeData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - População indígena - Niterói (RJ).csv"
).csv();
let ethinicsData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - População por cor ou raça - Niterói (RJ).csv"
).csv();
let ethinicsDataBrasil = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - População por cor ou raça - Brasil.csv"
).csv();

parseIBGEData(nativeData);
parseIBGEData(ethinicsData);
parseIBGEData(ethinicsDataBrasil);

// population is undefined

nativeData.ethinicAndSkinAffirmative = nativeData[0]["pessoas"];
nativeData.selfDeclared = nativeData[1]["pessoas"];
nativeData.population = nativeData[2]["pessoas"];

ethinicsData.forEach((d) => {
  d.skinDenomination = d["Cor ou raça"];
  d.population = d["População (pessoas)"];
  d.population = parseInt(d.population);
  d.year = 2022;

  // if population is null or 0, drop d
  if (d.population === "0" || d.population === "") {
    ethinicsData = ethinicsData.filter((item) => item !== d);
  }
});

ethinicsDataBrasil.forEach((d) => {
  d.skinDenomination = d["Cor ou raça"];
  d.population = d["População (pessoas)"];
  d.population = parseInt(d.population);
  d.year = 2022;

  // if population is null or 0, drop d
  if (d.population === "0" || d.population === "") {
    ethinicsDataBrasil = ethinicsDataBrasil.filter((item) => item !== d);
  }
});

let ethinicsSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A circular plot representing population by skin denomination.",
  data: {
    values: ethinicsData,
  },
  background: bgColor,
  width: divWidth,
  height: graphHeight,

  title: "População por cor ou raça - Niterói (RJ)",
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
          legend: { clipHeight: 50 },
          scale: { rangeMax: 20000 },
        },
        color: {
          field: "skinDenomination",
          type: "nominal",
          scale: {
            domain: ["Branca", "Preta", "Amarela", "Parda", "Indígena"],
            range: ["#f0f0f0", "#707070", "#FFFF99", "#FFB374", "#9DBB8F"],
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
  description:
    "A stacked horizontal bar chart representing population by skin denomination as percentages.",
  data: {
    values: [
      ...ethinicsData.map((d) => ({
        ...d,
        source: "ethinicsData",
        region: "Niteroi",
      })),
      ...ethinicsDataBrasil.map((d) => ({
        ...d,
        source: "ethinicsDataBrasil",
        region: "Brasil",
      })),
    ],
  },
  transform: [
    {
      window: [
        {
          op: "sum",
          field: "population",
          as: "totalPopulation",
        },
      ],
      frame: [null, null],
      groupby: ["region"],
    },
    {
      calculate: "datum.population / datum.totalPopulation * 100",
      as: "percentage",
    },
  ],
  background: bgColor,
  width: divWidth,
  height: graphHeight / 2,
  mark: {
    type: "bar",
    stroke: "black",
    strokeWidth: 1,
  },
  title: "População por cor ou raça (Percentual)",
  encoding: {
    y: {
      field: "region",
      title: "Região",
      type: "ordinal",
    },
    x: {
      field: "percentage",
      type: "quantitative",
      axis: { title: "População (%)", format: ".1f" },
      stack: "zero",
    },
    color: {
      field: "skinDenomination",
      title: "Cor ou raça",
      type: "nominal",
      scale: {
        domain: ["Branca", "Preta", "Amarela", "Parda", "Indígena"],
        range: ["#f0f0f0", "#707070", "#FFFF99", "#FFB374", "#9DBB8F"],
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
      },
    ],
    size: {
      value: 60,
    },
  },
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

/*
  Quilombola
*/
let quilombolaData = await FileAttachment(
  "Tabelas_panorama/Censo 2022 - População quilombola - Niterói (RJ).csv"
).csv();
parseIBGEData(quilombolaData);
quilombolaData.population = quilombolaData[0]["População quilombola (pessoas)"];

// draw a circular plot with the whole population sum in ethinicsData as a circle and the quilombola population as a circle inside it
let quilombolaSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description:
    "Visualization of the Indígena, Amarela, and Quilombola populations as side-by-side circles.",
  width: divWidth,
  height: graphHeight,
  background: bgColor,
  title: "População Quilombola X Indígena X Amarela- Niterói (RJ)",
  data: {
    values: [
      {
        type: "Indígena",
        population: ethinicsData
          .filter((d) => d.skinDenomination === "Indígena")
          .reduce((acc, d) => acc + d.population, 0),
      },
      {
        type: "Amarela",
        population: ethinicsData
          .filter((d) => d.skinDenomination === "Amarela")
          .reduce((acc, d) => acc + d.population, 0),
      },
      {
        type: "Quilombola",
        population: quilombolaData.population,
      },
    ],
  },
  mark: {
    type: "point",
    filled: true,
    shape: "circle",
    opacity: 0.8,
    stroke: "black",
    strokeWidth: 1,
  },
  encoding: {
    x: {
      field: "type",
      type: "nominal",
      axis: { title: "Tipo de População" },
    },
    y: {
      field: "population",
      type: "quantitative",
      axis: { title: "População" },
      scale: { zero: false },
    },
    color: {
      field: "type",
      type: "nominal",
      scale: {
        domain: ["Indígena", "Amarela", "Quilombola"],
        range: ["#9DBB8F", "#FFFF99", "#BF616A"],
      },
      legend: { title: "Tipo de População" },
    },
    size: {
      field: "population",
      type: "quantitative",
      legend: { title: "População" },
    },
    tooltip: [
      { field: "type", type: "nominal", title: "Tipo" },
      { field: "population", type: "quantitative", title: "População" },
    ],
  },
  view: { stroke: null },
};

vegaEmbed("#visQuilombola", quilombolaSpec)
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
  width: divWidth,
  height: graphHeight,
  background: bgColor,
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
  title: "População por gênero",
  mark: {
    type: "arc",
    stroke: "black", // Color of the stroke
    strokeWidth: 2, // Width of the stroke for a bold appearance
  },
  encoding: {
    theta: { field: "population", type: "quantitative" },
    color: {
      field: "gender",
      type: "nominal",
      legend: { title: "Gênero" },
      scale: {
        range: [goldenYellow, turquoise],
      },
    },
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

var specPopGrow = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A simple bar chart with embedded data.",
  data: {
    values: popGrowthData,
  },
  width: divWidth,
  height: graphHeight,
  background: bgColor,
  layer: [
    {
      mark: {
        type: "line",
        point: true, // Ensure points are visible on the line
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
        // Add tooltip encoding here
        tooltip: [
          { field: "year", type: "ordinal", title: "Ano" },
          { field: "population", type: "quantitative", title: "População" },
        ],
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
  width: divWidth,
  height: graphHeight,
  background: bgColor,
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
            orient: "top",
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

```js
function plotMap(divWidth, geojson, IDHM, radioboxPop) {
  return {
    spec: {
      width: divWidth,
      height: 300,
      background: bgColor,
      projection: {
        type: "mercator",
      },
      layer: [
        {
          data: {
            values: geojson,
            format: {
              type: "json",
              property: "features",
            },
          },
          transform: [
            {
              lookup: "properties.name",
              from: {
                data: {
                  values: IDHM,
                },
                key: "Territorialidades",
                fields: [radioboxPop],
              },
            },
          ],
          mark: {
            type: "geoshape",
            stroke: "#D3D3D3",
            strokeWidth: 1,
          },
          encoding: {
            color: {
              field: radioboxPop,
              type: "quantitative",
              scale: { scheme: "blues", type: "log" },
              legend: {
                orient: "right",
                titleFontSize: 12,
                titleAlign: "center",
              },
            },
            tooltip: [
              { field: "properties.name", type: "nominal", title: "Cidade" },
              { field: radioboxPop, type: "quantitative", title: radioboxPop },
            ],
          },
          selection: {
            highlight: {
              type: "single",
              on: "mouseover",
              empty: "none",
              fields: ["properties.name"],
            },
          },
          encoding: {
            color: {
              condition: { selection: "highlight", value: "green" }, // Change to desired highlight color
              field: radioboxPop,
              type: "quantitative",
              scale: { scheme: "blues", type: "log" },
            },
            tooltip: [
              { field: "properties.name", type: "nominal", title: "Cidade" },
              { field: radioboxPop, type: "quantitative", title: radioboxPop },
            ],
          },
        },
      ],
    },
  };
}
```
