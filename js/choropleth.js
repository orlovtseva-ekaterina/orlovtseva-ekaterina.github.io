var jsonObj = {};

let dataForGraphHighcharts = parseDataFromCSV();

let mapWidthMultiplier, fontWeightLegent;

// параметры в зависимости от размера и соотношения экрана
if( window.innerWidth >= 1025 ){
  // множитель ширины карты
  mapWidthMultiplier = 0.8;
  // размер шрифта подписи легенды
  fontWeightLegent = 0.8;
}
else {
  // множитель ширины карты
  mapWidthMultiplier = 0.9;
  // размер шрифта подписи легенды
  fontWeightLegent = 0.6;
}

if( window.innerHeight >= 769 ) {
  $('#legend-row').css('margin-top','-9%');//-15vh
}
else {
  $('#legend-row').css('margin-top','-13%');//-12vh
}

// shape of map
const width = mapWidthMultiplier*window.innerWidth; //1000;
const height = width/2; //500;

// color palette
var color = d3.scale.linear()
    .domain([77, 83])
    .range(["blue", "red"]);

// add div for messages
var div1 = d3.select("#my_dataviz1")
  .append("div")
  .attr("class", "tooltip_d3")
  .style("opacity", 0);

// add SVG
var svg1 = d3.select("#my_dataviz1")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("margin", "10px auto");

// create map projection
var projection = d3.geo.albers()
  .rotate([-105, 0])
  .center([-10, 65])
  .parallels([52, 64])
  .scale(0.7*width)
  .translate([width/2, height/2]);

var path = d3.geo.path().projection(projection);

// load data from JSON and CSV files
queue()
  .defer(d3.json, "../data/russia.json?v=1")
  .defer(d3.csv, "../data/dataset.csv?v=1")
  .await(ready);


function parseDataFromCSV() {
  let dataJSON = {};
  $.get("../data/dataset.csv", function(data) {
      let dataRaw = $.csv.toObjects(data);
      for( key in dataRaw ){
        if( !(dataRaw[key].iso3166_alpha2 in dataJSON) ){
          dataJSON[ dataRaw[key].iso3166_alpha2 ] = {
            name_ru: dataRaw[key]['name_ru'],
            life_expectancy: dataRaw[key]['life_expectancy'],
            cash_income_2020: dataRaw[key]['cash_income_2020'],
            real_disposable_cash_income_2020: dataRaw[key]['real_disposable_cash_income_2020'],
            gini_coefficient_2020: dataRaw[key]['gini_coefficient_2020'],
            funds_ratio_2020: dataRaw[key]['funds_ratio_2020'],
            cash_income_deficit_2020: dataRaw[key]['cash_income_deficit_2020'],
            decile_ratio_2019: dataRaw[key]['decile_ratio_2019'],
            population_with_monetary_incomes_below_the_subsistence_level: dataRaw[key]['population_with_monetary_incomes_below_the_subsistence_level'],
            healthy_life_expectancy_2019: dataRaw[key]['healthy_life_expectancy_2019'],
            number_of_higher_education_organizations: dataRaw[key]['number_of_higher_education_organizations'],
            number_of_higher_education_students: dataRaw[key]['number_of_higher_education_students'],
            indices_of__economy_2019: dataRaw[key]['indices_of__economy_2019'],
            environmental_quality_2020: dataRaw[key]['environmental_quality_2020']
          }
        }
      }
  });

  //console.log(dataJSON);

  return dataJSON;
}



// draw the map
function ready(error, map, data) {

  var values = {};
  var names = {};

  // fill arrays by data from CSV file
  data.forEach( function(d) {
    values[d.iso3166_alpha2] = d.life_expectancy;
    names[d.iso3166_alpha2] = d.name_ru;
  });

  // drawing choropleth
  features = topojson.feature(map, map.objects.name);
  _Global_features = features;

  // добавление
  svg1.append("g")
    .attr("class", "region")
    .selectAll("path")
    .data(features.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) {
      // if data are missed then grey color
      if(values[d.properties.iso] == null) {
        return '#eeeeee';
      }
      // else use palette
      else {
        return color(values[d.properties.iso]);
      }
    })
    .style("opacity", 0.8)

  // event listner for mouseover
  .on("mouseover", function(d) {
    d3.select(this).transition().duration(300).style("opacity", 1);
    div1.transition().duration(300).style("opacity", 1)
    div1.html(names[d.properties.iso] + "<br/><span style='font-size:16px;font-weight:700'>" + values[d.properties.iso] + "</span>")
      .style("left", (d3.event.layerX) + "px")
      .style("top", (d3.event.layerY - 30) + "px");
  })

  // event listner for mouseout
  .on("mouseout", function() {
    d3.select(this)
      .transition().duration(300)
      .style("opacity", 0.7);
    div1.transition().duration(300)
      .style("opacity", 0);
  })

  // event listner for click
  .on("click", function(d) {
    $("#overlay").fadeToggle('fast',function(){
      $("#box").animate({"right":"0"}, 500);
    });
    $("#name_region_head").text(names[d.properties.iso]);
    createTable(dataForGraphHighcharts, d.properties.iso);
  })

};



/*
// добавление легенды
var colorScale = d3.scale.linear()
  .domain([0, 50, 100]) // перечень значений из датасета(мин.–макс.), по которым надо добавлять цвет
  .range(['green', 'orange', 'red']); //Цвет, от какого и до какого нужно сделать растяжку
*/


/*
let widthLegendRow = $('#legend-row').width() * 35 / 100;
// append a defs (for definition) element to your SVG
var svgLegend = d3.select('#legend').append('svg')
  .attr("width", ( widthLegendRow-10 ))
  .attr("height", "5%");
var defs = svgLegend.append('defs');

// append a linearGradient element to the defs and give it a unique id
var linearGradient = defs.append('linearGradient')
  .attr('id', 'linear-gradient');

// создаем горизонтальный градиент
linearGradient
  .attr("x1", "0%")
  .attr("y1", "0%")
  .attr("x2", "100%")
  .attr("y2", "0%");

// append multiple color stops by using D3's data/enter step
linearGradient.selectAll("stop")
  .data([{
      offset: "0%",
      color: "green"
    },
    {
      offset: "50%",
      color: "orange"
    },
    {
      offset: "100%",
      color: "red"
    }
  ])
  .enter().append("stop")
  .attr("offset", function(d) {
    return d.offset;
  })
  .attr("stop-color", function(d) {
    return d.color;
  });

// добавление заголовка легенды
svgLegend.append("text")
  .attr("class", "legendTitle")
  .attr("x", 0)
  .attr("y", 20)
  .style("text-anchor", "left")
  .style("font-size", fontWeightLegent+"rem")
  .text("Уровень загрязнения %");

// отображение прямоугольника и заполнение градиентом
svgLegend.append("rect")
  .attr("x", 10)
  .attr("y", 30)
  .attr("width", ( widthLegendRow-50 ))
  .attr("height", '5%')
  .style("fill", "url(#linear-gradient)");

//create tick marks
var xLeg = d3.scale.linear()
  .domain([0, 100])
  .range([0, ( widthLegendRow-50 )]);

var axisLeg = d3.svg.axis(xLeg)
  .scale(xLeg).tickSize(13)
  .tickValues([0, 100])
  .tickFormat(function(n) {
    return n + "%"
  })


svgLegend
  .attr("class", "axis")
  .append("g")
  .attr("transform", "translate(10, 35)")
  .call(axisLeg);
*/
