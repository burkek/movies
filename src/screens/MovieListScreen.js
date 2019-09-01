import React from 'react';
import { 
  Text, 
  View, 
  SafeAreaView,
  StyleSheet, 
  ScrollView
} from 'react-native';

import { GetMovieListUrl, GetImageUrl } from 'movies/src/urlHelpers';
import MovieList from 'library/MovieList';

/**
* Displays now showing, popular and coming soon lists
* Uses themoviedb API
*
*/
export default class MovieListScreen extends React.Component {

   static navigationOptions = {
    title: 'Movie Listings',
  };


  constructor(props) {
    super(props);
    this.toDetails = this.toDetails.bind(this);
  }

  /**
  * get a list of movies for the given list name (e.g. now_playing or popular).
  */
  async fetchMovies(listName, page = 1) {

    url = GetMovieListUrl(listName, page);
    try {
      // query our API for the latest movies
      let response = await fetch(url);
      let responseJson = await response.json();
      return responseJson;
    } catch(error) {
        console.error(`api error for ${listName}`, url, error);
      }
  }

  /**
  * navigate to the MovieDetails page, passing it the movie object
  */
  toDetails(movie) {
    this.props.navigation.navigate('MovieDetails',  {movie: movie});
  }

  /**
  * return an object for use in an Image component. 
  * see https://developers.themoviedb.org/3/getting-started/images for details.
  */
  buildPosterSrc(movie) {
    return {uri: GetImageUrl(movie.poster_path)};
  }

  render() {

    return(
        <View style={styles.wrapper}>
          <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
            <View style={styles.listHeading}>
              <Text style={styles.listHeadingText}>Showing now</Text>
            </View>
            <MovieList  
              horizontal={true}
              keyExtractor={(item, index) => 'now-playing-' + index.toString()}
              onItemPress={this.toDetails}
              loadData={(page) => this.fetchMovies('now_playing', page)}
              buildPosterSrc={this.buildPosterSrc}
            />
            <View style={styles.listHeading}>
              <Text style={styles.listHeadingText}>Popular movies</Text>
            </View>
            <MovieList  
              horizontal={true}
              keyExtractor={(item, index) => 'popular-' + index.toString()}
              onItemPress={this.toDetails}
              loadData={(page) => this.fetchMovies('popular', page)}
              buildPosterSrc={this.buildPosterSrc}
            />
            <View style={styles.listHeading}>
              <Text style={styles.listHeadingText}>Coming soon</Text>
            </View>
            <MovieList 
              horizontal={true}
              keyExtractor={(item, index) => 'upcoming-' + index.toString()}
              onItemPress={this.toDetails}
              loadData={(page) => this.fetchMovies('upcoming', page)}
              buildPosterSrc={this.buildPosterSrc}
            />
          </ScrollView>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000',
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#333', 
    flex: 1, 
  },
  listHeading: {
    paddingLeft: 15, 
    paddingTop: 25, 
    paddingBottom: 10,
    height: 60, 
    backgroundColor: '#000'
  },
  listHeadingText: {
    color: '#fff', 
    fontSize: 12,
    fontWeight: '600',
  }, 
  list: {
    padding: 20
  }
});