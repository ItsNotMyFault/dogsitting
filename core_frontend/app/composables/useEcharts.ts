export const useEcharts = () => {
  const createChart = async (container: HTMLElement, options: any) => {
    try {
      const echarts = await import("echarts");

      // Initialize chart instance
      const chart = echarts.init(container);

      // Set chart options
      chart.setOption(options);

      // Handle resize
      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener("resize", handleResize);

      // Store cleanup function
      const originalDispose = chart.dispose.bind(chart);
      chart.dispose = () => {
        window.removeEventListener("resize", handleResize);
        originalDispose();
      };

      return chart;
    } catch (error) {
      console.error("Error creating EChart:", error);
      return null;
    }
  };

  return {
    createChart
  };
};
