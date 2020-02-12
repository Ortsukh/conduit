import React from "react";

import "./item-status-filter.css";

const ItemStatusFilter = ({
  onfilterActive,
  onfilterAll,
  onfilterDone,
  todoData
}) => {
  return (
    <div className="btn-group">
      <button type="button" className="all" onClick={onfilterAll}>
        All
      </button>
      <button type="button" className="active" onClick={onfilterActive}>
        Active
      </button>
      <button type="button" className="done" onClick={onfilterDone}>
        Done
      </button>
    </div>
  );
};

export default ItemStatusFilter;
