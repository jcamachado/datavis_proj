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

<div class="hero">
  <h1 style="margin-bottom: 50px;">IDH, Economia e Desigualdade</h1>
</div>

Você provavelmente já se deparou com anúncios destacando que Niterói tem o maior Índice de Desenvolvimento Humano (IDH) do estado do Rio de Janeiro. Mas você sabe o que realmente significa ter um alto IDH? Vamos explorar o que esse indicador representa.

<div style="background-color: #FFE5CC; padding: 20px; border: 1px solid #FF8C00; border-radius: 0px; box-shadow: 0 0 10px rgba(0,0,0,0.1); font-family: 'Arial', sans-serif; color: #333;">
    <b>O Índice de Desenvolvimento Humano (IDH)</b> é uma medida resumida do progresso a longo prazo em três dimensões básicas do desenvolvimento humano: renda, educação e saúde. O objetivo da criação do IDH foi o de oferecer um contraponto a outro indicador muito utilizado, o Produto Interno Bruto (PIB) per capita, que considera apenas a dimensão econômica do desenvolvimento. Criado por Mahbub ul Haq com a colaboração do economista indiano Amartya Sen, ganhador do Prêmio Nobel de Economia de 1998, o IDH pretende ser uma medida geral e sintética que, apesar de ampliar a perspectiva sobre o desenvolvimento humano, não abrange nem esgota todos os aspectos de desenvolvimento. (PNUD Brasil)
</div>

<b>Niterói possui o sétimo maior IDH do Brasil</b>, conforme os dados do censo do IBGE de 2010, e é <b>o primeiro no estado do Rio de Janeiro em termos de IDH</b>. O censo mais recente, realizado em 2022, sofreu atrasos devido à pandemia de COVID-19. O IDH é calculado pelo Programa das Nações Unidas para o Desenvolvimento (PNUD), que utiliza esses dados censitários para avaliar as condições de vida da população. Contudo, os dados do IDH referentes ao Censo de 2022 ainda não foram divulgados.

O mapa interativo a seguir facilita a visualização do IDH dos municípios do estado do Rio de Janeiro. Ao passar o cursor sobre cada município, você pode ver o IDH correspondente e comparar as diferenças visualmente com a ajuda de um gráfico de cores que indica os níveis de IDH.

<div style="width: 100%; margin-top: 15px;">
    <div id="ex01" style="width: 100%; margin-top: 15px;">
        ${ vl.render(plotMap(divWidth01 - 200, geojson, IDHM)) }
    </div>
</div>

O Censo Demográfico no Brasil é realizado idealmente a cada dez anos. Desde 1991, os dados começaram a ser divulgados digitalmente, facilitando significativamente o acesso. O gráfico a seguir mostra a evolução do IDH de Niterói ao longo do tempo, ilustrando as mudanças baseadas nos censos realizados de 1991 até 2010. Além disso, é possível comparar a evolução do IDH de Niterói com o IDH do Brasil e do estado do Rio de Janeiro, utilizando as opções disponíveis no checkbox.

<div style="width: 100%; margin-top: 15px;">
    <div id="ex01" style="width: 100%; margin-top: 15px;">
        ${ vl.render(plotLine(IDH_Nit,IDH_Brasil,IDH_RJ,checkboxIDH,"Evolução IDH ao Longo dos Anos", "Ano", "IDH", [0.4, 1])) }
    </div>
</div>

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

```js
let a = Inputs.checkbox(["red", "green", "blue"], {
  value: ["red"],
  label: html`<b>Colors</b>`,
  format: (x) =>
    html`<span
      style="text-transform: capitalize; border-bottom: solid 2px ${x}; margin-bottom:-2px;"
      >${x}</span
    >`,
});
```

Desde 2010, quando o Relatório de Desenvolvimento Humano completou 20 anos, novas metodologias foram incorporadas para o cálculo do IDH. Atualmente,três pilares constituem o IDH: <b>saúde, educação e renda</b>.

<div class="hero">
  <h2 style="margin-bottom: 20px; margin-top: 50px;">Saúde</h2>
</div>

Uma vida longa e saudável é medida pela expectativa de vida;

O IDH de longevidade, medido pela esperança de vida ao nascer, é um indicador de saúde e qualidade ambiental. Niterói se destaca nesse aspecto também, geralmente apresentando uma esperança de vida maior que a média estadual e nacional. Isso pode ser atribuído a um acesso superior a serviços de saúde, melhores condições de habitação, coleta de lixo e esgoto; ou seja, um ambiente mais saudável. Um alto IDH de longevidade em Niterói reflete o sucesso das políticas de saúde pública e a disponibilidade de infraestrutura de saúde adequada.

A esperança de vida e a longevidade são conceitos relacionados à saúde e ao bem-estar, mas têm significados diferentes. A esperança de vida ao nascer é a média de anos que um recém-nascido pode esperar viver se os padrões de mortalidade atuais permanecerem constantes ao longo de sua vida. A longevidade refere-se ao tempo de vida efetivo dos indivíduos, ou seja, a duração de vida real das pessoas dentro de uma população. Se em um país a esperança de vida ao nascer é de 75 anos, isso significa que, em média, os recém-nascidos esperam viver 75 anos, assumindo que as taxas de mortalidade atuais não mudem. Se uma pessoa vive até os 90 anos, sua longevidade é de 90 anos. Isso é uma medida observacional da duração de vida dessa pessoa específica. Em resumo, a esperança de vida é uma média estatística usada para prever a duração de vida com base em condições atuais, enquanto a longevidade é a medida observada da vida de indivíduos. Ambos são importantes para entender a saúde e o bem-estar de populações, mas servem a propósitos diferentes em estudos demográficos e de saúde pública.

<div style="display: flex; justify-content: space-around; width: 90%; margin-top: 15px;">
    <div id="ex01" style="width: 50%; margin-top: 15px;">
        ${ vl.render(plotLine(EspVida_Nit, EspVida_Brasil, EspVida_RJ, checkboxEspVida, "Esperança de Vida", "Ano", "Esperança de Vida", [60,90])) }
    </div>
    <div id="ex03" style="width: 50%; margin-top: 15px;">
        ${ vl.render(plotLine(Long_Nit, Long_Brasil, Long_RJ, checkboxEspVida, "IDHM Longevidade", "Ano", "IDHM Longevidade", [0.6,0.9])) }
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

O acesso ao conhecimento é medido por:
média de anos de educação de adultos, que é o número médio de anos de educação recebidos durante a vida por pessoas a partir de 25 anos; e
a expectativa de anos de escolaridade para crianças na idade de iniciar a vida escolar, que é o número total de anos de escolaridade que um criança na idade de iniciar a vida escolar pode esperar receber se os padrões prevalecentes de taxas de matrículas específicas por idade permanecerem os mesmos durante a vida da criança;

O IDH de educação é avaliado pela média de anos de estudo da população adulta e os anos esperados de escolaridade para crianças em idade escolar. Niterói, com sua renda relativamente alta e infraestrutura desenvolvida, geralmente apresenta um IDH de educação que excede os padrões do Rio de Janeiro e do Brasil. Isso indica uma maior taxa de matrículas escolares, melhor qualidade de ensino e maior acesso a recursos educacionais. A educação é fundamental para o desenvolvimento sustentável de uma região, influenciando diretamente outras áreas como renda e saúde.

<div style="width: 100%; margin-top: 15px;">
    <div id="ex01" style="width: 100%; margin-top: 15px;">
        ${ vl.render(plotLine(Edu_Nit,Edu_Brasil,Edu_RJ,checkboxEdu,"Evolução IDHM Educação ao Longo dos Anos", "Ano", "IDHM Educação", [0, 1])) }
    </div>
</div>

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

E o padrão de vida é medido pela Renda Nacional Bruta (RNB) per capita expressa em poder de paridade de compra (PPP) constante, em dólar, tendo 2005 como ano de referência. O IDH de renda reflete o padrão de vida econômico de uma área. Em Niterói, que tradicionalmente tem um dos maiores IDHs de renda do estado do Rio de Janeiro, isso indica um nível geral de riqueza e acesso a recursos econômicos superior à média estadual e, frequentemente, superior à média nacional. Uma renda per capita alta em Niterói sugere melhores oportunidades de emprego, salários mais altos e um mercado local mais robusto em comparação com outras partes do estado e do país.

<div style="width: 100%; margin-top: 15px;">
    <div id="ex01" style="width: 100%; margin-top: 15px;">
        ${ vl.render(plotLine(Renda_Nit,Renda_Brasil,Renda_RJ,checkboxRenda,"Evolução IDHM Renda ao Longo dos Anos", "Ano", "IDHM Educação", [0.5, 1])) }
    </div>
</div>

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

O IDH é uma medida média das conquistas de desenvolvimento humano básico em um país. Como todas as médias, o IDH mascara a desigualdade na distribuição do desenvolvimento humano entre a população no nível de país. O IDH 2010 introduziu o IDH Ajustado à Desigualdade (IDHAD), que leva em consideração a desigualdade em todas as três dimensões do IDH “descontando” o valor médio de cada dimensão de acordo com seu nível de desigualdade.

Com a introdução do IDHAD, o IDH tradicional pode ser visto como um índice de desenvolvimento humano “potencial” e o IDHAD como um índice do desenvolvimento humano “real”. A “perda” no desenvolvimento humano potencial devido à desigualdade é dada pela diferença entre o IDH e o IDHAD e pode ser expressa por um percentual.

O IDHM de uma região maior, como um estado ou o país inteiro, também é calculado com base nos mesmos indicadores, mas usando dados agregados de toda a população dessa região, e não como uma média simples dos IDHMs dos municípios. Portanto, enquanto o IDHM nacional reflete o desempenho médio do país nas dimensões de educação, saúde e renda, ele é influenciado pelo peso da população de cada município, região ou estado no conjunto de dados nacional. Assim, áreas mais populosas têm maior impacto no cálculo do IDHM do que áreas menos populosas.

Portanto, o IDHM do Brasil reflete uma visão agregada e ponderada dos indicadores de desenvolvimento humano em todo o território nacional, levando em consideração as variações regionais e locais no desenvolvimento humano, saúde, educação e condições econômicas.
Abaixo é possível observar os plots do IDHM e do IDHMAD do Estado do Rio de Janeiro e do Brasil, visto que estes valores não são calculados para os municípios. Os dados presentes são do ano de 2021, visto que o IDHAD começou a ser calculado a partir de 2013.

<!-- Adicionar mapa com IDH ajustado. -->

<div style="width: 100%; margin-top: 15px;">
    <div id="ex01" style="width: 100%; margin-top: 15px;">
        ${ vl.render(plotBars(radioboxLoc, dataRio, dataBrasil)) }
    </div>
</div>

```js
// Criar Radio Box
let radioboxLoc = view(
  Inputs.radio(["Brasil", "Rio de Janeiro (UF)"], {
    label: "Exibir dados: ",
    value: "Brasil",
  })
);
```

<!-- Adicionar gráfico Distribuição de Renda na cidade e comparar com RJ e país. -->

Niterói teve posição de destaque no Índice de Concorrência dos Municípios Brasileiros (ICM), levantamento feito pelo Ministério da Economia que avalia, de forma sistemática, contínua e estruturada o ambiente de negócios dos municípios brasileiros. A cidade ficou em 1º lugar entre os 92 municípios de todo o estado do Rio de Janeiro, firmou-se em 3º entre os 1.668 da Região Sudeste, e em 12º lugar no ranking geral.

A pesquisa foi enviada para 119 municípios brasileiros, totalizando 43% da população brasileira e o resultado foi informado na segunda-feira (9), pelo site do Ministério da Economia. Com a pontuação de 562,8, Niterói supera, até mesmo, a pontuação média nacional (473,9) e capitais como Rio de Janeiro (466,2) e São Paulo (532,58). O ICM tem como objetivo realizar uma avaliação, ampla e objetiva, do ambiente de negócios dos municípios brasileiros, visando, a partir dos resultados, contribuir na formulação de políticas públicas e direcionar as boas práticas observadas nas cidades.

```js
const geojson = await FileAttachment("Tabelas_panorama/geojs-33-mun.json").json(
  { typed: true }
);
const IDHM = await FileAttachment("Tabelas_panorama/RJ_IDHM.csv").csv();
```

```js
const divWidth01 = Generators.width(document.querySelector("#ex01"));
```

```js
function plotMap(divWidth, geojson, IDHM) {
  return {
    spec: {
      width: divWidth,
      height: 300,
      background: "#f4f4f9",
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
                fields: ["IDHM 2010"],
              },
            },
          ],
          mark: {
            type: "geoshape",
            stroke: "#BFBFBF",
            strokeWidth: 1,
          },
          encoding: {
            color: {
              field: "IDHM 2010",
              type: "quantitative",
              scale: { scheme: "reds" },
            },
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
              field: "IDHM 2010",
              type: "quantitative",
              scale: { scheme: "reds" },
            },
            tooltip: [
              { field: "properties.name", type: "nominal", title: "Cidade" },
              { field: "IDHM 2010", type: "quantitative", title: "IDHM" },
            ],
          },
        },
      ],
    },
  };
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
function plotLine(
  Nit,
  Brasil,
  RJ,
  selectedLocations,
  plottitle,
  xField,
  yField,
  yDomain
) {
  let Data = [];

  if (
    selectedLocations.includes("Brasil") &&
    selectedLocations.includes("Niterói") &&
    selectedLocations.includes("Rio de Janeiro")
  ) {
    Data = Nit.concat(Brasil, RJ);
  } else if (
    selectedLocations.includes("Rio de Janeiro") &&
    selectedLocations.includes("Brasil")
  ) {
    Data = RJ.concat(Brasil);
  } else if (
    selectedLocations.includes("Rio de Janeiro") &&
    selectedLocations.includes("Niterói")
  ) {
    Data = RJ.concat(Nit);
  } else if (
    selectedLocations.includes("Niterói") &&
    selectedLocations.includes("Brasil")
  ) {
    Data = Nit.concat(Brasil);
  } else if (selectedLocations.includes("Brasil")) {
    Data = Brasil;
  } else if (selectedLocations.includes("Niterói")) {
    Data = Nit;
  } else if (selectedLocations.includes("Rio de Janeiro")) {
    Data = RJ;
  }

  return {
    spec: {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      width: 350,
      height: 250,
      data: {
        values: Data,
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
              field: xField,
              type: "ordinal",
              title: xField,
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
              title: yField,
              axis: {
                labelFontSize: 12,
                titleFontSize: 14,
                titleColor: "#333333",
              },
              scale: { domain: yDomain },
            },
            color: {
              field: "Local",
              type: "nominal",
              scale: {
                domain: ["Niterói", "Rio de Janeiro", "Brasil"],
                range: ["#336699", "#668866", "#999999"],
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
              field: xField,
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
              field: "Local",
              type: "nominal",
            },
          },
        },
      ],
      title: {
        text: plottitle,
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
    },
  };
}
```

```js
const dataRio = [
  { Component: "Educação", Type: "IDHM", Value: 0.758 },
  { Component: "Educação", Type: "IDHMAD", Value: 0.681 },
  { Component: "Renda", Type: "IDHM", Value: 0.759 },
  { Component: "Renda", Type: "IDHMAD", Value: 0.438 },
  { Component: "Longevidade", Type: "IDHM", Value: 0.769 },
  { Component: "Longevidade", Type: "IDHMAD", Value: 0.696 },
  { Component: "IDH", Type: "IDHM", Value: 0.762 },
  { Component: "IDH", Type: "IDHMAD", Value: 0.592 },
];
const dataBrasil = [
  { Component: "Educação", Type: "IDHM", Value: 0.757 },
  { Component: "Educação", Type: "IDHMAD", Value: 0.64 },
  { Component: "Renda", Type: "IDHM", Value: 0.724 },
  { Component: "Renda", Type: "IDHMAD", Value: 0.436 },
  { Component: "Longevidade", Type: "IDHM", Value: 0.819 },
  { Component: "Longevidade", Type: "IDHMAD", Value: 0.74 },
  { Component: "IDH", Type: "IDHM", Value: 0.766 },
  { Component: "IDH", Type: "IDHMAD", Value: 0.591 },
];
```

```js
function plotBars(radioboxLoc, dataRio, dataBrasil) {
  const data = radioboxLoc === "Rio de Janeiro (UF)" ? dataRio : dataBrasil;
  return {
    spec: {
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
                domain: ["IDHM", "IDHMAD"],
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
    },
  };
}
```

```js
function plotBars01() {
  return {
    spec: {
      width: 400,
      height: 300,
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      description:
        "A bar chart with highlighting on hover and selecting on click. (Inspired by Tableau's interaction style.)",
      data: {
        values: [
          { IDH: "Educação", b: 0.8 },
          { IDH: "Longevidade", b: 0.9 },
          { IDH: "Renda", b: 0.7 },
          { IDH: "Calculado", b: 0.5 },
        ],
      },
      params: [
        {
          name: "highlight",
          select: { type: "point", on: "pointerover" },
        },
        { name: "select", select: "point" },
      ],
      mark: {
        type: "bar",
        fill: "#556b2f",
        stroke: "black",
        cursor: "pointer",
      },
      encoding: {
        x: { field: "IDH", type: "ordinal" },
        y: { field: "b", type: "quantitative" },
        fillOpacity: {
          condition: { param: "select", value: 1 },
          value: 0.3,
        },
        strokeWidth: {
          condition: [
            {
              param: "select",
              empty: false,
              value: 2,
            },
            {
              param: "highlight",
              empty: false,
              value: 1,
            },
          ],
          value: 0,
        },
      },
      config: {
        scale: {
          bandPaddingInner: 0.2,
        },
      },
    },
  };
}
```
