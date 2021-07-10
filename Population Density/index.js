import {select, csv,scaleLinear,max,scaleBand,axisLeft,axisBottom,format} from 'd3';

const svg = select('svg');


const height = +svg.attr('height');
const width = parseFloat(svg.attr('width'));

const render = data => {
  
  const xValue = d => d.populationDensity;
  const yValue = d => d.country;
  const margin = {top : 40, right : 20,left : 130, bottom : 50};
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
  
  /*const xAxisTickFormat = number => 
  	format('.3s')(number)
  		.replace('G','B');*/
  
  const xAxis = axisBottom(xScale)
  	.tickSize(-innerHeight);
  
	svg.append('text')
  	.text('Population Density Unit(People/1000 x km²)')
  	.attr('transform',`translate(20,${height/2 + 200}) rotate(-90)`);
  	
  
  
  const g = svg.append('g')
  	.attr('transform',`translate(${margin.left},${margin.top})`);
  
  const text = svg.append('text')
  	.text('Top 20 Densest Cities or Regioins')
  	.attr('transform','translate(250,30)')
  	.attr('class','title');
  
  text.style("font-size", "30px");

  /*const text = svg.append('text')
  	.text('Top 10 Densest City Or Regioin');*/
  	
  /*text.style("font-size", "25px");	*/
  
  g.append('g').call(yAxis)
  	.selectAll('.domain, .tick line')
  	.remove();
  
  const xAxisG = g.append('g').call(xAxis)
  	.attr('transform',`translate(0,${innerHeight})`);
    
  
  xAxisG.select('.domain')
  	.remove();
  

  
  xAxisG.append('text')
  	.attr('y',40)
  	.attr('x',innerWidth / 2)
  	.attr('fill','black')
  	.text('Density');
  
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
