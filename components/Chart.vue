<script>
import { HorizontalBar } from "vue-chartjs";

export default {
  props: ["chartLabels", "chartData"],
  mounted() {
    this.handleChartWidth();
    this.renderChart(this.data, this.options);
  },
  extends: HorizontalBar,
  name: "horizontal-bar-chart",
  data() {
    return {
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.chartData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "アンケート集計",
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
              },
              ticks: { mirror: true, padding: -10 },
            },
          ],
        },
      },
    };
  },
  methods: {
    handleChartWidth: function () {
      if (window.innerWidth < 400) {
        this.$refs.canvas.height = this.data.labels.length * 80;
      } else if (window.innerWidth < 500) {
        this.$refs.canvas.height = this.data.labels.length * 70;
      } else if (window.innerWidth < 600) {
        this.$refs.canvas.height = this.data.labels.length * 60;
      } else if (window.innerWidth < 700) {
        this.$refs.canvas.height = this.data.labels.length * 50;
      } else {
        this.$refs.canvas.height = this.data.labels.length * 40;
      }
    },
  },
};
</script>
