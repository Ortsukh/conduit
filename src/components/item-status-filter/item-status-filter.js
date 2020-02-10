import React from "react";

import "./item-status-filter.css";

const ItemStatusFilter = () => {
  return (
    <div className="btn-group">
      <button type="button" className="all">
        All
      </button>
      <button type="button" className="active" onClick>
        Active
      </button>
      <button type="button" className="done">
        Done
      </button>
    </div>
  );
};

export default ItemStatusFilter;
