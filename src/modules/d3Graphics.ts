import * as d3 from 'd3';
import { ColorCount } from '../models';
import { navigateTo } from './navigate';

type PieArc = d3.PieArcDatum<ColorCount>;

interface AnimatablePathElement extends SVGPathElement {
    _current: PieArc;
}

interface PixelData {
    timestamp: Date;
    pixelCount: number;
}

export function createColorCountPieChart(year: number, colorCounts: ColorCount[], chartContainerID: string, isLink: boolean, sliceClass: string) {
    //Setup Dimensions
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    //Create the SVG element
    const svg = d3.select(`#${chartContainerID}`)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
    //Select the custom HTML tooltip element
    const tooltip = d3.select("#tooltip");
    //Pie Generator
    const pie = d3.pie<any, ColorCount>()
        .sort(null)
        .value(d => d.count);
    //Arc Generator
    const arc = d3.arc<any, d3.PieArcDatum<ColorCount>>()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.9);
    //Generate the Pie Data
    const arcs = pie(colorCounts);
    //Draw the Slices (Paths)
    const g = svg.selectAll(".arc")
        .data(arcs)
        .enter().append("g")
        .attr("class", "arc");
    g.append("path")
        .attr("class", sliceClass)
        .style("fill", d => d.data.hex)
        //Initialize the current state for transition
        .each(function (d) {
            const self = this as AnimatablePathElement;
            self._current = { ...d, endAngle: d.startAngle };
        })
        //Apply the transition
        .transition()
        .duration(350)
        .delay((d, i) => i * 100)
        .attrTween("d", function (d) {
            const self = this as AnimatablePathElement;
            const i = d3.interpolate(self._current, d);
            self._current = i(1);

            return function (t) {
                return arc(i(t))!;
            };
        })
        .selection()
        .on("click", (event, d) => {
            if (isLink) {
                if (d.data.class === "white") {
                    navigateTo("/draw", { params: { "sentFrom": "home", "color": d.data.class, "background": "black" } });
                } else {
                    navigateTo("/draw", { params: { "sentFrom": "home", "color": d.data.class, "background": "white" } })
                }
            }
        })
        //ToolTip
        .selection()
        .on("mouseover", function (event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", 1)
            tooltip.html(`
                    <span class="font-bold">${d.data.label}</span><br>
                    ${d.data.count} pixels
                `);
            d3.select(this).style("stroke-width", "4px");
        })
        .on("mousemove", function (event, d) {
            tooltip.attr("class", d.data.class)
        })
        .on("mouseout", function () {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            d3.select(this).style("stroke-width", "2px");
        });
}

interface DataRow {
    timestamp: Date;
    pixelCount: number;
}

export function createLineGraph(csvUrl: string | DataRow[], chartContainerID: string) {
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

    async function createChart() {
        let rawData!: string | DataRow[];
        if (typeof csvUrl === "string") {
            rawData = await d3.csv(csvUrl, (d) => {
            return {
                timestamp: parseTime(d.timestamp!),
                pixelCount: +d.pixelCount!
            } as DataRow;
        });
        } else {
            rawData = csvUrl;
        }
        const svg = d3.select(chartContainerID)
            .append("svg")
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        const x = d3.scaleTime()
            .domain(d3.extent(rawData, d => d.timestamp) as [Date, Date])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.pixelCount) || 0])
            .nice()
            .range([height, 0]);
        const line = d3.line<DataRow>()
            .x(d => x(d.timestamp))
            .y(d => y(d.pixelCount))
            .curve(d3.curveMonotoneX);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5));

        svg.append("g")
            .call(d3.axisLeft(y));
        svg.append("path")
            .datum(rawData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);
    }

    createChart();
}