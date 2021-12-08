if (!gCharts) {  // Configure namespace if not already defined
    var gCharts = {};
}

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

gCharts.chart = function chart(sName, oParent) {
    // Forward send constructor
    gCharts.chart.base.constructor.call(this, sName, oParent);
    
    // Properties:
    this.prop(df.tString, "psTitle",      "");
    this.prop(df.tInt,    "piChartHeight", 0);
    this.prop(df.tInt,    "piChartWidth",  0);
    this.prop(df.tString, "psChartType",  "");
    
    // Private:
    this._eWrap         = null;
    this._eCols         = [];
    this._eData         = [];

    //  Configure super classes
    this._sControlClass = "chart";
};

df.defineClass("gCharts.chart", "df.WebBaseControl", {

    openHtml : function(aHtml) {
        // Forward send
        gCharts.chart.base.openHtml.call(this, aHtml);
        
        aHtml.push('<div class="chart-wrp">');
        aHtml.push('    <div id="', this.psHtmlId, 'chartDiv"', ' style="height: 100%;"></div>');
        aHtml.push('</div>');
    },
    
    afterRender : function() {
        this._eControl = df.dom.query(this._eElem, "div.chart-wrp > div");
        this._eWrap = df.dom.query(this._eElem, "div.chart-wrp");

        // Forward send
        gCharts.chart.base.afterRender.call(this);
    },

    initalize : function() {
        this._eCols = [];
        this._eData = [];
    },

    addColumn : function(sName, sType) {
        this._eCols.push([sType, sName]);
    },

    // addColumn : function(sName) {
    //     this._eCols.push(sName);
    // },

    addData : function(sName, nValue) {
        this._eData.push([sName, Number(nValue)]);
    },

    // addData : function() {
    //     args = [];

    //     for (var i = 0; i < arguments.length; i++) {
    //         if (i === 1) {
    //             args.push(Number(arguments[1]));
    //         }
    //         else {
    //             args.push(arguments[i]);
    //         }
    //     }

    //     this._eData.push(args);
    // },

    drawChart : function() {
        var obj = this;

        google.charts.setOnLoadCallback(function() {
            var data = new google.visualization.DataTable();
            var options, chart;

            for (var i = 0; i < obj._eCols.length; i++) {
                data.addColumn(obj._eCols[i][0], obj._eCols[i][1]);
            }

            data.addRows(obj._eData);

            // obj._eData.unshift(obj._eCols);

            // var data = google.visualization.arrayToDataTable(obj._eData);


            options = {
                title  : obj.psTitle,
                width  : obj.piChartWidth,
                height : obj.piChartHeight
            };

            chart = new google.visualization[obj.psChartType](obj._eControl);

            // switch (obj.psChartType) {
            //     case "PieChart":
            //         chart = new google.visualization[obj.psChartType](obj._eControl);
            //         break;
            //     case "BarChart":
            //         chart = new google.visualization.BarChart(obj._eControl);
            //         break;
            //     case "AreaChart":
            //         chart = new google.visualization.AreaChart(obj._eControl);
            //         break;
            //     case "ColChart":
            //         chart = new google.visualization.ColumnChart(obj._eControl);
            //         break;
            //     case "LineChart":
            //         chart = new google.visualization.LineChart(obj._eControl);
            //         break;
            //     case "ScatterChart":
            //         chart = new google.visualization.ScatterChart(obj._eControl);
            //         break;
            //     default:
            //         chart = new google.visualization.PieChart(obj._eControl);
            // }

            chart.draw(data, options);
        });
    }
    
});