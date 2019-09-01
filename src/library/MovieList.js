import React from 'react';
import { 
  ActivityIndicator,
  FlatList, 
  Text, 
  View, 
  RefreshControl,
  StyleSheet, 
  Image 
} from 'react-native';

import PosterListItem from 'library/PosterListItem';

import PropTypes from 'prop-types';

/**
* Displays a list of PosterListItems. Each item shows a 
* movie's title, release date and main poster.
* see PropTypes for required props.
*/
class MovieList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, 
      movies: [], 
      page: 1, 
      totalPages: 1
    }
    this.loadMore = this.loadMore.bind(this);
  }

  /**
  * setup the list once it has been mounted
  */
  componentDidMount() {
    
    this.updateList();
  }

  /**
  * calls the props.loadData function, giving it the current
  * page being displayed (for use when downloading a page at a time).
  * Ensure the loadData function returns the correct object:
  * {
  *   results:      [movie_objects],
  *   page:         current downloaded page,
  *   total_pages:  total amount of available pages
  * }
  */
  async updateList(currentPage = 1) {
    this.setState({isLoading: true});
    var { results, page, total_pages } = await this.props.loadData(currentPage);
    // if it isn't the first page, add movies don't just replace the list
    this.setState({movies: (page === 1 ? results : 
                            [...this.state.movies, ...results]), 
                  isLoading: false, 
                  page: page});

    if(total_pages)
      this.setState({totalPages: total_pages});

  }

  /**
  * ensures there are pages to load and does so if possible
  */
  loadMore() {

    if (!this.state.isLoading && 
        this.state.totalPages >= this.state.page + 1) {
      this.updateList(this.state.page + 1); 
    }
  }

  /**
  * returns an object for use as data prop in PosterListItem
  */
  buildPosterData(movie) {
    return {
      id: movie.id,
      mainText: movie.title,
      secondText: `Release date ${movie.release_date}`
    }
  }

  render() {
  
    const { buildPosterSrc, onItemPress, 
            styles = {}, itemStyles = undefined } = this.props;

    return(
      <View style={[defaultStyles.container, styles.container]}>
      {this.state.movies.length > 0 && 
        <FlatList
          {...this.props}
          style={[defaultStyles.list, styles.list]}
          data={this.state.movies}
          renderItem={({item})=> (
            <PosterListItem data={this.buildPosterData(item)}
              posterSrc={buildPosterSrc(item)}
              onItemPress={onItemPress}
              styles={itemStyles}/> 
          )}
          onEndReachedThreshold={0.4}
          onEndReached={this.loadMore}
        />
      }
      {this.state.isLoading && 
        <View style={[defaultStyles.loading, styles.loading]}>
                <ActivityIndicator />
              </View>}
      </View>
    )
  }
}

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  list: {
    padding: 15, 
  }, 
  loading: {
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20,
    flex: 1
  }
});

MovieList.propTypes = {
  // function that returns same accepted values as Image.source
  buildPosterSrc: PropTypes.func.isRequired,
  // callback function passed to PosterItemList
  onItemPress: PropTypes.func.isRequired,
  // StyleSheet object
  itemStyles: PropTypes.object,
  // StyleSheet object
  styles: PropTypes.object
}

export default MovieList;
