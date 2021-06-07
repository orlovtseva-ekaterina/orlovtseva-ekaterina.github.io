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
            indices_of_economy_2019: dataRaw[key]['indices_of_economy_2019'],
            environmental_quality_2020: dataRaw[key]['environmental_quality_2020']
          }
        }
      }
  });

  //console.log(dataJSON);

  return dataJSON;
}

let dataForGraphHighcharts = parseDataFromCSV();

var jsonObj = {};

//console.log(dataForGraphHighcharts);

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

// default color palette
var color = d3.scale.linear()
  .domain([0, 100])
  .range(["blue", "red"]);


function showMap() {

  if(Object.keys(dataForGraphHighcharts).length == 0) {
    setTimeout(showMap, 500);
    return;
  }

  let minVal = 1000000000.0;
  let maxVal = -1000000000.0;
  for(key in dataForGraphHighcharts) {
    if(key == 'RU') {
      continue;
    }
    if(dataForGraphHighcharts[key][mapType] == "") {
      continue;
    }
    val = 1.0*dataForGraphHighcharts[key][mapType];
    if(val < minVal) { minVal = val; }
    if(val > maxVal) { maxVal = val; }
  }

  // color palette
  color = d3.scale.linear()
    .domain([minVal, maxVal])
    .range(["blue", "red"]);

  // load data from JSON and CSV files
  queue()
    .defer(d3.json, "../data/russia.json")
    .defer(d3.csv, "../data/dataset.csv")
    .await(ready);

}


// draw the map
function ready(error, map, data) {

  var values = {};
  var names = {};

  // fill arrays by data from CSV file
  data.forEach( function(d) {
    values[d.iso3166_alpha2] = d[mapType];
    names[d.iso3166_alpha2] = d.name_ru;
  });

  // drawing choropleth
  features = topojson.feature(map, map.objects.name);
  _Global_features = features;

  // svg
  svg1.append("g")
    .attr("class", "region")
    .selectAll("path")
    .data(features.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) {
      // if data are missed then grey color
      if(values[d.properties.iso] == "") {
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
    var level = 'Нет данных';
    if(values[d.properties.iso] > 0) {
      level = values[d.properties.iso];
    }

    div1.html(names[d.properties.iso] + "<br/><span style='font-size:16px;font-weight:700'>" + level + "</span>")
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


showMap();
