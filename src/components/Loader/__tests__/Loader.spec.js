import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Loader from '../../Loader';

describe('<Loader />', () => {
  it('should render show small loader when isLoading', () => {
    const wrapper = shallow(<Loader isLoading />);
    expect(wrapper.find('.loading-screen')).to.have.length(1);
  });
  it('should render show large loader when isBackgroundLoading', () => {
    const wrapper = shallow(<Loader isBackgroundLoading />);
    expect(wrapper.find('.mini-loading-screen')).to.have.length(1);
  });
  it('should render nothing when there is no loading', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.childAt(0).equals()).to.equal(true);
  });
});
