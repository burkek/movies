import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Image
} from 'react-native';

import PropTypes from 'prop-types';

/**
* Displays a heading text, with a secondary text below
* followed by an image. 
* see PropTypes below for required props
*/
class PosterListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {data, posterSrc, onItemPress} = this.props;
    return(
     <View style={styles.itemContainer}>
     {/* return the data object for the clicked item */}
     <TouchableOpacity 
        onPress={() => onItemPress(data)}>

          <Text style={styles.title}>{data.mainText}</Text>
          <Text style={styles.date}>{data.secondText}</Text>
          <View style={styles.mainContent}>
            { posterSrc ? <Image 
            resizeMode={'contain'}
            style={styles.poster}
            source={posterSrc} 
            /> : 
            <View style={styles.noPoster}>
              <Text style={styles.noPosterText}>No Image Available</Text>
            </View>}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 25, 
    alignItems: 'center', 
    marginRight: 20
  },
  title: {
    fontSize: 18, 
    color: '#00B1B0', 
    textAlign: 'center', 
    fontWeight: '700', 
    marginBottom: 10
  },
  date: {
    textAlign: 'center', 
    marginBottom: 15
  },
  mainContent: {
    alignItems: 'center',
  },
  poster: {
    height: 300,
    width: 200
  }, 
  noPoster: {
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#aaa', 
    height: 300, 
    width: 200,
  }, 
  noPosterText: {
    textAlign: 'center',
    color: 'black'
  }
});

PosterListItem.propTypes = {

  // callback, passes the data object as a param
  onItemPress:  PropTypes.func.isRequired,
  // an object must contain these keys: mainText, secondText
  data:        PropTypes.object.isRequired,
  // same accepted values as Image.source
  posterSrc:    PropTypes.oneOfType([
                  PropTypes.shape({
                    uri: PropTypes.string,
                    headers: PropTypes.objectOf(PropTypes.string)
                  }),
                  PropTypes.number,
                  PropTypes.arrayOf(
                    PropTypes.shape({
                      uri: PropTypes.string,
                      width: PropTypes.number,
                      height: PropTypes.number,
                      headers: PropTypes.objectOf(PropTypes.string)
                    })
                  )
                ]), 
}

export default PosterListItem;