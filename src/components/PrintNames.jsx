import React from "react";

const PrintNames = ({ list }) => {
  return (
    <ol>
      {list
        .sort((a, b) => a.localeCompare(b))
        .map((elm, idx) => (
          <li key={idx}>{elm}</li>
        ))}
    </ol>
  );
};

export default PrintNames;
