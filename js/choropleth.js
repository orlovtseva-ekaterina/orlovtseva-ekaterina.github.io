let mapWidthMultiplier, fontWeightLegent;
// параметры в зависимости от размера и соотношения экрана
if( window.innerWidth >= 1025 ){
  // множитель ширины карты
  mapWidthMultiplier = 0.8;
  // размер шрифта подписи легенды
  fontWeightLegent = 0.8;
} else {
  // множитель ширины карты
  mapWidthMultiplier = 0.9;
  // размер шрифта подписи легенды
  fontWeightLegent = 0.6;
}

if( window.innerHeight >= 769 ){
  $('#legend-row').css('margin-top','-9%');/*-15vh*/
} else {
  $('#legend-row').css('margin-top','-13%');/*-12vh*/
}

// map dimension
const width = mapWidthMultiplier*window.innerWidth; //1000;
const height = width/2; //500;

// color palette
var color = d3.scale.linear()
    .domain([0, 50, 100])
    .range(["red", "orange", "green"]);

// добавление div для всплывающих подсказок
var div = d3.select("#my_dataviz")
  .append("div")
  .attr("class", "tooltip_d3")
  .style("opacity", 0);

// добавляем SVG для карты
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("margin", "10px auto");

// create map projection
var projection = d3.geo.albers()
  .rotate([-105, 0])
  .center([-10, 65])
  .parallels([52, 64])
  .scale(0.7*width) // масштаб картограммы внутри svg элемента
  .translate([width/2, height/2]);

var path = d3.geo.path().projection(projection);

// чтение данных из JSON и CSV-файлов
queue()
  .defer(d3.json, "/data/russia.json")
  .defer(d3.csv, "/data/envdataset.csv")
  .await(ready);

// отображение картограммы
function ready(error, map, data) {

  var rateById = {};
  var nameById = {};

  // fill arrays by data from CSV file
  data.forEach(function(d) {
    if(d.water_total != 0) {
      rateById[d.iso3166_alpha2] = Math.round(d.water_total*100);
    }
    nameById[d.iso3166_alpha2] = d.name_ru;
  });

  //Drawing Choropleth
  features = topojson.feature(map, map.objects.name);
  _Global_features = features;

  // добавление
  svg.append("g")
    .attr("class", "region")
    .selectAll("path")
    // .data(topojson.object(map, map.objects.russia).geometries)
    // .data(topojson.feature(map, map.objects.russia).features) //<-- in case topojson.v1.js
    .data(features.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) {
      return color(rateById[d.properties.ISO_2]);  // <<
    })
    .style("opacity", 0.8)

  // add event listners
  .on("mouseover", function(d) {
    d3.select(this).transition().duration(300).style("opacity", 1);
    div.transition().duration(300).style("opacity", 1)
    // вывод значений из датасета в подсказку
    div.html(nameById[d.properties.ISO_2] + "<br/>" + "<span style='font-size:18px;font-weight:700'>" + rateById[d.properties.ISO_2] + "%" + "</span>")
      .style("left", (d3.event.layerX) + "px")
      .style("top", (d3.event.layerY - 30) + "px");
  })
  .on("mouseout", function() {
    d3.select(this)
      .transition().duration(300)
      .style("opacity", 0.7);
    div.transition().duration(300)
      .style("opacity", 0);
  })
  .on("click", function(d) {
    $('#overlay').fadeToggle('fast',function(){
        $('#box').animate({'right':'0'},500);
    });
    $('#name_region_head').text( nameById[d.properties.ISO_2] );
    Highcharts.chart( 'first-graph', updateDataGraph( nameById[d.properties.ISO_2] ) );
  })

  // добавление городов на карту
  d3.tsv("/data/cities.tsv", function(error, data) {
    // создание массива данных о городах
    var city = svg.selectAll("g.city")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "city")
      .attr("transform", function(d) {
        return "translate(" + projection([d.lon, d.lat]) + ")";
      });
    // добавление точек на карту
    city.append("circle")
      .attr("r", 2)
      .style("fill", "red")
      .style("opacity", 0.75);
    // добавление названий городов на карту
    city.append("text")
      .attr("x", 5)
      .text(function(d) {
        return d.City;
      });
  });

};


/*
// добавление легенды
var colorScale = d3.scale.linear()
  .domain([0, 50, 100]) // перечень значений из датасета(мин.–макс.), по которым надо добавлять цвет
  .range(['green', 'orange', 'red']); //Цвет, от какого и до какого нужно сделать растяжку
*/

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
