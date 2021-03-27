let firstGraphParam = {
    credits: {
        enabled: false
    },
    chart: {
        type: 'column'
    },
    title: {
        text: 'Динамика изменения состояния окружающей среды'
    },
    /*subtitle: {
        text: 'Source: WorldClimate.com'
    },*/
    xAxis: {
        categories: [
            '2017',
            '2018',
            '2019',
        ],
        //crosshair: true,
        gridLineWidth: 0.5,
        gridLineColor: '#C0C0C0'
    },
    yAxis: {
        gridLineColor: '#FF0000',
        gridLineWidth:1,
        min: 0,
        title: {
            text: 'Уровень загрязнения, %'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
        data: [49.9, 71.5, 90.4]

    }, {
        name: 'Водные объекты',
        color:'#0066CC',
        data: [83.6, 78.8, 98.5]

    }]
};




$(document).ready(function(){
  Highcharts.chart( 'first-graph', firstGraphParam );
  //Highcharts.chart( 'second-graph', firstGraphParam );
  //Highcharts.chart( 'third-graph', firstGraphParam );
});

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
  console.log(valOnRange);
});

$(document).on('change', '#mapType', function(){
  let mapType = $('#mapType').val();
  console.log(mapType);
});
