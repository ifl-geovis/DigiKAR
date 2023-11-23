import { scaleOrdinal } from "d3";

const colorScaleAnsbach = scaleOrdinal<string>()
  .domain([
    "Hochstift Eichstätt",
    "Hochstift Würzburg",
    "Deutscher Orden",
    "Kurfürstentum Bayern",
    "Markgraftum Brandenburg-Ansbach",
    "Markgraftum Brandenburg-Bayreuth",
    "Gefürstete Grafschaft Hohenlohe-Schillingsfürst",
    "Reichsstadt Nürnberg",
    "Reichsstadt Rothenburg",
    "Reichsritterschaft (Kanton Altmühl)",
  ])
  .range([
    "blue",
    "blue",
    "lightblue",
    "red",
    "orange",
    "orange",
    "orange",
    "yellow",
    "yellow",
    "brown",
  ])
  .unknown("lightgrey");

export default colorScaleAnsbach;
