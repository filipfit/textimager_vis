import * as d3 from 'd3';

export function histogram(chartData) {
  const height = 500;
  const svgHeight = height + 70;
  const barWidth = 30;
  const margin = 1;

  const values = d3.map(chartData, (d) => d.value);

  let scale = d3
    .scaleLinear()
    .domain([d3.min(values), d3.max(values)])
    .range([0, 500]);

  let svg = d3
    .create('svg')
    .attr('height', svgHeight)
    .attr('width', barWidth * chartData.length);

  let group = svg
    .selectAll('g')
    .data(chartData)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      return `translate(${i * barWidth}, ${height - scale(d.value)})`;
    });

  group
    .append('rect')
    .attr('height', function (d) {
      return scale(d.value);
    })
    .attr('width', barWidth - margin);

  const textGroup = svg
    .selectAll('g.text-group')
    .data(chartData)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      return `
      translate(${i * barWidth + barWidth / 2}, ${height})
      rotate(90)
      `;
    })
    .append('text')
    .text((d) => d.name)
    .attr('y', 8)
    .attr('x', 3);
  // .append('rect')
  // .attr('height', 5)
  // .attr('width', barWidth - margin)
  // .style('fill', 'red');

  // textGroup
  //   .attr(
  //     'transform',
  //     `
  //   rotate(0)
  //   translate(50, 0)
  //   `
  //   )
  // .append('rect')
  // .attr('height', 5)
  // .attr('width', 30)
  // .style('fill', 'red');

  return svg.node();
}
