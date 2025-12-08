import * as d3 from 'd3';
import { ColorCount } from '../models';

type PieArc = d3.PieArcDatum<ColorCount>;

interface AnimatablePathElement extends SVGPathElement {
    _current: PieArc;
}

export function createColorCountPieChart(year: number, colorCounts: ColorCount[], chartContainerID: string, isLink: boolean, sliceClass: string) {
    //Setup Dimensions
    console.log(`Colors for year: ${colorCounts.length}`);
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
        .style("fill", d => d.data.colorVariable)
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
                    if (d.data.colorName === "white") {
                        window.location.href = `draw.html?sentFrom=home&year=${year}&color=${d.data.colorName.replace(" ", "-")}&background=black`;
                    } else {
                        window.location.href = `draw.html?sentFrom=home&year=${year}&color=${d.data.colorName.replace(" ", "-")}`;
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
                    <span class="font-bold">${d.data.colorName}</span><br>
                    ${d.data.count} pixels
                `);
            d3.select(this).style("stroke-width", "4px");
        })
        .on("mousemove", function (event, d) {
            tooltip.attr("class", d.data.colorName.replace(" ", "-"))
        })
        .on("mouseout", function () {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            d3.select(this).style("stroke-width", "2px");
        });
}