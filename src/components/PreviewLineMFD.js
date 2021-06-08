import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
// import { Typography } from '@material-ui/core';

import { d0, d1, magRateData } from './PreviewMFD_data';

const PreviewMFD = () => {
  const ref = useRef(null);
  const data0 = magRateData(d0);
  const data1 = magRateData(d1);

  // const width = 800;
  // const height = 600;
  const margin = {top: 10, right: 10, bottom: 20, left: 50},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;  

  useEffect(() => {
    d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  }, [height, margin.bottom, margin.left, margin.right, margin.top , width]);

  useEffect(() => {
    draw();
  }); //, [data]

  const draw = () => {
    const svg = d3.select(ref.current);
    // console.log('DATA', data);
    // console.log('MAXDATA', maxData);

    // Add X axis 
    const x = d3.scaleLinear()
      .domain([5.0, 8.9])
      .range([margin.left , width]);
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLog()
      .domain([1e-9, 0.2])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', 'translate(' + margin.left + ')')
      .call(d3.axisLeft(y));

    //Add line 1, supraSeismo
    svg.append('path')
      .datum(data0)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 3)
      .attr('d', d3.line()
          .x((d) => x(d.mag))
          .y((d) => y(d.rate))
      );

    //Add line 2, subSeismo
    svg.append('path')
      .datum(data1)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-width', 3)
      .attr('d', d3.line()
          .x((d) => x(d.mag))
          .y((d) => y(d.rate))
    );

    // Handmade legend
    svg.append('circle').attr('cx', width-100).attr('cy', 30).attr('r', 6).style('fill', 'orange');
    svg.append('text').attr('x', width-80).attr('y', 36).text('sub-seismogenic').style('font-size', '15px');
    svg.attr('alignment-baseline', 'middle');
    svg.append('circle').attr('cx', width-100).attr('cy', 60).attr('r', 6).style('fill', 'steelblue');
    svg.append('text').attr('x', width-80).attr('y', 66).text('supra-seismogenic').style('font-size', '15px');
    svg.attr('alignment-baseline', 'middle');
  };

  return (
    <>
      <div>
        <h4>Named fault system: Wairarapa</h4>
        <p>Incremental participation rate by magnitude</p>
      </div>

      <div className="chart">
        <svg ref={ref}></svg>
      </div>
    </>
  );
};

export default PreviewMFD;
