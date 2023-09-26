//[widget morris charts Javascript]

//Project:	Riday - Responsive Admin Template
//Primary use:   Used only for the morris charts


$(function () {
    "use strict";

    Morris.Area({
        element: 'area-chart',
        data: [{
            period: '2010',
            data1: 55,
            data2: 85,
            data3: 25
        }, {
            period: '2011',
            data1: 135,
            data2: 105,
            data3: 85
        }, {
            period: '2012',
            data1: 85,
            data2: 65,
            data3: 75
        }, {
            period: '2013',
            data1: 75,
            data2: 205,
            data3: 145
        }, {
            period: '2014',
            data1: 185,
            data2: 155,
            data3: 145
        }, {
            period: '2015',
            data1: 110,
            data2: 105,
            data3: 85
        },
         {
            period: '2016',
            data1: 255,
            data2: 155,
            data3: 205
        }],
        xkey: 'period',
        ykeys: ['data1', 'data2', 'data3'],
        labels: ['Data 1', 'Data 2', 'Data 3'],
        pointSize: 3,
        fillOpacity: 0,
        pointStrokeColors:['#0bb2d4', '#17b3a3', '#3e8ef7'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 3,
        hideHover: 'auto',
        lineColors: ['#0bb2d4', '#17b3a3', '#3e8ef7'],
        resize: true
        
    });

Morris.Area({
        element: 'area-chart2',
        data: [{
            period: '2013',
            data1: 0,
            data2: 0,
            
        }, {
            period: '2014',
            data1: 135,
            data2: 105,
            
        }, {
            period: '2015',
            data1: 85,
            data2: 65,
            
        }, {
            period: '2016',
            data1: 75,
            data2: 205,
            
        }, {
            period: '2017',
            data1: 185,
            data2: 155,
            
        }, {
            period: '2018',
            data1: 110,
            data2: 95,
            
        },
         {
            period: '2019',
            data1: 255,
            data2: 155,
           
        }],
        xkey: 'period',
        ykeys: ['data1', 'data2'],
        labels: ['Data 1', 'Data 2'],
        pointSize: 0,
        fillOpacity: 0.4,
        pointStrokeColors:['#faa700', '#ff4c52'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 0,
        smooth: false,
        hideHover: 'auto',
        lineColors: ['#faa700', '#ff4c52'],
        resize: true
        
    });


// LINE CHART
        var line = new Morris.Line({
          element: 'line-chart',
          resize: true,
          data: [
            {y: '2016 Q1', data1: 2566},
            {y: '2016 Q2', data1: 2678},
            {y: '2016 Q3', data1: 4812},
            {y: '2016 Q4', data1: 3867},
            {y: '2017 Q1', data1: 6910},
            {y: '2017 Q2', data1: 5770},
            {y: '2017 Q3', data1: 4920},
            {y: '2017 Q4', data1: 15173},
            {y: '2018 Q1', data1: 11687},
            {y: '2018 Q2', data1: 8632}
          ],
          xkey: 'y',
          ykeys: ['data1'],
          labels: ['Data 1'],
          gridLineColor: '#eef0f2',
          lineColors: ['#0bb2d4'],
          lineWidth: 1,
          hideHover: 'auto'
        });
 // donut chart
        
    Morris.Donut({
        element: 'donut-chart111',
        data: [{
            label: "GP ",
            value: 8052,

        }
        , {
            label: "PHY",
            value: 3844,
        }
        , {
            label: "GYN",
            value: 2700,
        }
        , {
            label: "MO",
            value: 1733,
        }
        , {
            label: "CARDIO ",
            value: 1450,
        }
        , {
            label: "PEADS ",
            value: 1011,
        }
        , {
            label: "URO",
            value: 702,
        }],
        
        
        resize: true,
        colors:['#17b3a3', '#3e8ef7', '#ff4c52' , '#88016b', '#280188', '#015088',  '#884601']
    });


    
	Morris.Donut({
        element: 'donut-chart111az',
        data: [{
            label: "GP ",
            value: 8052,

        }
        , {
            label: "PHY",
            value: 3844,
        }
        , {
            label: "GYN",
            value: 2700,
        }
        , {
            label: "MO",
            value: 1733,
        }
        , {
            label: "CARDIO ",
            value: 1450,
        }
        , {
            label: "PEADS ",
            value: 1011,
        }
        , {
            label: "URO",
            value: 702,
        }],
        
        
        resize: true,
        colors:['#17b3a3', '#3e8ef7', '#ff4c52' , '#88016b', '#280188', '#015088',  '#884601']
    });
	
  });

    // bar chart11
    Morris.Bar({
        element: 'bar-chart11',
        data: [{
            y: '4+',
            a: 8,
            b: 10,
            c: 10
           
        }, {
            y: '3',
            a: 7,
            b: 10,
            c: 10
           
        }, {
            y: '2',
            a: 10,
            b: 10,
            c: 10
            
        }
        , {
            y: '1',
            a: 20,
            b: 20,
            c: 20
            
        }
        , {
            y: '0',
            a: 10,
            b: 10,
            c: 20
            
        }],
        xkey: 'y',
        ykeys: ['a' , 'b' , 'c'],
        labels: ['Class A+', 'Class A', 'Class B'],
        barColors:['#17b3a3', '#3e8ef7' , '#ff4c52'],
        hideHover: 'auto',
        gridLineColor: '#eef0f2',
        resize: true
    });


    
// bar chart
Morris.Bar({
    element: 'bar-chart1',
    data: [{
        y: 'A+',
        a: 80205,
        b: 6728
       
    }, {
        y: 'A',
        a: 741716,
        b: 45665
       
    }, {
        y: 'B',
        a: 0,
        b: 0
        
    }],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Target', 'Actual'],
    barColors:['#ff4c52', '#faa700'],
    hideHover: 'auto',
    gridLineColor: '#eef0f2',
    resize: true
});