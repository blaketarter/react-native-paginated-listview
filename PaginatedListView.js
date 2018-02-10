const React = require('react');

const {
  ListView,
  TouchableWithoutFeedback,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} = require('react-native');

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const DefaultProps = {
  rowHasChanged: (r1, r2) => r1 !== r2,
  initialData: [],
  enableEmptySections: true,
  scrollEnabled: true,
  paginationEnabled: true,
  autoFetch: true,
  renderFetchMoreComponent: () => (
    <View style={styles.center}>
      <Text>Load More...</Text>
    </View>
  ),
  renderLoadingComponent: isFetching => (
    <View>
      <ActivityIndicator
        style={styles.center}
        animating={isFetching}
      />
    </View>
  ),
};

class PaginatedListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.initialData.length ? 1 : 0,
      itemsPerPage: this.props.itemsPerPage,
      data: this.props.initialData,
      hasMoreData: true,
      isFetching: !this.props.initialData.length,
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

    this.props.onFetch(this.state.page + 1)
      .then((newData) => {
        if (newData && newData.length) {
          this.setState({
            page: this.state.page + 1,
            data: [...this.state.data, ...newData],
            hasMoreData: newData.length >= this.state.itemsPerPage,
            isFetching: false,
          });
        } else {
          this.props.onHasNoMoreData(this.state.page);
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
      this.props.paginationEnabled &&
      this.state.data.length &&
      this.state.hasMoreData
    ) {
      this.fetchNewRowData();
    }
  }

  renderFetchMoreComponentWrapper = () => {
    if (
      this.props.autoFetch &&
      this.props.paginationEnabled &&
      this.state.isFetching
    ) {
      return this.props.renderLoadingComponent(this.state.isFetching);
    } else if (
      !this.props.autoFetch &&
      this.props.paginationEnabled &&
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
        renderFooter={
          this.props.autoFetch ? this.props.renderFooter : this.renderFetchMoreComponentWrapper
        }
        renderSectionHeader={this.props.renderSectionHeader}
        onChangeVisibleRows={this.props.onChangeVisibleRows}
        renderScrollComponent={this.props.renderScrollComponent}
        scrollEnabled={this.props.scrollEnabled}
        itemsPerPage={this.props.itemsPerPage}

        { ...this.props }
      />
    );
  }
}

PaginatedListView.defaultProps = DefaultProps;

module.exports = PaginatedListView;
