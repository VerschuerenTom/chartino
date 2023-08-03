import * as d3 from "d3";
//TODO: Add events for when another charts zooms,brushes to update this one
export const drawBrush = (chartStructure, chart) => {
    var _a;
    if (chart.brush === undefined) {
        return;
    }
    if (chartStructure.brush === undefined) {
        chartStructure.brush = d3.brushX().extent([
            [chart.verticalAxis.offset.left, -1],
            [
                chart.getClientWidth() - chart.verticalAxis.offset.right,
                chart.getClientHeight() - chart.verticalAxis.offset.bottom - chart.verticalAxis.offset.top - 1,
            ],
        ]);
        chart.brush.domainLinker.setFullDomain(chart.timeDomain);
        chartStructure.brush.on("end", (event) => onBrushEnd(event, chart));
        chartStructure.brush.on("start brush", (event) => onBrush(event, chart, chartStructure));
        chartStructure.brushGroup = chartStructure.chartGroup
            .append("g")
            .attr("transform", "translate(0," + chart.verticalAxis.offset.top + ")")
            .attr("class", chart.getId() + "-brush")
            .call(chartStructure.brush);
        moveBrush(chartStructure, chart, chart.timeDomain);
        (_a = chart.brush) === null || _a === void 0 ? void 0 : _a.domainLinker.subscribe((domain) => moveBrush(chartStructure, chart, domain));
    }
};
const moveBrush = (chartStructure, chart, domain) => {
    const x1 = chart.timeScale(domain[0]);
    const x2 = chart.timeScale(domain[1]);
    chartStructure.brushGroup.call(chartStructure.brush.move, [x1, x2]);
};
const onBrushEnd = (event, chart) => {
    if (chart.brush === undefined)
        return;
    if (event.sourceEvent === undefined)
        return; // ignore brush-by-zoom
    const newDomain = event.selection.map(chart.timeScale.invert, chart.timeScale);
    chart.brush.domainLinker.pushDomain(newDomain);
};
const onBrush = (event, chart, structure) => {
    if (event.selection === null) {
        return;
    }
    //const sx = event.selection.map(chart.timeScale.invert);
    structure.getSvg().selectAll(".testing").remove();
    structure
        .getSvg()
        .append("rect")
        .attr("class", "testing")
        .attr("x", chart.verticalAxis.offset.left)
        .attr("y", chart.verticalAxis.offset.top)
        .attr("width", event.selection[0] - chart.verticalAxis.offset.left)
        .attr("height", chart.getClientHeight() - chart.horizontalAxis.offset.bottom - chart.verticalAxis.offset.top)
        .style("fill", "grey")
        .style("fill-opacity", "50%");
    structure
        .getSvg()
        .append("rect")
        .attr("class", "testing")
        .attr("x", event.selection[1])
        .attr("y", chart.verticalAxis.offset.top)
        .attr("width", chart.getClientWidth() - event.selection[1] - chart.horizontalAxis.offset.right)
        .attr("height", chart.getClientHeight() - chart.horizontalAxis.offset.bottom - chart.verticalAxis.offset.top)
        .style("fill", "grey")
        .style("fill-opacity", "50%");
};
