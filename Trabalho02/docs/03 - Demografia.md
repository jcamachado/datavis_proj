<style>
    body {
        font-family: Arial, sans-serif;
    }
    div {
        text-align: center; /* Centraliza o conteúdo dentro das divs */
        max-width: none;
        margin: auto; /* Centraliza a própria div */
    }
    p {
        text-align: justify; /* Mantém os parágrafos justificados */
        text-indent: 1.5em;
        max-width: none;
    }
    h1, h2 {
        text-align: justify;
        text-indent: 0; /* Remove a indentação dos títulos h1 e h2 */
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

# Demografia

```js
// Criar Radio Box
let radioboxPop = view(Inputs.radio(["Densidade Demográfica (2022)", "População (2022)"], {label: "Exibir dados: ", value: "Densidade Demográfica (2022)"}));
```

<div style="width: 100%; margin-top: 15px;">
<center>
    <div id="ex01" style="width: 100%; margin-top: 15px;">
        ${ vl.render(plotMap(divWidth01 - 100, geojson, IDHM, radioboxPop)) }
    </div>
</center>
</div>


População

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
      background: "#FFFFFF",
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
              scale: { scheme: "blues", type: 'log' }
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