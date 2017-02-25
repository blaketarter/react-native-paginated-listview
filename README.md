[![Build Status](https://travis-ci.org/blaketarter/react-native-paginated-listview.svg?branch=master)](https://travis-ci.org/blaketarter/react-native-paginated-listview)

react-native-paginated-listview
=====
A simple paginated react-native ListView with a few customization options, usefull
for working with paginated data. It can either auto fetch data - like an infinite scrolling list -
or it can render a "load more" button and a loading spinner.

## Installation
`npm install react-native-paginated-listview --save`

## Basic Usage
Import the component

`import PaginatedListView from 'react-native-paginated-listview'`

```js
<PaginatedListView
  renderRow={(rowData) => {
    return (<Text>{rowData}</Text>);
  }}
  pageSize={10}
  onFetch={this.onFetch}
/>
```

## API
* `onFetch: function(pageNumber)`
Method that return a promise and resolve the array of data to add to the ListView

* `itemsPerPage: number`
The number of items in each page, needed so that the ListView knows when its reached the end of the data

* `initialData: array [optional]`
The initial data to populate the ListView with

* `paginationEnabled: boolean [defaults to true]`
Whether or not pagination is enabled

* `autoFetch: boolean [defaults to true]`
Whether or not PaginatedListView should auto fetch new data when it reaches the end

* `renderFetchMoreComponent: function [optional]`
A function that should return the component to be displayed when the end of the data is reached and auto fetch is set to false

* `renderLoadingComponent: function [optional]`
A function that should return the component to be displayed when data is loading
