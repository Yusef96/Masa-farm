var targetChart = false;
var ctx2 = document.getElementById("chart-line");

export const initTargetProgress = (labels, data) => {
  if (ctx2 !== null) {
    if (!targetChart) ctx2 = ctx2.getContext("2d");

    if (targetChart) {
      targetChart.data.labels = labels;

      targetChart.data.datasets[0].data = data[0];
      targetChart.data.datasets[1].data = data[1];

      targetChart.update();
    } else {
      var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);

      gradientStroke1.addColorStop(1, "rgba(142,201,91,0.2)");
      gradientStroke1.addColorStop(0.2, "rgba(30,41,19,0.0)");
      gradientStroke1.addColorStop(0, "rgba(142,201,91,0)"); // green colors

      var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

      gradientStroke2.addColorStop(1, "rgba(30,41,19,0.2)");
      gradientStroke2.addColorStop(0.2, "rgba(30,41,19,0.0)");
      gradientStroke2.addColorStop(0, "rgba(30,41,19,0)"); // dark green colors

      targetChart = new Chart(ctx2, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Progress",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#8ec95b",
              borderWidth: 3,
              backgroundColor: gradientStroke1,
              fill: true,
              data: data[0],
              maxBarThickness: 6
            },
            {
              label: "Target",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#1e2913",
              borderWidth: 3,
              backgroundColor: gradientStroke2,
              fill: true,
              data: data[1],
              maxBarThickness: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          interaction: {
            intersect: false,
            mode: "index"
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5]
              },
              ticks: {
                display: true,
                padding: 10,
                color: "#b2b9bf",
                font: {
                  size: 14,
                  family: "Poppins",
                  style: "normal",
                  lineHeight: 2
                }
              }
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5]
              },
              ticks: {
                display: true,
                color: "#b2b9bf",
                padding: 20,
                font: {
                  size: 14,
                  family: "Poppins",
                  style: "normal",
                  lineHeight: 2
                }
              }
            }
          }
        }
      });
    }
  }
};
