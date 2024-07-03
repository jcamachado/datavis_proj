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

<div class="hero">
  <h1 style="margin-bottom: 50px;">Demografia</h1>
</div>

<div style="width: 100%; margin-top: 15px;">
    <div id="ex01" style="width: 100%; margin-top: 15px;">
        ${ vl.render(plotMap(divWidth01 - 200, geojson, IDHM, radioboxPop)) }
    </div>
</div>

```js
// Criar Radio Box
let radioboxPop = view(Inputs.radio(["Densidade Demográfica (2022)", "População (2022)"], {label: "Exibir dados: ", value: "Densidade Demográfica (2022)"}));
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
const geojson = await FileAttachment("Tabelas_panorama/geojs-33-mun.json").json({typed: true});
const IDHM = await FileAttachment("Tabelas_panorama/RJ_IDHM.csv").csv();
const divWidth01 = Generators.width(document.querySelector("#ex01"));
```

```js
function plotMap(divWidth, geojson, IDHM, radioboxPop) {
  return {
    spec: {
      width: divWidth,
      height: 300,
      background: "#f4f4f9",
      projection: {
        type: "mercator"
      },
      layer: [
        {
          data: {
            values: geojson,
            format: {
              type: "json",
              property: "features"
            }
          },
          transform: [
            {
              lookup: "properties.name",
              from: {
                data: {
                  values: IDHM
                },
                key: "Territorialidades",
                fields: [radioboxPop]
              }
            }
          ],
          mark: {
            type: "geoshape",
            stroke: "#D3D3D3"
            ,
            strokeWidth: 1
          },
          encoding: {
            color: {
              field: radioboxPop,
              type: "quantitative",
              scale: { scheme: "blues", type: 'log' },
              "legend": {
                "orient": "right",
                "titleFontSize": 12,
                "titleAlign": "center"
              }
            },
            tooltip: [
              { field: "properties.name", type: "nominal", title: "Cidade" },
              { field: radioboxPop, type: "quantitative", title: radioboxPop}
            ]
          }
        }
      ]
    }
  }
}
```