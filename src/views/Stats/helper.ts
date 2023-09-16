export function updateLineChartData(resp: any, options: any, series: any) {
  const seriesData: any = resp.data
    .filter((item: { categories: any; data: any }) => {
      return (
        item &&
        item.data !== null &&
        item.data !== undefined &&
        isFinite(item.data)
      );
    })
    .map((item: { categories: any; data: any }) => {
      return { x: item.categories, y: item.data };
    });
  const yAxis = seriesData.map((item) => item.y);
  const maxYAxis = Math.ceil(Math.max.apply(null, yAxis)) + 1;
  const tickAmount = maxYAxis;
  options.value = {
    ...options.value,
    yaxis: {
      max: maxYAxis,
      tickAmount: tickAmount,
    },
  };
  series.value = [{ ...series.value[0], data: seriesData }];
}

export function updatePieChartData(resp: any, options: any, series: any) {
  const seriesData = [];
  const labels = [];
  for (const key of Object.keys(resp.data)) {
    seriesData.push(resp.data[key])
    labels.push(key);
  }
  options.value = { ...options.value, labels: labels };
  series.value = seriesData;
}
