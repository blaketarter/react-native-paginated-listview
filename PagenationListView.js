'use strict';

const React = require('react');

const {
  ListView,
} = require('react-native');

const PropTypes = {
  onFetch: React.PropTypes.func.isRequired,
  renderRow: React.PropTypes.func.isRequired,
  pageSize: React.PropTypes.number.isRequired,
  rowHasChanged: React.PropTypes.func,
  initialData: React.PropTypes.array,
  enableEmptySections: React.PropTypes.bool,
  renderSeperator: React.PropTypes.func,
  renderHeader: React.PropTypes.func,
  renderFooter: React.PropTypes.func,
  renderSectionHeader: React.PropTypes.func,
  scrollEnabled: React.PropTypes.bool,
  pagenationEnabled: React.PropTypes.bool,
  onChangeVisibleRows: React.PropTypes.func,
  renderScrollComponent: React.PropTypes.func,
};

const DefaultProps = {
  rowHasChanged: (r1, r2) => r1 !== r2,
  initialData: [],
  enableEmptySections: true,
  scrollEnabled: true,
  pagenationEnabled: true,
};

class PagenationListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.initialData.length ? 1 : 0,
      pageSize: this.props.pageSize,
      data: this.props.initialData,
      hasMoreData: true,
    };
  }

  componentDidMount() {
    if (!this.state.data.length) {
      this.fetchNewRowData();
    }
  }

  fetchNewRowData = () => {
    this.props.onFetch(this.state.page + 1, this.state.pageSize)
      .then((newData) => {
        if (newData && newData.length) {
          this.setState({
            page: this.state.page + 1,
            data: [...this.state.data, ...newData],
            hasMoreData: newData.length >= this.state.pageSize,
          });
        } else {
          this.setState({
            hasMoreData: false,
          });
        }
      });
  }

  onEndReached = () => {
    if (
      this.props.pagenationEnabled &&
      this.state.data.length &&
      this.state.hasMoreData
    ) {
      this.fetchNewRowData();
    }
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: this.props.rowHasChanged,
    });

    return (
      <ListView
        dataSource={ds.cloneWithRows(this.state.data)}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={50}

        renderRow={this.props.renderRow}
        style={this.props.style}
        enableEmptySections={this.props.enableEmptySections}
        renderSeparator={this.props.renderSeperator}
        renderHeader={this.props.renderHeader}
        renderFooter={this.props.renderFooter}
        renderSectionHeader={this.props.renderSectionHeader}
        onChangeVisibleRows={this.props.onChangeVisibleRows}
        renderScrollComponent={this.props.renderScrollComponent}
        scrollEnabled={this.props.scrollEnabled}
        pageSize={this.props.pageSize}

        { ...this.props }
      />
    );
  }
}

PagenationListView.propTypes = PropTypes;
PagenationListView.defaultProps = DefaultProps;

module.exports = PagenationListView;
