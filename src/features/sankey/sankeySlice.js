import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: {
    left: 'center'
  },
  backgroundColor: "#FFFFFF",
  series: [
    {
      type: "sankey",
      left: 50.0,
      top: 20.0,
      right: 150.0,
      bottom: 25.0,
      data: [],
      links: [],
      lineStyle: {
        color: "source",
        curveness: 0.5
      },
      itemStyle: {
        color: "#1f77b4",
        borderColor: "#1f77b4"
      },
      label: {
        color: "rgba(0,0,0,0.7)",
        fontFamily: "Arial",
        fontSize: 10
      }
    }],
  tooltip: {
    trigger: "item"
  }
}

const getDataAndLinks = (state) => {
  const { series: [ firstSeries ]  } = state
  return firstSeries
}

export const sankeySlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setSeriesData: (state, action) => {
      const { data } = getDataAndLinks(state)

      // Avoid the duplicate
      const isExists = data.find(point => point.name === action.payload.name)
      if (!isExists) {
        data.push(action.payload)
      }
    },
    setSeriesLink: (state, action) => {
      const { links } = getDataAndLinks(state)
      links.push(action.payload)
    },
    updateDataPointName: (state, { payload: { index, name } }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { data, links } = getDataAndLinks(state)
      // Avoid duplicates
      const isExists = data.find(point => point.name === name)
      if (isExists) {
        return
      }
      const oldName = data[index].name
      data[index].name = name
      const filteredLinks = links.filter(link => (link.source === oldName || link.target === oldName))
      filteredLinks.forEach(link => {
        link.source = link.source === oldName ? name : link.source
        link.target = link.target === oldName ? name : link.target
      });
    },
    removeDataPoint: (state, { payload: { index } }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { data, links } = getDataAndLinks(state)
      const oldName = data[index].name
      const filteredLinks = links.filter(link => (link.source === oldName || link.target === oldName))
      filteredLinks.forEach((link, index) => {
        links.splice(index, 1)
      })
      data.splice(index, 1)
    },
    removeDataLink: (state, { payload: { index } }) => {
      const { links } = getDataAndLinks(state)
      links.splice(index, 1)
    }
  },
});

export const { setSeriesData, setSeriesLink, updateDataPointName, removeDataPoint, removeDataLink } = sankeySlice.actions;

export const selectDataPoints = state => getDataAndLinks(state.options).data;
export const selectDataLinks = state => getDataAndLinks(state.options).links;
export const selectOptions = state => state.options;

export default sankeySlice.reducer;
