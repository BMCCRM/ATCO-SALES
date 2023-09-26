//[c3 charts Javascript]

//Project:	Riday - Responsive Admin Template
//Primary use:   Used only for the morris charts


$(function () {
    "use strict";
	
	
	
	
	 var n = c3.generate({
        bindto: "#column-oriented",
        size: { height: 350 },
        color: { pattern: ['#38649f', '#389f99', '#ee1044'] },
        data: {
            columns: [
                ['data1', 30, 20, 50, 40, 60, 50],
				['data2', 200, 130, 90, 240, 130, 220],
				['data3', 300, 200, 160, 400, 250, 250]
            ]
        },
        grid: { y: { show: !0 } }
    });
	
	
	
	
	var a = c3.generate({
        bindto: "#data-color",
        size: { height: 350 },
        data: {
            columns: [
                ['SITA MET', 7125],
				['ESPRA', 7114],
				['CRESTAT', 6012],
				['Jardy', 5959],
				['NABIZ', 5650],
				['MAXFLOW', 5637],
				['VALAM', 5581],
				['EXAPRO', 5428],
				['GABLIN Advance', 5419],
				['MIRABET', 5412],
				['YTIG Elite', 5302]
            ],
            type: "bar",
            
            color: function(a, o) { return o.id && "data3" === o.id ? d3.rgb(a).lighter(o.value / 50) : a }
        },
        grid: { y: { show: !0 } }
    });
	
	
	
	
	
	
	
	var o = c3.generate({
        bindto: "#row-oriented",
        size: { height: 350 },
        color: { pattern: ['#38649f', '#389f99', '#ee1044'] },
        data: {
            rows: [
                ['data1', 'data2', 'data3'],
				[90, 120, 300],
				[40, 160, 240],
				[50, 200, 290],
				[120, 160, 230],
				[80, 130, 300],
				[90, 220, 320],
            ]
        },
        grid: { y: { show: !0 } }
    });
	
	
	
	
	var o = c3.generate({
        bindto: "#category-data",
        size: { height: 350 },
        color: { pattern: ['#389f99', '#ee1044'] },
        data: {
            x: "x",
            columns: [
                ['x', 'Est Working Days', 'Working Days', 'Days In Field', 'DIF With Calls', 'Day With No Activity', 'Out Field Days'],
				['Days', 24, 8.5, 5.76, 5.76, 2.74, 18 ],
				
            ],
            groups: [
                ["Days"]
            ],
            type: "bar"
        },
        axis: { x: { type: "category" } },
        grid: { y: { show: !0 } }
    });
    var o = c3.generate({
        bindto: "#category-dataaz",
        size: { height: 350 },
        color: { pattern: [ '#ee1044'] },
        data: {
            x: "x",
            columns: [
                ['x', 'A+', 'A', 'B'],
				[' Coverage %', 3.73, 3.04, 12.19],
				
            ],
            groups: [
                [" Coverage %"]
            ],
            type: "bar"
        },
        axis: { x: { type: "category" } },
        grid: { y: { show: !0 } }
    });
    var o = c3.generate({
        bindto: "#category-dataal",
        size: { height: 350 },
        color: { pattern: ['#faa700']},
        data: {
            x: "x",
            columns: [
                ['x', 'A+', 'A', 'B'],
				['Days', 39.56, 41.98, 34.58],
				
            ],
            groups: [
                ["Days"]
            ],
            type: "bar"
        },
        axis: { x: { type: "category" } },
        grid: { y: { show: !0 } }
    });
  
	
	
    var o = c3.generate({
        bindto: "#category-datadata",
        size: { height: 350 },
        color: { pattern: ['#ee1044'] },
        data: {
            x: "x",
            columns: [
                ['x', 'No Of Doctor Assigned', 'No Of Submitted Request', 'No Of Pending Request', 'No Of Doctors Not Submint'],
				['Number', 24, 18, 10, 5,  ],
				
            ],
            groups: [
                ["Number"]
            ],
            type: "bar"
        },
        axis: { x: { type: "category" } },
        grid: { y: { show: !0 } }
    });
	
    
  });