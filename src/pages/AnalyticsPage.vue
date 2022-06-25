<template>
  <h1>Аналитика</h1>
  <div class="chart" ref="chartdiv">
    <h5 class="chart-title">Аналитика по визитам</h5>
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5locales_ru_RU from "@amcharts/amcharts5/locales/ru_RU"

export default {
  name: "HelloWorld",
  mounted() {

    if (!JSON.parse(localStorage.getItem("leadhit-site-id"))) {
      this.$router.push("auth")
    }

    // Create root element
    const root = am5.Root.new(this.$refs.chartdiv);
    root.setThemes([am5themes_Animated.new(root)]);
    root.locale = am5locales_ru_RU;

    // Create chart
    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
    }));


    // Add cursor
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // Create axes
    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.5,
      baseInterval: {
        timeUnit: "day",
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root, {
        pan: "zoom"
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 1,
      renderer: am5xy.AxisRendererY.new(root, {
        pan: "zoom"
      })
    }));

    // Add series
    const series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "visits",
      valueXField: "date",
      stroke: am5.color(0x7d00f4),
      fill: am5.color(0x7d00f4),
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: am5.Circle.new(root, {
          radius: 5,
          strokeWidth: 2,
          fill: series.get("fill")
        }),
      });
    });

    // Add scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    // Generate random data
    let data = this.$store.state.analytics.data.map(i => {
      return {
        ...i,
        date: new Date(i.date).getTime()
      }
    })
    series.data.setAll(data);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

  }
}

</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}

.chart-title {
  text-align: left;
  padding-left: 50px;
  font-weight: bold;
}
</style>