function updateDataGraph( nameRegion, data ){
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

$(document).on('change', '#mapType', function(){
  let mapType = $('#mapType').val();
  console.log(mapType);
});
