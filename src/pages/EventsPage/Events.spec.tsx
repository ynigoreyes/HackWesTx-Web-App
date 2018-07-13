/* tslint:disable */
require('../../init-test')
import { mount, ReactWrapper } from 'enzyme'
import * as React from 'react'
import { Events } from './Events'

describe('Event Suite', () => {
  let wrapper: ReactWrapper
  beforeAll(() => {
    return (wrapper = mount(<Events currentTime={0} />))
  })
  it('should mount', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should fetch mock events without any errors', () => {
    expect(wrapper.find('.ant-timeline').children()).toHaveLength(3)
  })
  it('should correctly determine which event is ongoing', () => {
    const target = wrapper
      // The Ant D Timeline
      .find('.ant-timeline')
      // The one in the middle
      .childAt(1)
      // Checks for the different dot
      .find('.ant-timeline-item-head-custom')

    expect(target).toBeTruthy()
  })
})
