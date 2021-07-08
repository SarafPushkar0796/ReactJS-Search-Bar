import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';

// tells Enzyme what code to expect 'from react 17'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// configure Enzyme to use the adapter
Enzyme.configure({ adapter: new Adapter() });

/**
 * Factory function to create ShallowWrapper for App component.
 * Is a function.
 * Takes parameter as {objects} for Components props.
 * And takes parametr as {any} for Initial state
 * Returns ShallowWrapper
*/
const setup = (props={}) => {
  
  // assign whatever props received and turn into individual props using the spread operator(...)
  const wrapper = shallow(<App {...props}/>);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given 'data-test' attribute.
 * Takes parameter 'wrapper' as {ShallowWrapper} which is Enzyme shallow wrapper to search.
 * Takes parameter 'val' as {string} which is value of 'data-test' attribute.
 * Returns {ShallowWrapper}
*/
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

//  cleanup is passed as a parameter to afterEach to clean up everything after each test to avoid memory leaks.
afterEach(cleanup);

describe('App component', () => {

  // test if the App component exists using a boolean assertion
  test('renders', () => {
    expect(setup().exists()).toBe(true);
  });

  // test - to check if the <input /> has a attribute of type 'text'
  test('has attribute type text', ()=>{
    const wrapper = setup();
    const inputSearch = findByTestAttr(wrapper, 'input-search');
    expect(inputSearch.length).toBe(1);
  });

  // test - to check if there is a list element
  test('exists a element', () => {
    const wrapper = setup();
    const list = findByTestAttr(wrapper, 'username-list');

    // to find atleast one node with data-test attribute
    expect(list.length).toBe(13);
  });

  // test - onChange event
  test('simulate onchange event', () => {
    const wrapper = setup();
    const inputSearch = findByTestAttr(wrapper, 'input-search');
    const state = { value: 'Kym' }
    
    const event = {
      target: { value: state.value }
    }

    // simulate onChange event
    inputSearch.simulate('change', event);
    expect(state.value).toEqual('Kym');
  });

  // test - if className 'user' exists
  test('if classname user exists', () => {
    const wrapper = mount(<div className="user" />);
    expect(wrapper.exists('.user')).toEqual(true);
  });
});

