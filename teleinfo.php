<?php
setlocale(LC_ALL , "fr_FR" );
date_default_timezone_set("Europe/Paris");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta content="no-cache" http-equiv="Pragma">

    <link rel="shortcut icon" href="./favicon.ico">

    <!--
      jquery-ui :
      recompilé avec selectmenu, à l'aide de :
          node.js (nvm / npm) & grunt
              sudo apt-get install npm
              sudo npm install grunt -g
              git clone https://github.com/jquery/jquery-ui.git --branch selectmenu
              cd jquery-ui
              npm install
              grunt build
    -->

    <link rel="stylesheet" href="./css/smoothness/jquery-ui-1.10.1pre.selectmenu.min.css">

    <script type="text/javascript" src="./js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="./js/jquery-ui-1.10.1pre.selectmenu.min.js"></script>

    <!-- Attention à l'ordre des déclarations -->
    <script type="text/javascript" src="./js/highcharts.js"></script>
    <script type="text/javascript" src="./js/highstock.js"></script>
    <script type="text/javascript" src="./js/highcharts-more.js"></script>

    <link rel="stylesheet" href="teleinfo.css">
    <script type='text/javascript' src="teleinfo.js"></script>

    <title>graph conso électrique</title>
</head>

<body>
  <div id="Menu">
    <h3>Téléinfo</h3>
  </div>
  <div id="instant" style="width: 800px; height: 320px;">
    <!-- <div id="chart5" style="width: 800px; height: 300px; margin: 0 auto"></div> -->
    <div id="chart3" style="width: 400px; height: 300px; float: left;"></div>
    <div id="chart4" style="width: 400px; height: 300px; float: left;"></div>
    <div id="legend" style="text-align: center;font-size: 1em;color: #cecece;text-shadow: 0px -1px 0px #FFFFFF;"></div>
  </div>
  <div id="daily" style="width: 900px;">
      <div style="text-align: center;">
          <button class="button_chart1" id="chart1_date_prec" value="1prec">&laquo;&nbsp;- 24h</button>
          <button class="button_chart1" id="chart1_date_now" value="now">Aujourd'hui</button>
          <button class="button_chart1" id="chart1_date_suiv" value="1suiv">+ 24h&nbsp;&raquo;</button>
      </div>
      <br />
    <div id="chart1" style="width: 900px; height: 500px; margin: 0 auto"></div>
  </div>
      <br /><br />
  <div id="history" style="width: 900px;">
      <div style="text-align: center;">
          <select class="select_chart2" id="duree">
              <option value="1">1</option>
              <option value="8">8</option>
              <option value="14">14</option>
          </select>
          <select class="select_chart2" id="periode">
              <option value="jours">Jour(s)</option>
              <option value="semaines">Semaine(s)</option>
              <option value="mois">Mois(s)</option>
              <option value="ans">An(s)</option>
          </select>
    
          <br />
          <button class="button_chart2" id="chart2_date_prec" value="1prec">&laquo;</button>
          <button class="button_chart2" id="chart2_date_now" value="now">Aujourd'hui</button>
          <button class="button_chart2" id="chart2_date_suiv" value="1suiv">&raquo;</button>
      </div>
      <br />
      <div id="chart2legende" style="text-align: center;" >Coût sur la période ...</div>
      <br />
      <div id="chart2" style="width: 900px; height: 400px; margin: 0 auto"></div>
  </div>
</body>
</html>
