import React from "react";
import { Input, Slider, Checkbox, Button } from "antd";
const FilterBox = ({ dispatch, filter, onSearch }) => {
  const onKeywordChange = (e) => {
    dispatch({
      type: "SET_SEARCH",
      payload: e.target.value,
    });
  };
  const onChangeStatus = (e) => {
    dispatch({
      type: "SET_AVAILABLE_STATUS",
      payload: e.target.checked,
    });
  };
  const onChangePriceRange = ([min, max]) => {
    dispatch({
      type: "SET_PRICE_RANGE",
      payload: {
        min,
        max,
      },
    });
  };
  return (
    <div className="filter">
      <Input
        className="Search"
        placeholder="Find Products"
        value={filter.search}
        onChange={onKeywordChange}
      />
      <Checkbox checked={filter.availableOnly} onChange={onChangeStatus}>
        Only Available Products
      </Checkbox>
      <div>
        <label>Price: </label>
        <Slider
          value={[filter.price.min, filter.price.max]}
          range
          marks={{
            0: "$0",
            100: "$100",
          }}
          step={0.1}
          disabled={false}
          trackStyle={false}
          tooltipVisible={true}
          tooltipPlacement={"top"}
          tipFormatter={(value) => <span>${value}</span>}
          onChange={onChangePriceRange}
        />
      </div>
      <Button onClick={onSearch}>Search</Button>
    </div>
  );
};

export default FilterBox;
