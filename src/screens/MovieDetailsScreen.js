import React from 'react';
import { 
  Text, 
  View, 
  Image, 
  SafeAreaView,
  StyleSheet, 
  ScrollView
} from 'react-native';

import { SliderBox } from 'react-native-image-slider-box';
import { GetMovieUrl, GetImageUrl } from 'movies/src/urlHelpers';
import MovieList from 'library/MovieList';


/**
* Displays an image slider of all the given movies backdrops
* followed by the movie title, release date and description
*/
export default class MovieListScreen extends React.Component {

  constructor(props) {
    super(props);

    // state will contain all values returned by api but needs
    // to be created here
    this.state = {

    }

  }

  componentDidMount() {
    const { navigation } = this.props;
    const movie = navigation.getParam('movie', {});

    if(movie.id)
      this.fetchDetails(movie.id);
  }

  /**
  * download the current movie info
  */
  fetchDetails(movieId) {
    let url = GetMovieUrl(movieId);
    // query our API for the latest movies
    fetch(url)
     .then((response) => response.json())
      .then((responseJson) => { 
        this.setState(responseJson);
      })
      .catch((error) =>{
        console.warn(`api error for movie id: ${movieId}`, url, error);
      });
  }

  /**
  * loop through the list of images returned by the API
  * and builds the correct uri for use in Image component
  */
  buildImageUris(uris) {
    for (var i = 0; i < uris.length; i++) {
      uris[i] = GetImageUrl(uris[i].file_path);
    }
    return uris;
  }

  render() {
    const { title, tagline, release_date, overview, images } = this.state;

    return(
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          {images && <SliderBox images={
                 images.backdrops.length > 0 ? 
                 this.buildImageUris(images.backdrops) : 
                 this.buildImageUris(images.posters) 
               } />
          }
          <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.container}>
            <Text style={styles.titleText}>
              {title}
            </Text>
             <Text style={styles.subTitleText}>
              {tagline}
            </Text>
            <Text style={styles.dateText}>
              release date: {release_date}
            </Text>
            <Text style={styles.descriptionText}>
              {overview}
            </Text>
            
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 27, 
  },
  titleText: {
    fontSize: 27, 
    textAlign: 'center', 
    marginBottom: 7
  },
  subTitleText: {
    fontSize: 17,
    textAlign: 'center', 
    marginBottom: 15
  },
  dateText: {
    textAlign: 'center', 
    marginBottom: 15
  }, 
  descriptionText: {
    marginBottom: 15
  }, 
});