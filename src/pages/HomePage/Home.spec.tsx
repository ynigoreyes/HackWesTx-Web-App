/* tslint:disable */
require('../../init-test')
import { mount, ReactWrapper } from 'enzyme'
import * as React from 'react'
import Home from './Home'
import { createStore } from 'redux';

const initState = () => {
  return {
    message: null,
    activeLocation: '/',
    currentTime: null,
  }
}

const store = createStore(initState, undefined)

test('Should mount', () => {
  const wrapper: ReactWrapper = mount(
    <Home store={store} />
  )
  expect(wrapper.exists()).toBe(true)
});
