'use strict';

const React = require('react');

const {
  ListView,
  View,
  // ActivityIndicator,
} = require('react-native');

class PagenationListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.initialData ? 1 : 0,
      pageSize: this.props.pageSize || 10,
      data: this.props.initialData ? this.props.initialData : [],
      isRefreshing: false,
      hasMoreData: true,
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.data !== nextState.data;
  // }

  componentDidMount() {
    if (!this.props.initialData) {
      fetchNewRowData();
    }
  }

  fetchNewRowData() {
    this.setState({ isRefreshing: true });

    this.props.onFetch(this.state.page + 1, this.state.pageSize)
      .then((newData) => {
        if (newData && newData.length) {
          this.setState({
            isRefreshing: false,
            page: this.state.page + 1,
            data: [...this.state.data, ...newData],
            hasMoreData: newData.length >= this.state.pageSize,
          });
        } else {
          this.setState({
            isRefreshing: false,
            hasMoreData: false,
          });
        }
      });
  }

  renderFooter() {
    if (this.state.data.length && this.state.hasMoreData) {
      fetchNewRowData();
    }

    return (<View>{this.state.hasMoreData ? 'Loading...' : 'No more data'}</View>);
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: this.props.rowHasChanged ? this.props.rowHasChanged : (r1, r2) => r1 !== r2,
    });

    return (
      <ListView
        { ...this.props }
        enableEmptySections={this.props.enableEmptySections}
        renderRow={this.props.renderRow}
        dataSource={ds}
        renderFooter={this.renderFooter}
        style={this.props.style}
      />
    );
  }
}
