import {select, csv,scaleLinear,max,scaleBand,axisLeft,axisBottom} from 'd3';

const svg = select('svg');


const height = +svg.attr('height');
const width = parseFloat(svg.attr('width'));

const render = data => {
  
  const xValue = d => d.populationDensity;
  const yValue = d => d.country;
  const margin = {top : 20, right : 20,left : 130, bottom : 20};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
	const xScale = scaleLinear()
  	.domain([0,max(data,xValue)])
		.range([0,innerWidth]);
  
  const yScale = scaleBand()
  	.domain(data.map(yValue))
  	.range([0,innerHeight])
  	.padding(0.1);
  
  const yAxis = axisLeft(yScale);
  const xAxis = axisBottom(xScale);
  
	svg.append('text')
  	.text('Population Density Unit(People/1000 x km²)')
  	.attr('transform',`translate(20,${height/2 + 200}) rotate(-90)`)
  	
  	
  
  const g = svg.append('g')
  	.attr('transform',`translate(${margin.left},${margin.top})`);
  
  
  	
  
  g.append('g').call(yAxis);
  g.append('g').call(xAxis)
  	.attr('transform',`translate(0,${innerHeight})`);
  /*g.append('text')
		.text("hello")
  	.attr('transform',`translate(0,${innerHeight + 35})`);*/
  
  g.selectAll('rect').data(data)
  	.enter().append('rect')
  		.attr('y', d => yScale(yValue(d)))
  		.attr('width',d => xScale(xValue(d)))
  		.attr('height',yScale.bandwidth());
  
 
};



csv('data.csv').then(data => {
	data.forEach(d => {
  	d.populationDensity = d.populationDensity / 1000;
  });
  
  render(data);
})