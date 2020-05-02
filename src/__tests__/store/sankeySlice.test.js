import {
  setSeriesData,
  setSeriesLink,
  updateDataPointName,
  removeDataPoint,
  removeDataLink
} from '../../features/sankey/sankeySlice'

import store from '../../app/store'

const getData = ({ options }) => {
  const { series: [ firstSeries ]  } = options
  return firstSeries
}

test('should dispatch action of create data point', async () => {
  const { data } = getData(store.getState())
  expect(data.length).toBe(0)
  const point = {
    name: 'usage',
    itemStyle: {
      normal: {
        color: 'dummy',
        borderColor: 'dummy'
      }
    }
  }
  await store.dispatch(setSeriesData(point))
  let updatedData = getData(store.getState()).data
  expect(updatedData.length).toBe(1)
  const point2 = {
    name: 'usage 2',
    itemStyle: {
      normal: {
        color: 'dummy',
        borderColor: 'dummy'
      }
    }
  }
  await store.dispatch(setSeriesData(point2))
  updatedData = getData(store.getState()).data
  expect(updatedData.length).toBe(2)
})

test('should dispatch action of create data point with duplicate', async () => {
  const { data } = getData(store.getState())
  expect(data.length).toBe(2)
  const point = {
    name: 'usage',
    itemStyle: {
      normal: {
        color: 'dummy',
        borderColor: 'dummy'
      }
    }
  }
  await store.dispatch(setSeriesData(point))
  const updatedData = getData(store.getState()).data
  expect(updatedData.length).toBe(2)
})

test('should dispatch action of create link point', async () => {
  const { links } = getData(store.getState())
  expect(links.length).toBe(0)
  let link = {
    source: 'usage',
    target: 'usage 2',
    total: 123
  }
  await store.dispatch(setSeriesLink(link))
  let updatedLinks = getData(store.getState()).links
  expect(updatedLinks.length).toBe(1)
  link = {
    source: 'usage 1',
    target: 'usage 3',
    total: 123
  }
  await store.dispatch(setSeriesLink(link))
  updatedLinks = getData(store.getState()).links
  expect(updatedLinks.length).toBe(2)
})

test('should dispatch action of updateDataPointName', async () => {
  const { data } = getData(store.getState())
  const [ index0 ] = data
  expect(index0.name).toBe('usage')
  await store.dispatch(updateDataPointName({ name: 'salary', index: 0 }))
  const updatedData = getData(store.getState()).data
  const [ updated0 ] = updatedData
  expect(updated0.name).toBe('salary')
})

test('should dispatch action of updateDataPointName', async () => {
  const { data } = getData(store.getState())
  const [ index0 ] = data
  expect(index0.name).toBe('salary')
  await store.dispatch(updateDataPointName({ name: 'usage 2', index: 0 }))
  const updatedData = getData(store.getState()).data
  const [ updated0 ] = updatedData
  expect(updated0.name).toBe('salary')
})

test('should dispatch action of removeDataPoint', async () => {
  let { data } = getData(store.getState())
  expect(data.length).toBe(2)
  await store.dispatch(removeDataPoint({ index: 0, name: 'usage 1', type: 'data' }))
  const updatedData = getData(store.getState()).data
  expect(updatedData.length).toBe(1)
})

test('should dispatch action of removeDataLink', async () => {
  let { links } = getData(store.getState())
  expect(links.length).toBe(1)
  await store.dispatch(removeDataLink({ index: 0 }))
  const updatedLinks = getData(store.getState()).links
  expect(updatedLinks.length).toBe(0)
})
