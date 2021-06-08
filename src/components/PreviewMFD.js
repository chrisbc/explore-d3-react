import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

import { d0, onlyRate } from './PreviewMFD_data';

const PreviewMFD = () => {
  const ref = useRef();
  const data = onlyRate(d0); //[10, 40, 30, 20, 50, 10];
  const maxData = d3.max(data) || 0;
  const width = 800;
  const height = 600;

  console.log('DATA', data);

  useEffect(() => {
    d3.select(ref.current).attr('width', width).attr('height', height).style('border', '1px solid black');
  }, []);

  const draw = () => {
    const svg = d3.select(ref.current);
    const selection = svg.selectAll('rect').data(data);
    const yScale = d3
      .scaleLog()
      .domain([10e-9, maxData])
      .range([0, height - 100])

    selection.transition().duration(300);
    selection.attr('height', (d) => yScale(d));
    selection.attr('y', (d) => height - yScale(d));

    selection
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 15)
      .attr('y', (d) => height)
      .attr('width', 12)
      .attr('height', 0)
      .attr('fill', 'orange')
      .transition()
      .duration(800)
      .attr('height', (d) => yScale(d))
      .attr('y', (d) => height - yScale(d));

    selection
      .exit()
      .transition()
      .duration(300)
      .attr('y', (d) => height)
      .attr('height', 0)
      .remove();

    // Handmade legend
    svg.append('circle').attr('cx', 450).attr('cy', 30).attr('r', 6).style('fill', 'orange');
    svg.append('circle').attr('cx', 450).attr('cy', 60).attr('r', 6).style('fill', '#404080');
    svg.append('text').attr('x', 470).attr('y', 36).text('variable A').style('font-size', '15px');
    svg.attr('alignment-baseline', 'middle');
    svg.append('text').attr('x', 470).attr('y', 66).text('variable B').style('font-size', '15px');
    svg.attr('alignment-baseline', 'middle');
  };

  useEffect(() => {
    draw();
  });


  return (
    <>
      <div>
        Wairarapa
      </div>

      <div className="chart">
        <svg ref={ref}></svg>
      </div>
    </>
  );
};

export default PreviewMFD;
