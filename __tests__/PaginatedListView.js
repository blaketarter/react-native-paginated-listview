const { Text, ListView } = require('react-native');
const React = require('react');
const { shallow } = require('enzyme');
const renderer = require('react-test-renderer');

const PaginatedListView = require('../PaginatedListView');
const oneThroughTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('<PaginatedListView />', () => {
  it('Can render like a normal ListView', () => {
    const tree = renderer.create(
      <PaginatedListView
        renderRow={(data) => <Text>{data}</Text>}
        initialData={oneThroughTen}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();

    const wrapper = shallow(
      <PaginatedListView
        renderRow={(data) => <Text>{data}</Text>}
        initialData={oneThroughTen}
      />
    );
    
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find(ListView).length).toEqual(1);
  });
});
