```js
import * as vega from "npm:vega";
import * as vegaLite from "npm:vega-lite";
import * as vegaLiteApi from "npm:vega-lite-api";
const vl = vegaLiteApi.register(vega, vegaLite);
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
    .checkbox-label {
    font-weight: bold; /* Aplica negrito ao texto */
    display: flex;
    align-items: right; /* Alinha verticalmente o texto e o checkbox */
    gap: 8px; /* Ajusta o espaçamento entre o checkbox e o texto */
    }
    input[type="checkbox"] {
    accent-color: #F9F9F9;
    cursor: pointer;
    }
    
</style>

<head>
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
</head>

<div class="hero">
  <h1 style="margin-bottom: 50px;">IDH, Economia e Desigualdade</h1>
</div>

Você provavelmente já se deparou com anúncios destacando que Niterói tem o maior IDH do estado do Rio de Janeiro. Mas você sabe o que realmente significa ter um alto IDH? Vamos explorar o que esse indicador representa.

<div style="background-color: #FFE5CC; padding: 20px; border: 1px solid #FF8C00; border-radius: 0px; box-shadow: 0 0 10px rgba(0,0,0,0.1); font-family: 'Arial', sans-serif; color: #333;">
    <b>O Índice de Desenvolvimento Humano (IDH)</b> é uma medida resumida do progresso a longo prazo em três dimensões básicas do desenvolvimento humano: renda, educação e saúde. O objetivo da criação do IDH foi o de oferecer um contraponto a outro indicador muito utilizado, o Produto Interno Bruto (PIB) per capita, que considera apenas a dimensão econômica do desenvolvimento. Criado por Mahbub ul Haq com a colaboração do economista indiano Amartya Sen, ganhador do Prêmio Nobel de Economia de 1998, o IDH pretende ser uma medida geral e sintética que, apesar de ampliar a perspectiva sobre o desenvolvimento humano, não abrange nem esgota todos os aspectos de desenvolvimento. (PNUD Brasil)
</div>

<b>Niterói possui o sétimo maior IDH do Brasil</b>, conforme os dados do censo do IBGE de 2010, e é <b>o primeiro no estado do Rio de Janeiro em termos de IDH</b>. O censo mais recente, realizado em 2022, sofreu atrasos devido à pandemia de COVID-19. O IDH é calculado pelo Programa das Nações Unidas para o Desenvolvimento (PNUD), que utiliza esses dados censitários para avaliar as condições de vida da população. Contudo, os dados do IDH referentes ao Censo de 2022 ainda não foram divulgados.

O mapa interativo a seguir facilita a visualização do IDH dos municípios do estado do Rio de Janeiro. Ao passar o cursor sobre cada município, você pode ver o IDH correspondente e comparar as diferenças visualmente com a ajuda de um gráfico de cores que indica os níveis de IDH.

<div style="width: 100%; margin-top: 15px;">
    <div id="ex01" style="width: 100%; margin-top: 15px;">
        ${ vl.render(plotMap(divWidth - 200, geojson, IDHM)) }
    </div>
</div>

O Censo Demográfico no Brasil é realizado a cada dez anos. Desde 1991, os dados começaram a ser divulgados digitalmente, facilitando significativamente o acesso. O gráfico a seguir mostra a evolução do IDH de Niterói ao longo do tempo, ilustrando as mudanças baseadas nos censos realizados de 1991 até 2010. Além disso, é possível comparar a evolução do IDH de Niterói com o IDH do Brasil e do estado do Rio de Janeiro, utilizando as opções disponíveis no checkbox.

<div id="IDHM"></div>

```js
// Criar Checkbox
let checkboxIDH = view(
  Inputs.checkbox(["Niterói", "Rio de Janeiro", "Brasil"], {
    value: ["Niterói"],
    label: html`<b>Exibir dados:</b>`,
    format: (x) =>
      html`<span
        style="text-transform: capitalize; border-bottom: solid 2px ${x}; margin-right:50px;"
        >${x}</span
      >`,
  })
);
```

O cálculo do IDH pondera três dimensões básicas do desenvolvimento humano: saúde, educação e renda.

<div class="hero">
  <h2 style="margin-bottom: 20px; margin-top: 50px;">Saúde</h2>
</div>

O IDH de Longevidade serve como um métrica da saúde e da qualidade ambiental de uma região. Em Niterói, a esperança de vida tem se mostrado consistentemente superior à média tanto estadual quanto nacional, o que pode ser atribuído ao acesso mais amplo a serviços de saúde de qualidade, melhores condições de habitação e saneamento básico.

Os dados apresentados no gráfico da evolução da esperança de vida em Niterói permitem observar não apenas o aumento no número de anos que os recém-nascidos podem esperar viver, mas também refletem sobre a qualidade das intervenções de saúde pública e infraestrutura ao longo do tempo. A esperança de vida ao nascer é calculada com base na média de anos que um indivíduo recém-nascido pode esperar viver sob as taxas de mortalidade vigentes. Por outro lado, a longevidade refere-se ao tempo de vida efetivo alcançado pelos indivíduos dentro da população, ilustrando a duração real de vida das pessoas.

<div style="display: flex; justify-content: space-around; width: 90%; margin-top: 15px;">
    <div id="EspVida" style="width: 50%; margin-top: 15px;">
    </div>
    <div id="Long" style="width: 50%; margin-top: 15px;">
    </div>
</div>

```js
// Criar Checkbox
let checkboxEspVida = view(
  Inputs.checkbox(["Niterói", "Rio de Janeiro", "Brasil"], {
    label: "Exibir dados: ",
    value: ["Niterói"],
  })
);
```

<div class="hero">
  <h2 style="margin-bottom: 20px; margin-top: 50px;">Educação</h2>
</div>

O IDH de Educação é calculado a partir de dois indicadores principais: a média de anos de estudo entre adultos e a expectativa de anos de escolaridade para crianças em idade escolar. Niterói se destaca por superar as médias do Rio de Janeiro e do Brasil, refletindo altas taxas de matrícula, qualidade de ensino e amplo acesso a recursos educacionais. A educação, vital para o desenvolvimento sustentável, tem um impacto direto no progresso social e econômico da cidade.

<div id="Edu"></div>

```js
// Criar Checkbox
let checkboxEdu = view(
  Inputs.checkbox(["Niterói", "Rio de Janeiro", "Brasil"], {
    label: "Exibir dados: ",
    value: ["Niterói"],
  })
);
```

<div class="hero">
  <h2 style="margin-bottom: 20px; margin-top: 50px;">Renda</h2>
</div>

O IDH de Renda em Niterói, medido pela Renda Nacional Bruta (RNB) per capita ajustada pelo poder de paridade de compra, reflete um padrão de vida econômico elevado em relação ao estado do Rio de Janeiro e frequentemente acima da média nacional. Esta alta renda per capita geralmente é indicativa de melhores oportunidades de emprego, salários mais altos e um mercado local aquecido, contribuindo para a riqueza geral e o acesso a recursos econômicos superiores em Niterói.

<div id="Renda"></div>

```js
// Criar Checkbox
let checkboxRenda = view(
  Inputs.checkbox(["Niterói", "Rio de Janeiro", "Brasil"], {
    label: "Exibir dados: ",
    value: ["Niterói"],
  })
);
```

<div class="hero">
  <h2 style="margin-bottom: 20px; margin-top: 50px;">Desigualdade</h2>
</div>

O IDH serve como uma medida média que resume as principais conquistas em desenvolvimento humano de um país. Contudo, como toda média, o IDH pode ocultar as desigualdades na distribuição desses avanços entre a população. Reconhecendo essa limitação, desde 2010 foram introduzidas novas metodologias no cálculo do IDH. Uma dessas inovações é o IDH Ajustado à Desigualdade (IDHAD), que ajusta os valores do índice considerando as desigualdades nas três dimensões analisadas: saúde, educação e renda.

Com o IDHAD, é possível diferenciar o 'potencial' de desenvolvimento humano, representado pelo IDH tradicional, do 'real', indicado pelo IDHAD. A diferença entre esses dois índices mostra a perda de desenvolvimento devido às desigualdades, e é expressa como uma porcentagem.

Vale destacar que o IDH Ajustado à Desigualdade (IDHAD) começou a ser calculado apenas em 2013 e não é aplicado aos municípios. Nos gráficos abaixo, você pode visualizar as variações do IDH e do IDHAD para o Estado do Rio de Janeiro e para o Brasil, utilizando os dados do PNAD de 2021.

<div id="IDHMAD"></div>

```js
// Criar Radio Box
let radioboxLoc = view(
  Inputs.radio(["Brasil", "Rio de Janeiro (UF)"], {
    label: "Exibir dados: ",
    value: "Brasil",
  })
);
```

```js
const geojson = await FileAttachment("Tabelas_panorama/geojs-33-mun.json").json(
  { typed: true }
);
const IDHM = await FileAttachment("Tabelas_panorama/RJ_IDHM.csv").csv();

// crimson red
var colorNiteroi = "#FF4500";
// water blue
var colorRJ = "#3399FF";
// forest green
var colorBrasil = "#228B22";
const divWidth = Generators.width(document.querySelector("#ex01"));
```

```js
function plotMap(divWidth, geojson, IDHM) {
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
                fields: ["IDHM 2010"]
              }
            }
          ],
          mark: {
            type: "geoshape",
            stroke: "#BFBFBF",
            strokeWidth: 1
          },
          encoding: {
            color: {
              field: "IDHM 2010",
              type: "quantitative",
              scale: { scheme: "reds" }
            }
          },
          selection: {
            highlight: {type: "single", on: "mouseover", empty: "none", fields: ["properties.name"]}
          },
          encoding: {
            color: {
              condition: {selection: "highlight", value: "green"}, // Change to desired highlight color
              field: "IDHM 2010",
              type: "quantitative",
              scale: {scheme: "reds"}
            },
            tooltip: [
              { field: "properties.name", type: "nominal", title: "Cidade" },
              { field: "IDHM 2010", type: "quantitative", title: "IDHM" }
            ]
          }
        }
      ]
    }
  }
}
```

```js
let data = await FileAttachment("Tabelas_panorama/IDHM_AtlasBR.csv").csv();
// Converter valores para números
data.forEach(function (d) {
  d.Valor = parseFloat(d.Valor.replace(",", "."));
});

let IDH_Nit = data.filter(
  (row) => row.Item === "IDHM" && row.Local === "Niterói"
);
let IDH_Brasil = data.filter(
  (row) => row.Item === "IDHM" && row.Local === "Brasil"
);
let IDH_RJ = data.filter(
  (row) => row.Item === "IDHM" && row.Local === "Rio de Janeiro"
);
let EspVida_Nit = data.filter(
  (row) => row.Item === "Esperança de vida ao nascer" && row.Local === "Niterói"
);
let EspVida_Brasil = data.filter(
  (row) => row.Item === "Esperança de vida ao nascer" && row.Local === "Brasil"
);
let EspVida_RJ = data.filter(
  (row) =>
    row.Item === "Esperança de vida ao nascer" && row.Local === "Rio de Janeiro"
);
let Long_Nit = data.filter(
  (row) =>
    row.Item === "IDHM Longevidade" &&
    row.Local === "Niterói" &&
    row.Fonte === "IBGE"
);
let Long_Brasil = data.filter(
  (row) =>
    row.Item === "IDHM Longevidade" &&
    row.Local === "Brasil" &&
    row.Fonte === "IBGE"
);
let Long_RJ = data.filter(
  (row) =>
    row.Item === "IDHM Longevidade" &&
    row.Local === "Rio de Janeiro" &&
    row.Fonte === "IBGE"
);
let Edu_Nit = data.filter(
  (row) =>
    row.Item === "IDHM Educação" &&
    row.Local === "Niterói" &&
    row.Fonte === "IBGE"
);
let Edu_Brasil = data.filter(
  (row) =>
    row.Item === "IDHM Educação" &&
    row.Local === "Brasil" &&
    row.Fonte === "IBGE"
);
let Edu_RJ = data.filter(
  (row) =>
    row.Item === "IDHM Educação" &&
    row.Local === "Rio de Janeiro" &&
    row.Fonte === "IBGE"
);
let Renda_Nit = data.filter(
  (row) =>
    row.Item === "IDHM Renda" && row.Local === "Niterói" && row.Fonte === "IBGE"
);
let Renda_Brasil = data.filter(
  (row) =>
    row.Item === "IDHM Renda" && row.Local === "Brasil" && row.Fonte === "IBGE"
);
let Renda_RJ = data.filter(
  (row) =>
    row.Item === "IDHM Renda" &&
    row.Local === "Rio de Janeiro" &&
    row.Fonte === "IBGE"
);
```

```js
// Gráfico IDHM

let DataIDH = [];

if (
  checkboxIDH.includes("Brasil") &&
  checkboxIDH.includes("Niterói") &&
  checkboxIDH.includes("Rio de Janeiro")
) {
  DataIDH = IDH_Nit.concat(IDH_Brasil, IDH_RJ);
} else if (
  checkboxIDH.includes("Rio de Janeiro") &&
  checkboxIDH.includes("Brasil")
) {
  DataIDH = IDH_RJ.concat(IDH_Brasil);
} else if (
  checkboxIDH.includes("Rio de Janeiro") &&
  checkboxIDH.includes("Niterói")
) {
  DataIDH = IDH_RJ.concat(IDH_Nit);
} else if (checkboxIDH.includes("Niterói") && checkboxIDH.includes("Brasil")) {
  DataIDH = IDH_Nit.concat(IDH_Brasil);
} else if (checkboxIDH.includes("Brasil")) {
  DataIDH = IDH_Brasil;
} else if (checkboxIDH.includes("Niterói")) {
  DataIDH = IDH_Nit;
} else if (checkboxIDH.includes("Rio de Janeiro")) {
  DataIDH = IDH_RJ;
}

let plotIDHM = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 350,
  height: 250,
  data: {
    values: DataIDH,
  },
  layer: [
    {
      mark: {
        type: "line",
        point: {
          filled: true,
          size: 100, // Aumentando o tamanho do ponto
        },
        color: "#4CAF50",
        tooltip: true,
      },
      encoding: {
        x: {
          field: "Ano",
          type: "ordinal",
          title: "Ano",
          axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            labelAngle: 0,
            titleColor: "#333333",
          },
        },
        y: {
          field: "Valor",
          type: "quantitative",
          title: "IDH",
          axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            titleColor: "#333333",
          },
          scale: { domain: [0.4, 1] },
        },
        color: {
          field: "Local",
          type: "nominal",
          scale: {
            domain: ["Niterói", "Rio de Janeiro", "Brasil"],
            range: [colorNiteroi, colorRJ, colorBrasil],
          },
          title: "Local",
        },
        tooltip: [
          { field: "Ano", type: "ordinal" },
          { field: "Valor", type: "quantitative" },
          { field: "Local", type: "nominal" },
        ],
      },
    },
    {
      mark: {
        type: "text",
        align: "left",
        dx: 5,
        dy: -5,
      },
      encoding: {
        x: {
          field: "Ano",
          type: "ordinal",
        },
        y: {
          field: "Valor",
          type: "quantitative",
        },
        text: {
          field: "Valor",
          type: "quantitative",
        },
        color: {value:"black",
        },
      },
    },
  ],
  title: {
    text: "Evolução IDH ao Longo dos Anos",
    fontSize: 20,
    font: "Arial",
    anchor: "middle",
    color: "#003366", // Azul Marinho para o título
  },
  config: {
    axis: {
      labelColor: "#333333",
      labelFont: "Arial",
      gridColor: "#e0e0e0",
      tickColor: "#333333",
    },
    background: "#f4f4f9",
  },
};

vegaEmbed("#IDHM", plotIDHM)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);

// Gráficos Esperança de Vida e Longevidade

let DataEspVida = [];
let DataLong = [];

if (
  checkboxEspVida.includes("Brasil") &&
  checkboxEspVida.includes("Niterói") &&
  checkboxEspVida.includes("Rio de Janeiro")
) {
  DataEspVida = EspVida_Nit.concat(EspVida_Brasil, EspVida_RJ);
  DataLong = Long_Nit.concat(Long_Brasil, Long_RJ);
} else if (
  checkboxEspVida.includes("Rio de Janeiro") &&
  checkboxEspVida.includes("Brasil")
) {
  DataEspVida = EspVida_RJ.concat(EspVida_Brasil);
  DataLong = Long_RJ.concat(Long_Brasil);
} else if (
  checkboxEspVida.includes("Rio de Janeiro") &&
  checkboxEspVida.includes("Niterói")
) {
  DataEspVida = EspVida_RJ.concat(EspVida_Nit);
  DataLong = Long_RJ.concat(Long_Nit);
} else if (
  checkboxEspVida.includes("Niterói") &&
  checkboxEspVida.includes("Brasil")
) {
  DataEspVida = EspVida_Nit.concat(EspVida_Brasil);
  DataLong = Long_Nit.concat(Long_Brasil);
} else if (checkboxEspVida.includes("Brasil")) {
  DataEspVida = EspVida_Brasil;
  DataLong = Long_Brasil;
} else if (checkboxEspVida.includes("Niterói")) {
  DataEspVida = EspVida_Nit;
  DataLong = Long_Nit;
} else if (checkboxEspVida.includes("Rio de Janeiro")) {
  DataEspVida = EspVida_RJ;
  DataLong = Long_RJ;
}

let plotEspVida = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 350,
  height: 250,
  data: {
    values: DataEspVida,
  },
  layer: [
    {
      mark: {
        type: "line",
        point: {
          filled: true,
          size: 100, // Aumentando o tamanho do ponto
        },
        color: "#4CAF50",
        tooltip: true,
      },
      encoding: {
        x: {
          field: "Ano",
          type: "ordinal",
          title: "Ano",
          axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            labelAngle: 0,
            titleColor: "#333333",
          },
        },
        y: {
          field: "Valor",
          type: "quantitative",
          title: "IDH",
          axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            titleColor: "#333333",
          },
          scale: { domain: [60, 90] },
        },
        color: {
          field: "Local",
          type: "nominal",
          scale: {
            domain: ["Niterói", "Rio de Janeiro", "Brasil"],
            range: [colorNiteroi, colorRJ, colorBrasil],
          },
          title: "Local",
        },
        tooltip: [
          { field: "Ano", type: "ordinal" },
          { field: "Valor", type: "quantitative", title:"Idade" },
          { field: "Local", type: "nominal" },
        ],
      },
    },
    {
      mark: {
        type: "text",
        align: "left",
        dx: 5,
        dy: -5,
      },
      encoding: {
        x: {
          field: "Ano",
          type: "ordinal",
        },
        y: {
          field: "Valor",
          type: "quantitative",
        },
        text: {
          field: "Valor",
          type: "quantitative",
        },
        color: {
          value: "black",
        },
      },
    },
  ],
  title: {
    text: "Evolução Esperança de Vida",
    fontSize: 20,
    font: "Arial",
    anchor: "middle",
    color: "#003366", // Azul Marinho para o título
  },
  config: {
    axis: {
      labelColor: "#333333",
      labelFont: "Arial",
      gridColor: "#e0e0e0",
      tickColor: "#333333",
    },
    background: "#f4f4f9",
  },
};

vegaEmbed("#EspVida", plotEspVida)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);

let plotLong = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 350,
  height: 250,
  data: {
    values: DataLong,
  },
  layer: [
    {
      mark: {
        type: "line",
        point: {
          filled: true,
          size: 100, // Aumentando o tamanho do ponto
        },
        color: "#4CAF50",
        tooltip: true,
      },
      encoding: {
        x: {
          field: "Ano",
          type: "ordinal",
          title: "Ano",
          axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            labelAngle: 0,
            titleColor: "#333333",
          },
        },
        y: {
          field: "Valor",
          type: "quantitative",
          title: "IDH",
          axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            titleColor: "#333333",
          },
          scale: { domain: [0.6, 0.9] },
        },
        color: {
          field: "Local",
          type: "nominal",
          scale: {
            domain: ["Niterói", "Rio de Janeiro", "Brasil"],
            range: [colorNiteroi, colorRJ, colorBrasil],
          },
          title: "Local",
        },
        tooltip: [
          { field: "Ano", type: "ordinal" },
          { field: "Valor", type: "quantitative" },
          { field: "Local", type: "nominal" },
        ],
      },
    },
    {
      mark: {
        type: "text",
        align: "left",
        dx: 5,
        dy: -5,
      },
      encoding: {
        x: {
          field: "Ano",
          type: "ordinal",
        },
        y: {
          field: "Valor",
          type: "quantitative",
        },
        text: {
          field: "Valor",
          type: "quantitative",
        },
      color: {value:"black",
        },
      },
    },
  ],
  title: {
    text: "Evolução IDH Longevidade",
    fontSize: 20,
    font: "Arial",
    anchor: "middle",
    color: "#003366", // Azul Marinho para o título
  },
  config: {
    axis: {
      labelColor: "#333333",
      labelFont: "Arial",
      gridColor: "#e0e0e0",
      tickColor: "#333333",
    },
    background: "#f4f4f9",
  },
};

vegaEmbed("#Long", plotLong)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);
```

```js
const dataRio = [
  { Component: "Educação", Type: "IDH", Value: 0.758 },
  { Component: "Educação", Type: "IDHAD", Value: 0.681 },
  { Component: "Renda", Type: "IDH", Value: 0.759 },
  { Component: "Renda", Type: "IDHAD", Value: 0.438 },
  { Component: "Longevidade", Type: "IDH", Value: 0.769 },
  { Component: "Longevidade", Type: "IDHAD", Value: 0.696 },
  { Component: "IDH", Type: "IDH", Value: 0.762 },
  { Component: "IDH", Type: "IDHAD", Value: 0.592 },
];
const dataBrasil = [
  { Component: "Educação", Type: "IDH", Value: 0.757 },
  { Component: "Educação", Type: "IDHAD", Value: 0.64 },
  { Component: "Renda", Type: "IDH", Value: 0.724 },
  { Component: "Renda", Type: "IDHAD", Value: 0.436 },
  { Component: "Longevidade", Type: "IDH", Value: 0.819 },
  { Component: "Longevidade", Type: "IDHAD", Value: 0.74 },
  { Component: "IDH", Type: "IDH", Value: 0.766 },
  { Component: "IDH", Type: "IDHAD", Value: 0.591 },
];
```

```js
const data = radioboxLoc === "Rio de Janeiro (UF)" ? dataRio : dataBrasil;

let plotBars = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Interactive bar chart with highlighting on hover",
  width: 400,
  height: 300,
  background: "#f4f4f9",
  data: {
    values: data,
  },
  params: [
    {
      name: "hover",
      select: {
        type: "point",
        on: "mouseover",
        clear: "mouseout",
      },
    },
  ],
  layer: [
    {
      mark: { type: "bar", size: 70 },
      encoding: {
        x: {
          field: "Component",
          type: "nominal",
          axis: { labelAngle: 0, labelPadding: 0 },
          title: "Componente",
          sort: ["Longevidade", "Educação", "Renda", "IDH"],
        },
        y: {
          field: "Value",
          type: "quantitative",
          axis: { title: "IDH", gridWidth: 1 },
          scale: { domain: [0, 1.0] },
          stack: null,
        },
        color: {
          field: "Type",
          type: "nominal",
          scale: {
            domain: ["IDH", "IDHAD"],
            range: ["#000080", "#556b2f"],
          },
          legend: { title: "Tipo de Valor" },
        },
        fillOpacity: {
          condition: { param: "hover", value: 1 },
          value: 0.1,
        },
        tooltip: [
          { field: "Component", type: "nominal", title: "Componente" },
          { field: "Type", type: "nominal", title: "Tipo" },
          {
            field: "Value",
            type: "quantitative",
            title: "Valor",
            format: ".3f",
          },
        ],
      },
    },
  ],
};

vegaEmbed("#IDHMAD", plotBars)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);

// Gráfico Educação

let DataEdu = [];

if (
  checkboxEdu.includes("Brasil") &&
  checkboxEdu.includes("Niterói") &&
  checkboxEdu.includes("Rio de Janeiro")
) {
  DataEdu = Edu_Nit.concat(Edu_Brasil, Edu_RJ);
} else if (
  checkboxEdu.includes("Rio de Janeiro") &&
  checkboxEdu.includes("Brasil")
) {
  DataEdu = Edu_RJ.concat(Edu_Brasil);
} else if (
  checkboxEdu.includes("Rio de Janeiro") &&
  checkboxEdu.includes("Niterói")
) {
  DataEdu = Edu_RJ.concat(Edu_Nit);
} else if (checkboxEdu.includes("Niterói") && checkboxEdu.includes("Brasil")) {
  DataEdu = Edu_Nit.concat(Edu_Brasil);
} else if (checkboxEdu.includes("Brasil")) {
  DataEdu = Edu_Brasil;
} else if (checkboxEdu.includes("Niterói")) {
  DataEdu = Edu_Nit;
} else if (checkboxEdu.includes("Rio de Janeiro")) {
  DataEdu = Edu_RJ;
}

let plotEdu = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 350,
  height: 250,
  data: {
    values: DataEdu,
  },
  layer: [
    {
      mark: {
        type: "line",
        point: {
          filled: true,
          size: 100, // Aumentando o tamanho do ponto
        },
        color: "#4CAF50",
        tooltip: true,
      },
      encoding: {
        x: {
          field: "Ano",
          type: "ordinal",
          title: "Ano",
          axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            labelAngle: 0,
            titleColor: "#333333",
          },
        },
        y: {
          field: "Valor",
          type: "quantitative",
          title: "IDH",
          axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            titleColor: "#333333",
          },
          scale: { domain: [0, 1] },
        },
        color: {
          field: "Local",
          type: "nominal",
          scale: {
            domain: ["Niterói", "Rio de Janeiro", "Brasil"],
            range: [colorNiteroi, colorRJ, colorBrasil],
          },
          title: "Local",
        },
        tooltip: [
          { field: "Ano", type: "ordinal" },
          { field: "Valor", type: "quantitative" },
          { field: "Local", type: "nominal" },
        ],
      },
    },
    {
      mark: {
        type: "text",
        align: "left",
        dx: 5,
        dy: -5,
      },
      encoding: {
        x: {
          field: "Ano",
          type: "ordinal",
        },
        y: {
          field: "Valor",
          type: "quantitative",
        },
        text: {
          field: "Valor",
          type: "quantitative",
        },
        color: {
          value: "black",
        },
      },
    },
  ],
  title: {
    text: "Evolução IDH Educação",
    fontSize: 20,
    font: "Arial",
    anchor: "middle",
    color: "#003366", // Azul Marinho para o título
  },
  config: {
    axis: {
      labelColor: "#333333",
      labelFont: "Arial",
      gridColor: "#e0e0e0",
      tickColor: "#333333",
    },
    background: "#f4f4f9",
  },
};

vegaEmbed("#Edu", plotEdu)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);

// Gráfico IDHM Renda

let DataRenda = [];

if (
  checkboxRenda.includes("Brasil") &&
  checkboxRenda.includes("Niterói") &&
  checkboxRenda.includes("Rio de Janeiro")
) {
  DataRenda = Renda_Nit.concat(Renda_Brasil, Renda_RJ);
} else if (
  checkboxRenda.includes("Rio de Janeiro") &&
  checkboxRenda.includes("Brasil")
) {
  DataRenda = Renda_RJ.concat(Renda_Brasil);
} else if (
  checkboxRenda.includes("Rio de Janeiro") &&
  checkboxRenda.includes("Niterói")
) {
  DataRenda = Renda_RJ.concat(Renda_Nit);
} else if (
  checkboxRenda.includes("Niterói") &&
  checkboxRenda.includes("Brasil")
) {
  DataRenda = Renda_Nit.concat(Renda_Brasil);
} else if (checkboxRenda.includes("Brasil")) {
  DataRenda = Renda_Brasil;
} else if (checkboxRenda.includes("Niterói")) {
  DataRenda = Renda_Nit;
} else if (checkboxRenda.includes("Rio de Janeiro")) {
  DataRenda = Renda_RJ;
}

let plotRenda = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 350,
  height: 250,
  data: {
    values: DataRenda,
  },
  layer: [
    {
      mark: {
        type: "line",
        point: {
          filled: true,
          size: 100, // Aumentando o tamanho do ponto
        },
        color: "#4CAF50",
        tooltip: true,
      },
      encoding: {
        x: {
          field: "Ano",
          type: "ordinal",
          title: "Ano",
          axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            labelAngle: 0,
            titleColor: "#333333",
          },
        },
        y: {
          field: "Valor",
          type: "quantitative",
          title: "IDH",
          axis: {
            labelFontSize: 12,
            titleFontSize: 14,
            titleColor: "#333333",
          },
          scale: { domain: [0.4, 1] },
        },
        color: {
          field: "Local",
          type: "nominal",
          scale: {
            domain: ["Niterói", "Rio de Janeiro", "Brasil"],
            range: [colorNiteroi, colorRJ, colorBrasil],
          },
          title: "Local",
        },
        tooltip: [
          { field: "Ano", type: "ordinal" },
          { field: "Valor", type: "quantitative" },
          { field: "Local", type: "nominal" },
        ],
      },
    },
    {
      mark: {
        type: "text",
        align: "left",
        dx: 5,
        dy: -5,
      },
      encoding: {
        x: {
          field: "Ano",
          type: "ordinal",
        },
        y: {
          field: "Valor",
          type: "quantitative",
        },
        text: {field: "Valor",
          type: "quantitative",
        },
        color: {
          value:"black",
        },
      },
    },
  ],
  title: {
    text: "Evolução IDH Renda",
    fontSize: 20,
    font: "Arial",
    anchor: "middle",
    color: "#003366", // Azul Marinho para o título
  },
  config: {
    axis: {
      labelColor: "#333333",
      labelFont: "Arial",
      gridColor: "#e0e0e0",
      tickColor: "#333333",
    },
    background: "#f4f4f9",
  },
};

vegaEmbed("#Renda", plotRenda)
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);
```
