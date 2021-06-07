let mapType = "life_expectancy";

let params = {
  life_expectancy: "Ожидаемая продолжительность жизни при рождении, лет",
  cash_income_2020: "Денежные доходы (2020), рубль",
  real_disposable_cash_income_2020: "Реальные располагаемые денежные доходы (2020), проценты",
  gini_coefficient_2020: "Коэффициент Джини (2020)",
  funds_ratio_2020: "Коэффициент фондов (2020)",
  cash_income_deficit_2020: "Дефицит денежного дохода (2020), проценты",
  decile_ratio_2019: "Децильный коэффициент  (2019)",
  population_with_monetary_incomes_below_the_subsistence_level: "Численность населения с денежными доходами ниже величины прожиточного минимума, проценты",
  healthy_life_expectancy_2019: "Ожидаемая продолжительность здоровой жизни (2019), лет",
  number_of_higher_education_organizations: "Число самостоятельных организаций высшего образования (бакалавриат, специалитет, магистратура), штук",
  number_of_higher_education_students: "Численность студентов высшего образования (бакалавриат, специалитет, магистратура), человек",
  indices_of_economy_2019: "Индексы физического объема валового регионального продукта и валовой добавленной стоимости (2019), проценты",
  environmental_quality_2020: "Качество окружающей среды (2020), проценты"
}

function updateDataGraph( nameRegion, data ) {
  let firstGraphParam = {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Динамика изменения уровня загрязнения окружающей среды: '+ nameRegion
      },
      xAxis: {
          categories: data.date,//['2017','2018','2019']
          title:{
            text:'Год'
          }
      },
      yAxis: {
          min: 0,
          format: '{} %',
          title: {
              text: 'Уровень загрязнения, %'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:0.8rem">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Атмосферный воздух',
          color:'#99CCFF',
          data: data.air_total//будет data.air_total[49.9, 71.5, 90.4]

      }, {
          name: 'Водные объекты',
          color:'#0066CC',
          data: data.water_total//будет data.water_total[83.6, 78.8, 98.5]

      }],
      credits: {
          enabled: false
      }
  };
  return firstGraphParam;
}

$(document).on('click', '#boxclose', function(){
  $('#overlay').fadeToggle('fast',function(){
      $('#box').animate({'right':'-101vw'},500);
  });
});

$(document).on('click', '.overlay', function(){
  $('#overlay').fadeToggle('fast',function(){
      $('#box').animate({'right':'-101vw'},500);
  });
});

$(document).on('change','#yearRange',function(){
  let valOnRange = $('#yearRange').val();
  $(this).next().children().children().removeClass('selected-value');
  $('#'+valOnRange).addClass('selected-value');
  console.log(valOnRange);
});

$(document).on('change', '#mapType', function() {
  // update global variable
  mapType = $('#mapType').val();
  console.log(mapType);
  showMap();
  /*
  if( mapType == 'air' ){
    $('#my_dataviz2').hide();
    $('#my_dataviz1').show();
  }
  else if( mapType == 'water' ){
    $('#my_dataviz1').hide();
    $('#my_dataviz2').show();
  }
  */
});


$(document).on('click', '#save_changes', function() {
  checked = {};
  $('#modal_form input:checkbox:checked').each( function() {
    checked[$(this).attr('id')] = $(this).val();
  });
  $('#exampleModal').modal('hide');
});

function createTable(data, region_code) {

  let checked = {};
  $('#modal_form input:checkbox:checked').each( function() {
    checked[$(this).attr('id')] = $(this).val();
  });

  $("#table_body").children().remove();

  for(key in data[region_code]) {
    if(key == 'name_ru') {
      continue
    }
    if(Object.keys(checked).includes(key)) {
      $("#table_body").append("<tr><td>"+params[key]+"</td><td>"+data[region_code][key]+"</td><td>"+data['RU'][key]+"</td></tr>");
    }
  }
}



