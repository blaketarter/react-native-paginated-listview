'use strict';

const React = require('react');

const {
  ListView,
  TouchableWithoutFeedback,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
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
  autoFetch: React.PropTypes.bool,
  renderFetchMoreComponent: React.PropTypes.func,
  renderLoadingComponent: React.PropTypes.func,
};

const DefaultProps = {
  rowHasChanged: (r1, r2) => r1 !== r2,
  initialData: [],
  enableEmptySections: true,
  scrollEnabled: true,
  pagenationEnabled: true,
  autoFetch: true,
  renderFetchMoreComponent: () => (
    <View style={styles.center}>
      <Text>Load More...</Text>
    </View>
  ),
  renderLoadingComponent: (isFetching) => (
    <View>
      <ActivityIndicator
        style={styles.center}
        animating={isFetching}
      />
    </View>
  ),
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class PagenationListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.initialData.length ? 1 : 0,
      pageSize: this.props.pageSize,
      data: this.props.initialData,
      hasMoreData: true,
      isFetching: this.props.initialData.length ? false : true,
    };
  }

  componentDidMount() {
    if (!this.state.data.length) {
      this.fetchNewRowData();
    }
  }

  fetchNewRowData = () => {
    this.setState({
      isFetching: true,
    });

    this.props.onFetch(this.state.page + 1, this.state.pageSize)
      .then((newData) => {
        if (newData && newData.length) {
          this.setState({
            page: this.state.page + 1,
            data: [...this.state.data, ...newData],
            hasMoreData: newData.length >= this.state.pageSize,
            isFetching: false,
          });
        } else {
          this.setState({
            hasMoreData: false,
            isFetching: false,
          });
        }
      });
  }

  onEndReached = () => {
    if (
      this.props.autoFetch &&
      this.props.pagenationEnabled &&
      this.state.data.length &&
      this.state.hasMoreData
    ) {
      this.fetchNewRowData();
    }
  }

  renderFetchMoreComponentWrapper = () => {
    if (
      !this.props.autoFetch &&
      this.props.pagenationEnabled &&
      this.state.isFetching
    ) {
      return this.props.renderLoadingComponent(this.state.isFetching);
    } else if (
      !this.props.autoFetch &&
      this.props.pagenationEnabled &&
      this.state.data.length &&
      this.state.hasMoreData
    ) {
      return (
        <TouchableWithoutFeedback onPress={this.fetchNewRowData}>
          <View>
            {this.props.renderFetchMoreComponent()}
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return null;
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
        renderFooter={this.props.autoFetch ? this.props.renderFooter : this.renderFetchMoreComponentWrapper}
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
