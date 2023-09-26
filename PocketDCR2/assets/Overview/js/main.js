// -------------------------------------------------half donut chart--------------------
// Highcharts.chart('MeterContainer1', {
//   chart: {
//     plotBackgroundColor: null,
//     plotBorderWidth: 0,
//     plotShadow: false
//   },
//   title: {
//     text: '',
//     align: 'center',
//     verticalAlign: 'middle',
//     y: 40
//   },
//   color: ['#29b6f6','#0288d1','#0d47a1'],
//   tooltip: {
//     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//   },
//   plotOptions: {
//     pie: {
//       dataLabels: {
//         enabled: false,
//         // distance: -50,
//         // style: {
//         //   fontWeight: 'bold',
//         //   color: 'white'
//         // }
//       },
//       startAngle: -90,
//       endAngle: 90,
//       center: ['50%', '75%'],
//       size: '80%'
//     }
//   },
//   series: [{
//     type: 'pie',
//     name: 'Browser share',
//     innerSize: '50%',
//     color:['#29b6f6','#0288d1','#0d47a1'],
//     data: [
//       ['Chrome', 33.33],
//       ['Firefox', 33.33],
//       ['Internet Explorer', 33.33],      
//     ]     
//   }]
// });



// Highcharts.chart('MeterContainer2', {
//   chart: {
//     plotBackgroundColor: null,
//     plotBorderWidth: 0,
//     plotShadow: false
//   },
//   title: {
//     text: '',
//     align: 'center',
//     verticalAlign: 'middle',
//     y: 40
//   },
//   color: ['#29b6f6','#0288d1','#0d47a1'],
//   tooltip: {
//     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//   },
//   plotOptions: {
//     pie: {
//       dataLabels: {
//         enabled: false,
//         // distance: -50,
//         // style: {
//         //   fontWeight: 'bold',
//         //   color: 'white'
//         // }
//       },
//       startAngle: -90,
//       endAngle: 90,
//       center: ['50%', '75%'],
//       size: '80%'
//     }
//   },
//   series: [{
//     type: 'pie',
//     name: 'Browser share',
//     innerSize: '50%',
//     color:['#29b6f6','#0288d1','#0d47a1'],
//     data: [
//       ['Chrome', 33.33],
//       ['Firefox', 33.33],
//       ['Internet Explorer', 33.33],      
//     ]     
//   }]
// });




var gaugeOptions = {

  chart: {
    type: 'solidgauge'
  },

  title: null,

  pane: {
    center: ['50%', '85%'],
    // size: '100%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc'
    }
  },
  tooltip: {
    enabled: false
  },

  // the value axis
  yAxis: {
    stops: [
      [0.1, '#95CEFF'], // green
      [0.5, '#3AAFFF'], // yellow
      [0.9, '#1565C0'] // red
    ],
    lineWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    title: {
      y: -70
    },
    labels: {
      y: 16
    }
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        y: 5,
        borderWidth: 0,
        useHTML: true
      }
    }
  }
};

// The speed gauge
var chartSpeed = Highcharts.chart('MeterContainer1', Highcharts.merge(gaugeOptions, {
  yAxis: {
    min: 0,
    max: 200,
    title: {
      text: ''
    }
  },

  credits: {
    enabled: false
  },

  series: [{
    name: '',
    data: [200],
    dataLabels: {
      format: '<div style="text-align:center"><span style="font-size:25px;color:' +
        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
           '<span style="font-size:12px;color:silver"></span></div>'
    },
    tooltip: {
      valueSuffix: ' km/h'
    }
  }]

}));

// The RPM gauge
var chartRpm = Highcharts.chart('MeterContainer2', Highcharts.merge(gaugeOptions, {
  yAxis: {
    min: 0,
    max: 5,
    title: {
      text: ''
    }
  },

  series: [{
    name: 'RPM',
    data: [20],
    dataLabels: {
      format: '<div style="text-align:center"><span style="font-size:25px;color:' +
        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
           '<span style="font-size:12px;color:silver"></span></div>'
    },
    tooltip: {
      valueSuffix: ' revolutions/min'
    }
  }]

}));





//====================Counter

$('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
             $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
        }
    });
});



//===================DateTime


var dT = new Date();
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

var date = document.getElementById("date");
var time = document.getElementById("time");

function getDate() {
    date.innerHTML = monthNames[dT.getMonth()] + " " + dT.getDate() + ", " + dT.getFullYear();
}

function timer() {
    setTimeout(timer, 1000);
    var dT = new Date();
    var hours = dT.getHours();
    var minutes = dT.getMinutes();
    var ampm = hours <= 11 ? 'am' : 'pm';
    var strTime = [hours % 12,
                  (minutes < 10 ? "0" + minutes : minutes)
                  ].join(':') + ampm;
    time.innerHTML = strTime;
    setTimeout(timer, 1000);
}

getDate();
timer();





























// Highcharts.chart('container1', {
//     series: [{
//         name: 'BraveHeart',
//         data: [5, 3, 4, 7, 2]
//       }, {
//         name: 'Elite',
//         data: [2, 2, 3, 2, 1]
//       }, {
//         name: 'Nobel-A',
//         data: [3, 4, 4, 2, 5]
//       },{
//         name: 'Grand Total',
//         data: [10, 9, 11, 11, 8]
//       }],
//     colors: ['#3498db', '#2ecc71', '#e67e22', '#1abc9c', '#f1c40f',
// '#34495e', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
//     chart: {
//       type: 'column'
//     },
//     title: {
//       text: 'Group Wise Sales Analysis (Millions)'
//     },
//     yAxis: {
//       allowDecimals: false,
//       title: {
//         text: 'Units'
//       }
//     },
//     tooltip: {
//       formatter: function () {
//         return '<b>' + this.series.name + '</b><br/>' +
//           this.point.y + ' ' + this.point.name.toLowerCase();
//       }
//     }
//   });    






//      Highcharts.chart('container1', {
//   chart: {
//     type: 'column'
//   },
//   title: {
//     text: 'Weekly sales chart'
//   },
//   xAxis: {
//     categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
//   },
//   yAxis: {
//     min: 0,
//     title: {
//       text: 'Total fruit consumption'
//     },
//     stackLabels: {
//       enabled: true,
//       style: {
//         fontWeight: 'bold',
//         color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
//       }
//     }
//   },
//   legend: {
//     align: 'right',
//     x: -30,
//     verticalAlign: 'top',
//     y: 25,
//     floating: true,
//     backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
//     borderColor: '#CCC',
//     borderWidth: 1,
//     shadow: false
//   },
//   tooltip: {
//     headerFormat: '<b>{point.x}</b><br/>',
//     pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
//   },
//   plotOptions: {
//     column: {
//       stacking: 'normal',
//       dataLabels: {
//         enabled: true,
//         color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
//       }
//     }
//   },
//   series: [{
//     name: 'John',
//     data: [5, 3, 4, 7, 2]
//   }, {
//     name: 'Jane',
//     data: [2, 2, 3, 2, 1]
//   }, {
//     name: 'Joe',
//     data: [3, 4, 4, 2, 5]
//   }]
// });