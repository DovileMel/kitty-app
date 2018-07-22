import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import PropTypes from 'prop-types';

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Kitty',
    };
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: this.props.navigation.getParam('image')}} />
                <Text style={styles.title}>{this.props.navigation.getParam('name')}</Text>
                <Text style={styles.descpription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque consequat egestas ipsum sed venenatis.
                    Praesent pulvinar erat a risus consectetur interdum.
                    Etiam malesuada a nisi sed viverra.
                    Aenean eget nisl vel nibh lacinia porta et id justo.
              </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 300,
        width: 400,
    },
    title: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    descpription: {
        margin: 10,
        fontSize: 16,
        lineHeight: 30,
    }
});

export default ProfileScreen;