import {select, csv,scaleLinear,max,axisLeft,axisBottom,format,extent,scalePoint} from 'd3';


const svg = select('svg');


const height = +svg.attr('height');
const width = parseFloat(svg.attr('width'));

const render = data => {
  
  const title = 'GDP vs Population';
  
  const xValue = d => d.GDP_per_capita;
  const xAxisLabel = 'Population';
  
  const yValue = d => d.Population;
  const yAxisLabel = 'GDP per capita(thousand)';
  
  const margin = {top : 40, right : 20,left : 130, bottom : 50};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
	const xScale = scaleLinear()
  	.domain(extent(data,xValue))
		.range([0,innerWidth])
  	.nice();
  
  const yScale = scaleLinear()
  	.domain(extent(data,yValue))
  	//.domain(data.map(yValue))
    //.domain([0,max(data,yValue)])
  	.range([0,innerHeight])
  	.nice();
  
  const yAxis = axisLeft(yScale)
  	.tickSize(-innerWidth)
  	.tickPadding(10);
  

  
  const xAxis = axisBottom(xScale)
  	.tickSize(-innerHeight)
  	.tickPadding(10);
  
	svg.append('text')
  	.text(yAxisLabel)
  	.attr('transform',`translate(50,${height/2 + 100}) rotate(-90)`);
  	
  
  
  const g = svg.append('g')
  	.attr('transform',`translate(${margin.left},${margin.top})`);
  
  const text = svg.append('text')
  	.text(title)
  	.attr('transform',`translate(${innerWidth/2},24)`)
  	.attr('class','title');
  
  text.style("font-size", "30px");

  
  g.append('g').call(yAxis)
  	.selectAll('.domain')
  	.remove();
  
  const xAxisG = g.append('g').call(xAxis)
  	.attr('transform',`translate(0,${innerHeight})`);
    
  
  xAxisG.select('.domain')
  	.remove();
  

  
  xAxisG.append('text')
  	.attr('y',40)
  	.attr('x',innerWidth / 2)
  	.attr('fill','black')
  	.text(xAxisLabel + '(million)');
  
  
  
  g.selectAll('circle').data(data)
  	.enter().append('circle')
  		.attr('cy', d => yScale(yValue(d)))
  		.attr('cx',d => xScale(xValue(d)))
  		.attr('r',10);
  
};



csv('https://gist.githubusercontent.com/pineapple028/4f18e32e2c35e6f523d68a3389c617bf/raw/042e07d96d4804eb9ec953a41421b0698dd86641/Population_And_GDP_by_Country.csv').then(data => {
	data.forEach(d => {
    d.Population = +d.Population;   
  });
  
  render(data);
})


