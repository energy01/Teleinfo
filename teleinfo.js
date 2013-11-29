
var start = new Date();

var totalBASE = 0;
var totalHP = 0;
var totalHC = 0;
var totalprix = 0;
var _animation = true;

var chart_elec1, chart_elec2, chart_elec3;
var chart_elec3_delay = 5000;
var chart1_data, chart2_data, chart3_data;

jQuery(function($) {
  Highcharts.setOptions({
    lang: {
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      decimalPoint: ',',
      thousandsSep: '.',
      rangeSelectorFrom: 'Du',
      rangeSelectorTo: 'au'
    },
    legend: {
      enabled: false
    },
    global: {
      useUTC: false
    }
  });
});

function init_chart1(data) {
  return {
    chart: {
      renderTo: 'chart1',
      animation: _animation,
      events: {
        load: function(chart) {
          this.setTitle(null, {
            text: 'Construit en '+ (new Date() - start) +'ms'
          });
          if ($('#chart1legende').length) {
            $("#chart1legende").html(data.subtitle);
          }
          this.debut=data.debut;
          init_chart1_navigation(data.duree, data.periode);
        }
      },
      borderColor: '#EBBA95',
      borderWidth: 2,
      borderRadius: 10,
      ignoreHiddenSeries: false
    },
    credits: {
      enabled: false
    },
    title: {
      text : data.title
    },
    subtitle: {
      text: 'Construit en...'
    },
    rangeSelector : {
      buttons : [{
        type : 'hour',
        count : 1,
        text : '1h'
      },{
        type : 'hour',
        count : 3,
        text : '3h'
      },{
        type : 'hour',
        count : 6,
        text : '6h'
      },{
        type : 'hour',
        count : 9,
        text : '9h'
      },{
        type : 'hour',
        count : 12,
        text : '12h'
      },{
        type : 'all',
        count : 1,
        text : 'All'
      }],
      selected : 5,
      inputEnabled : false
    },
    xAxis: {
      type: 'datetime',
       dateTimeLabelFormats: {
          hour: '%H:%M',
          day: '%H:%M',
          week: '%H:%M',
          month: '%H:%M'
       }
    },
    yAxis: [{
      labels: {
        formatter: function() {
           return this.value +' w';
        }
      },
      title: {
        text: 'Watt'
      },
      lineWidth: 2,
      showLastLabel: true,
      min: 0,
      alternateGridColor: '#FDFFD5',
      minorGridLineWidth: 0,
      plotLines : [{ // lignes min et max
        value : data.seuils.min,
        color : 'green',
        dashStyle : 'shortdash',
        width : 2,
        label : {
          text : 'minimum ' + data.seuils.min + 'w'
        }
      }, {
        value : data.seuils.max,
        color : 'red',
        dashStyle : 'shortdash',
        width : 2,
        label : {
          text : 'maximum ' + data.seuils.max + 'w'
        }
      }]
    }],

    series : [{
        name : data.HP_name,
        data : data.HP_data,
        id: 'HP',
        type : 'areaspline',
        threshold : null,
        tooltip : {
            yDecimals : 0
        },
        showInLegend: ((data.tarif_type == "HCHP")?true:false)
    }, {
        name : data.HC_name,
        data : data.HC_data,
        id: 'HC',
        type : 'areaspline',
        threshold : null,
        tooltip : {
            yDecimals : 0
        },
        showInLegend: ((data.tarif_type == "HCHP")?true:false)
    },
    /*{
        name : data.I_name,
        data: data.I_data,
        type: 'spline',
        width : 1,
        shape: 'squarepin'
    },*/
    {
        name : data.JPrec_name,
        data: data.JPrec_data,
        type: 'spline',
        width : 1,
        shape: 'squarepin',
        tooltip : {
            yDecimals : 0
        }
    }, {
        name : data.BASE_name,
        data : data.BASE_data,
        id: 'BASE',
        type : 'areaspline',
        threshold : null,
        tooltip : {
            yDecimals : 0
        },
        showInLegend: ((data.tarif_type == "HCHP")?false:true)
    }],
    legend: {
      enabled: true,
      borderColor: 'black',
      borderWidth: 1,
      shadow: true
    },
    navigator: {
      baseSeries: 2,
      top: 390,
      menuItemStyle: {
        fontSize: '10px'
      },
      series: {
        name: 'navigator',
        data: data.navigator
      }
    },
    scrollbar: { // scrollbar "stylée" grise
      barBackgroundColor: 'gray',
      barBorderRadius: 7,
      barBorderWidth: 0,
      buttonBackgroundColor: 'gray',
      buttonBorderWidth: 0,
      buttonBorderRadius: 7,
      trackBackgroundColor: 'none',
      trackBorderWidth: 1,
      trackBorderRadius: 8,
      trackBorderColor: '#CCC'
    },
  }
}

function init_chart2(data) {
  return {
    chart: {
      renderTo: 'chart2',
      animation: _animation,
      events: {
        load: function(chart) {
          this.setTitle(null, {
            text: 'Construit en '+ (new Date() - start) +'ms'
          });
          if ($('#chart2legende').length) {
            $("#chart2legende").html(data.subtitle);
          }
          this.debut=data.debut;
          init_chart2_navigation(data.duree, data.periode);
        }
      },
      defaultSeriesType: 'column',
      ignoreHiddenSeries: false
    },
    credits: {
      enabled: false
    },
    title: {
      text : data.title
    },
    subtitle: {
      text: 'Construit en...'
    },
    xAxis: [{
       categories: data.categories
    }],
    yAxis: {
      title: {
        text: 'kWh'
      },
      min: 0,
      minorGridLineWidth: 0,
      labels: { formatter: function() { return this.value +' kWh' } }
    },
    tooltip: {
      formatter: function() {
        if (this.series.name == 'Période Précédente') {
          //console.log(this);
          totalBASE=data.prix.BASE * data.PREC_data_detail[this.point.x][0];
          totalHP=data.prix.HP * data.PREC_data_detail[this.point.x][1];
          totalHC=data.prix.HC * data.PREC_data_detail[this.point.x][2];
          totalprix=Highcharts.numberFormat(( totalBASE + totalHP + totalHC + data.prix.abonnement ),2);
          
          tooltip = '<b>'+ this.series.name +'</b><br />';
          tooltip += '<b>'+ this.key + '</b><br />';
          tooltip += 'Total: '+ Highcharts.numberFormat(this.y, 2) +' kWh<br />';
          if (data.tarif_type != "HCHP") {
            tooltip += 'BASE : '+ data.PREC_data_detail[this.point.x][0] + ' kWh <br />';
            tooltip += 'BASE : '+ Highcharts.numberFormat(totalBASE,2) + ' Euro <br />';
          } else {
            tooltip += 'HP : '+ data.PREC_data_detail[this.point.x][1] + ' kWh / HC : ' + data.PREC_data_detail[this.point.x][1] + ' kWh<br />';
            tooltip += 'HP : '+ Highcharts.numberFormat(totalHP,2) + ' Euro / HC : ' + Highcharts.numberFormat(totalHC,2) + ' Euro<br />';
          }
          tooltip += '<b> Total: '+ totalprix +' Euro<b>';
        }
        else {
          totalBASE=data.prix.BASE*((this.series.name == 'Heures de Base')? this.y :this.point.stackTotal-this.y);
          totalHP=data.prix.HP*((this.series.name == 'Heures Pleines')? this.y :this.point.stackTotal-this.y);
          totalHC=data.prix.HC*((this.series.name == 'Heures Creuses')? this.y :this.point.stackTotal-this.y);
          totalprix=Highcharts.numberFormat(( totalBASE + totalHP + totalHC + data.prix.abonnement ),2);
          tooltip = '<b> '+ this.x +' </b><br /><b>'+ this.series.name +' '+ Highcharts.numberFormat(this.y, 2) +' kWh</b><br />';
          //tooltip += 'BASE : '+ Highcharts.numberFormat(totalBASE,2) + ' Euro / HP : '+ Highcharts.numberFormat(totalHP,2) + ' Euro / HC : ' + Highcharts.numberFormat(totalHC,2) + ' Euro<br />';
          if (data.tarif_type != "HCHP") {
            tooltip += 'BASE : '+ Highcharts.numberFormat(totalBASE,2) + ' Euro <br />';
          } else {
            tooltip += 'HP : '+ Highcharts.numberFormat(totalHP,2) + ' Euro / HC : ' + Highcharts.numberFormat(totalHC,2) + ' Euro<br />';
          }
          tooltip += 'Abonnement sur la période : '+ Highcharts.numberFormat(data.prix.abonnement,2) +' Euro<br />';
          tooltip += '<b> Total: '+ totalprix +' Euro<b>';
        }
        return tooltip;
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      }
    },
    series: [{
      name : data.HP_name,
      data : data.HP_data,
      stack : 'hphc',
      dataLabels: {
        enabled: true,
        color: '#FFFFFF',
        y: 13,
        formatter: function() {
          return this.y;
        },
        style: {
          font: 'normal 13px Verdana, sans-serif'
        }
      },
      type: 'column',
      showInLegend: ((data.tarif_type == "HCHP")?true:false)
    }, {
      name : data.HC_name,
      data : data.HC_data,
      stack : 'hphc',
      dataLabels: {
        enabled: true,
        color: '#FFFFFF',
        y: 13,
        formatter: function() {
          return this.y;
        },
        style: {
          font: 'normal 13px Verdana, sans-serif'
        }
      }
    }, {
      name : data.PREC_name,
      data : data.PREC_data,
      /*stack : 'prec',*/
      type: 'spline',
      /*type: 'scatter',
      width : 1,
      color : 'red',
      marker: {
          symbol: 'triangle-down',
          radius: 8,
          fillColor: null,
          lineWidth: 1,
          lineColor: null // inherit from series
      },*/
      /*threshold : null,
      tooltip : {
          yDecimals : 0
      }*/
    }, {
      name : data.BASE_name,
      data : data.BASE_data,
      stack : 'hphc',
      events: {
        click: function(e) {
          var newdate = new Date();
          newdate.setTime (data.debut);
          newdate.setDate(newdate.getDate()+e.point.x);
        }
      },
      dataLabels: {
        enabled: true,
        color: '#FFFFFF',
        y: 13,
        formatter: function() {
          return this.y;
        },
        style: {
          font: 'normal 13px Verdana, sans-serif'
        }
      },
      type: 'column',
      showInLegend: ((data.tarif_type == "HCHP")?false:true)
    }
    ],
    navigation: {
      menuItemStyle: {
        fontSize: '10px'
      }
    }
  }
}
function init_chart3(data) {
  return {
    chart: {
      renderTo: 'chart3',
      animation: _animation,
      events: {
        load: function(chart) {
          this.setTitle(null, {
            text: 'Construit en '+ (new Date() - start) +'ms<br />' + data.subtitle
          });
          $("#legend").html(data.legend);
        }
      },
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    credits: {
      enabled: false
    },
    title: {
      text : "Puissance instantanée" //data.title
    },
    subtitle: {
      text: 'Construit en...'
    },
    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },
    // the value axis
    yAxis: {
        min: 0,
        max: data.maxsousc,
        
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 5,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'Watt'
        },
        plotBands: [{
            id: "green",
            from: 0,
            to: data.maxGreen,
            color: '#55BF3B' // green
        }, {
            id: "yellow",
            from: data.maxGreen,
            to: data.maxYellow,
            color: '#DDDF0D' // yellow
        }, { 
            id: "red",
            from: data.maxYellow,
            to: data.max,
            color: '#DF5353' // red
        }, { 
            id: "black",
            from: data.max,
            to: data.maxsousc,
            color: '#000000' // black
        }]        
    },

    series: [{
        name: 'Puissance instantanée',
        data: [data.puissance],
        tooltip: {
            valueSuffix: ' Watt'
        }
    }]
  }
}
function init_chart4(data) {
  return {
    chart: {
      renderTo: 'chart4',
      animation: _animation,
      events: {
        load: function(chart) {
          this.setTitle(null, {
            text: 'Construit en '+ (new Date() - start) +'ms<br />Intensitée souscrite ' + data.i_compteur + ' A'
          });
        }
      },
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    credits: {
      enabled: false
    },
    title: {
      text : "Intensité instantanée" //data.title
    },
    subtitle: {
      text: 'Construit en...'
    },
    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },
    // the value axis
    yAxis: {
        min: 0,
        max: data.i_compteur,
        
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 5,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'Ampère'
        },
        plotBands: [{
            id: "green",
            from: 0,
            to: data.i_max_Green,
            color: '#55BF3B' // green
        }, {
            id: "yellow",
            from: data.i_max_Green,
            to: data.i_max_Yellow,
            color: '#DDDF0D' // yellow
        }, { 
            id: "red",
            from: data.i_max_Yellow,
            to: data.i_max,
            color: '#DF5353' // red
        }, { 
            id: "black",
            from: data.i_max,
            to: data.i_compteur,
            color: '#000000' // black
        }]        
    },

    series: [{
        name: 'Intensité instantanée',
        data: [data.intensite],
        tooltip: {
            valueSuffix: ' A'
        }
    }]
  }
}

function init_chart1_navigation() {
  // Libelles des boutons
  $(".button_chart1#chart1_date_prec").html("&laquo;&nbsp;- 24h");
  $(".button_chart1#chart1_date_now").html("Aujourd'hui");
  $(".button_chart1#chart1_date_suiv").html("+ 24h&nbsp;&raquo;");
}

function init_chart2_navigation(duree, periode) {
  switch (periode) {
    case ("jours"):
      var arrayDuree = new Array();
      for( i=1; i <= 31; i++){
        arrayDuree[i] = i;
      }
      txtdecalage="1 jour";
      break;
    case ("semaines"):
      var arrayDuree = new Array();
      for( i=1; i <= 52; i++){
        arrayDuree[i] = i;
      }
      txtdecalage="1 sem.";
      break;
    case ("mois"):
      var arrayDuree = new Array();
      for( i=1; i <= 12; i++){
        arrayDuree[i] = i;
      }
      txtdecalage="1 mois";
      break;
    case ("ans"):
      var arrayDuree = new Array();
      for( i=1; i <= 4; i++){
        arrayDuree[i] = i;
      }
      txtdecalage="1 an";
      break;
    default:
  }

  // Met à jour la liste déroulante "duree"
  var select = $('.select_chart2#duree');
  if(select.prop) {
    var options = select.prop('options');
  }
  else {
    var options = select.attr('options');
  }
  $('option', select).remove();
  $.each(arrayDuree, function(val, text) {
    if (val>0) {
      options[options.length] = new Option(text, val);
    };
  });

  // Valeurs par défaut
  $(".select_chart2#duree").val(duree);
  $('.select_chart2#duree').selectmenu('refresh', true);

  $(".select_chart2#periode").val(periode);
  $('.select_chart2#periode').selectmenu('refresh', true);
  
  // Libelles des boutons
  $(".button_chart2#chart2_date_prec").html("&laquo;&nbsp;- " + txtdecalage);
  $(".button_chart2#chart2_date_now").html("Aujourd'hui");
  $(".button_chart2#chart2_date_suiv").html("+ " + txtdecalage + "&nbsp;&raquo;");
}

function refresh_chart1(date) {
  // remise à zéro du chronomètre
  start = new Date();

  // on relance la requête daily
  parameters=(date?"&date="+date.getTime()/1000:"");
  $.getJSON('json.php?query=daily'+parameters, function(data) {
    // Remplacement du graphique
    chart_elec1= new Highcharts.StockChart(init_chart1(data));
    chart1_data = data;
  });
}

function refresh_chart2(duree, periode, date) {
  // remise à zéro du chronomètre
  start = new Date();

  // on relance la requête historique
  parameters=(duree?"&duree="+duree:"")+(periode?"&periode="+periode:"")+(date?"&date="+date.getTime()/1000:"");
  $.getJSON('json.php?query=history'+parameters, function(data) {
    // Remplacement du graphique
    chart_elec2 = new Highcharts.Chart(init_chart2(data));
    chart2_data = data;
  });
}

function refresh_chart3() {

  /*
  // on relance la requête historique
  $.getJSON('json.php?query=instant&nocache='+date.getTime(), function(data) {
    // Remplacement du graphique
    chart_elec3 = new Highcharts.Chart(init_chart3(data));
  });
  */

  setInterval(function () {
    // remise à zéro du chronomètre
    start = new Date();

    var point = chart_elec3.series[0].points[0];
    var point_i = chart_elec4.series[0].points[0];

    var max = 10000, imax = 0;
    if (chart1_data) max = chart1_data.seuils.max;

    $.getJSON('json.php?query=instant&max=' + max + '&imax='+ imax + '&nocache='+start.getTime(), function(data) {
      // Remplacement du graphique

      point.update(data.puissance);
      chart_elec3.setTitle(null, {
        text: 'Construit en '+ (new Date() - start) +'ms <br />' + data.subtitle
      });
      
      $("#legend").html(data.legend);

      point_i.update(data.intensite);
      chart_elec4.setTitle(null, {
        text: 'Construit en '+ (new Date() - start) +'ms<br />Intensitée souscrite ' + data.i_compteur + ' A / Intensitée maxi atteinte '+ data.i_max_atteinte + ' A'
      });
      // modif du max du graphique
      //if (chart_elec3.yAxis[0].max != data.maxsoursc ) {
        //chart_elec3.yAxis[0].setExtremes(0, data.max);
  
        var plotBands = chart_elec3.yAxis[0].plotLinesAndBands;
        for( i=0; i < plotBands.length; i++){
          if (plotBands[i].id == "green") {
            plotBands[i].options.from= 0;
            plotBands[i].options.to= data.maxGreen;
          }                                
          if (plotBands[i].id == "yellow") {
            plotBands[i].options.from= data.maxGreen;
            plotBands[i].options.to= data.maxYellow;
          }
          if (plotBands[i].id == "red") {
            plotBands[i].options.from = data.maxYellow;
            plotBands[i].options.to = data.max;
          }
        }
      //}

      chart3_data = data; 
    }); 
  }, chart_elec3_delay); // 10000 TODO à gérer autrement avec la donnée de config.php : $instant_delai envoyé par json.php : data.delai




}

function process_chart1_button(object) {
  //curdate = this.chart_elec1.series[0].xData[this.chart_elec1.series[0].xData.length-1];
  curdate = this.chart_elec1.debut;
  var newdate = new Date();
  newdate.setTime (curdate);
  switch (object.value)
  {
    case "1prec":
      newdate.setDate(newdate.getDate()-1);
      break;
    case "1suiv":
      newdate.setDate(newdate.getDate()+1);
      break;
    case "now":
      newdate = null;
      break;
  }

  refresh_chart1(newdate);
}

function process_chart2_button(object) {
  periode = $(".select_chart2#periode").val();
  duree = $(".select_chart2#duree").val();
  curdate = this.chart_elec2.debut;
  var newdate = new Date();
  newdate.setTime (curdate);
  // Teste si on doit changer de date
  //if (object.id.substring(0,4) == "date") {
      // Type de changement de date
      switch (object.value)
      {
        case "1prec":
          // on recule
          coefdate=-1;
          break;
        case "1suiv":
          // on avance
          coefdate=1;
          break;
        case "now":
          // retour à aujourd'hui
          newdate = null;
          break;
        default:
          // on ne change rien
          coefdate=0;
      }
      // Calcul du décalage de date
      if (newdate) {
        switch (periode) {
        case ("jours"):
          // décalage d'un jour
          newdate.setDate(newdate.getDate()+1*coefdate);
          break;
        case ("semaines"):
          // décalage d'une semaine
          newdate.setDate(newdate.getDate()+7*coefdate);
          break;
        case ("mois"):
          // décalage d'un mois
          newdate.setMonth(newdate.getMonth()+1*coefdate);
          break;
        case ("ans"):
          // décalage d'un an
          newdate.setMonth(newdate.getYear()+1*coefdate);
          break;
        default:
          // on ne change rien
          newdate.setDate(newdate.getDate());
        }
      }
  /*}
  else {
    newdate=null;
  }*/

  refresh_chart2(duree, periode, newdate);
};
 
function process_chart2_select(e, object){
  periode = $(".select_chart2#periode").val();
  duree = $(".select_chart2#duree").val();
  curdate = this.chart_elec2.debut;
  var newdate = new Date();
  newdate.setTime (curdate);

  if (periode == "ans") {
    duree = 1;
    $(".select_chart2#duree").val("1");
  }

  refresh_chart2(duree, periode, newdate);
}
    
$(document).ready(function() {
  // Initialisation jQueryUI button & selectmenu
  $('.button_chart1').button();
  $('.button_chart2').button();
  $('.select_chart2').selectmenu();

  // Options selectmenu
  $('.select_chart2').selectmenu({
    dropdown: false,
  });

  // Overflow : permet de limiter la hauteur des listes déroulantes (via css)
  $('.select_chart2').selectmenu("menuWidget").addClass("overflow");

  // Evènements boutons (click) et selectmenu (change)
  $('.button_chart1').click(
    function(){process_chart1_button(this)}
  );
  $('.button_chart2').click(
    function(){process_chart2_button(this)}
  );
  $('.select_chart2').selectmenu({
    change: function (e, object){process_chart2_select(e, object)}
  });
/*
  // Sablier durant les requêtes AJAX (style CSS à définir)
  $("html").bind("ajaxStart", function(){
    // Ajoute la classe CCS 'busy'
    $(this).addClass('busy');
    // Désactive les éléments de navigation
    $('.button_chart1').button("option", "disabled", true);
    $('.select_chart2').selectmenu("option", "disabled", true);
    $('.button_chart2').button("option", "disabled", true);
  }).bind("ajaxStop", function(){
    // Supprime la classe CCS 'busy'
    $(this).removeClass('busy');
    // Active les éléments de navigation
    $('.button_chart1').button("option", "disabled", false);
    $('.select_chart2').selectmenu("option", "disabled", false);
    $('.button_chart2').button("option", "disabled", false);
  });
*/

  // Crée le graphique 1 (daily)
  $.getJSON('json.php?query=daily', function(data) {
    chart_elec1 = new Highcharts.StockChart(init_chart1(data));
    chart1_data = data; // data.seuils.max
  });

  // Crée le graphique 2 (history)
  $.getJSON('json.php?query=history', function(data) {
    chart_elec2 = new Highcharts.Chart(init_chart2(data));
    chart2_data = data;
  });

  // Crée le graphique 3 (instant)
  var max = 10000, imax = 0;
  if (chart1_data) max = chart1_data.seuils.max;
  $.getJSON('json.php?query=instant&max=' + max + '&imax='+ imax, function(data) {
    chart_elec3 = new Highcharts.Chart(init_chart3(data));
    chart3_data = data;
    chart_elec3_delay = data.delai;
    chart_elec4 = new Highcharts.Chart(init_chart4(data));
  });
  refresh_chart3();
});
