const React = require('react');
const {
  Text,
} = require('react-native');
const PaginatedListView = require('react-native-paginated-listview');

class Example extends React.Component {
  onFetch(page, count) {
    return new Promise((resolve, reject) => {
      switch (page) {
        case 1:
          setTimeout(() => resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 500);
          break;
        case 2:
          setTimeout(() => resolve([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), 500);
          break;
        case 3:
          setTimeout(() => resolve([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]), 500);
          break;
        case 4:
          setTimeout(() => resolve([31, 32, 33, 34, 35, 36, 37, 38, 39]), 500);
          break;
      }
    });
  }

  render() {
    return (
      <PaginatedListView
        style={{marginTop: 25}}
        renderRow={(rowData) => {
          return (<Text key={rowData} style={{
            height: 150,
            fontSize: 32,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontWeight: 'bold',
            backgroundColor: '#333',
            margin: 15,
            color: 'white',
          }}>{rowData}</Text>);
        }}
        itemsPerPage={10}
        onFetch={this.onFetch}
        // autoFetch={false}
      />
    );
  }
};

export default Example;
