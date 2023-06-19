import React from "react";
import { useMatches } from "react-router-dom";

function Breadcrumbs() {
  let matches = useMatches();
  console.log(matches)
  let [crumbs] = matches
    // first get rid of any matches that don't have handle and crumb
    .filter(match => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map(match => match.handle.crumb("teste"));

  return (
    <ol>
      {crumbs}
    </ol>
  );
}

export default Breadcrumbs;
