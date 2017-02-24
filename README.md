react-native-pagenation-listview
=====
A simple pagenated react-native ListView with a few customization options, usefull
for working with pagenated data. It can either auto fetch data - like an infinite scrolling list -
or it can render a load more button and a loading spinner.

## Installation
`npm install react-native-pagenation-listview --save`

## Basic Usage
Import the component

`import PagenationListView from 'react-native-pagenation-listview'`

```js
<PagenationListView
  renderRow={(rowData) => {
    return (<Text>{rowData}</Text>);
  }}
  pageSize={10}
  onFetch={this.onFetch}
/>
```

## API
* `onFetch: function(pageNumber, pageSize)`
Method that return a promise and resolve the array of data to add to the ListView

* `pageSize: number`
The number of items in each page, needed so that the ListView knows when its reached the end of the data

* `initialData: array [optional]`
The initial data to populate the ListView with

* `pagenationEnabled: boolean [defaults to true]`
Whether or not pagenation is pagenationEnabled

* `autoFetch: boolean [defaults to true]`
Whether or not PagenationListView should auto fetch new data when it reaches the end

* `renderFetchMoreComponent: function [optional]`
A function that should return the component to be displayed when the end of the data is reached and auto fetch is set to false

* `renderLoadingComponent: function [optional]`
A function that should return the component to be displayed when data is loading
