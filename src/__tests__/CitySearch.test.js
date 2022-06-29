// src/__tests__/CitySearch.test.js

import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

describe("<CitySearch /> component", () => {
  let locations, CitySearchWrapperEl;
  beforeAll(() => {
    locations = extractLocations(mockData);
    CitySearchWrapperEl = shallow(
      <CitySearch locations={locations} updateEvents={() => {}} />
    );
  });

  test("renders a list of suggestions", () => {
    expect(CitySearchWrapperEl.find(".suggestions")).toHaveLength(1);
  });

  test("renders text input correctly", () => {
    const query = CitySearchWrapperEl.state("query");
    expect(CitySearchWrapperEl.find(".city").prop("value")).toBe(query);
  });

  test("change state when text input changes", () => {
    CitySearchWrapperEl.setState({
      query: "Munich",
    });
    const eventObject = { target: { value: "Berlin" } };
    CitySearchWrapperEl.find(".city").simulate("change", eventObject);
    expect(CitySearchWrapperEl.state("query")).toBe("Berlin");
  });

  test("render list of suggestions correctly", () => {
    const locations = extractLocations(mockData);
    CitySearchWrapperEl.setState({ suggestions: locations });
    const suggestions = CitySearchWrapperEl.state("suggestions");
    expect(CitySearchWrapperEl.find(".suggestions li")).toHaveLength(
      suggestions.length + 1
    );
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapperEl.find(".suggestions li").at(i).text()).toBe(
        suggestions[i]
      );
    }
  });

  test("suggestion list match the query when changed", () => {
    CitySearchWrapperEl.setState({ query: "", suggestions: [] });
    CitySearchWrapperEl.find(".city").simulate("change", {
      target: { value: "Berlin" },
    });
    const query = CitySearchWrapperEl.state("query");
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });
    expect(CitySearchWrapperEl.state("suggestions")).toEqual(filteredLocations);
  });

  test("selecting a suggestion should change query state", () => {
    CitySearchWrapperEl.setState({
      query: "Berlin",
    });
    const suggestions = CitySearchWrapperEl.state("suggestions");
    CitySearchWrapperEl.find(".suggestions li").at(0).simulate("click");
    expect(CitySearchWrapperEl.state("query")).toBe(suggestions[0]);
  });

  test("selecting CitySearch input reveals the suggestions list", () => {
    CitySearchWrapperEl.find(".city").simulate("focus");
    expect(CitySearchWrapperEl.state("showSuggestions")).toBe(true);
    expect(CitySearchWrapperEl.find(".suggestions").prop("style")).not.toEqual({
      display: "none",
    });
  });

  test("selecting a suggestion should hide the suggestions list", () => {
    console.log("CitySearchWrapperEl: ", CitySearchWrapperEl);
    CitySearchWrapperEl.setState({
      query: "Berlin",
      showSuggestions: undefined,
    });
    CitySearchWrapperEl.find(".suggestions li").at(0).simulate("click");
    expect(CitySearchWrapperEl.state("showSuggestions")).toBe(false);
    expect(CitySearchWrapperEl.find(".suggestions").prop("style")).toEqual({
      display: "none",
    });
  });
});
