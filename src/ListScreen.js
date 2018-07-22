import React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import ButtonBox from './ButtonBox';
const kittyNames = require('../data/names.json');


class ListScreen extends React.Component {
    state = {
        kitties: [],
    }

    static navigationOptions = {
        title: 'Kitten list',
    };

    componentDidMount = () => {
        this.getImages(10);
    }

    getImages = (number) => {
        this.setState({
            kitties: []
        });

        [...Array(number)].forEach((_, item) => {
            const urlNumber = 200 + item;
            fetch('http://placekitten.com/300/' + urlNumber, {
                method: 'GET'
            })
                .then((data) => {
                    return Promise.resolve(data.url);
                })
                .then((data) => {
                    const kittyHasName = kittyNames[0].names[item]
                    this.setState({
                        kitties: [...this.state.kitties, { id: item, url: data, name: kittyHasName }],
                    })
                })
                .catch(function (error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                    throw error;
                });
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.btn}>
                    <ButtonBox btnTitle='10' btnAction={this.getImages} />
                    <ButtonBox btnTitle='50' btnAction={this.getImages} />
                    <ButtonBox btnTitle='100' btnAction={this.getImages} />
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <FlatList
                        data={this.state.kitties.map(kitty => {
                            return { key: kitty.url, name: kitty.name }
                        })}
                        renderItem={({ item }) => (
                            <View style={styles.listItem} key={item.key}>
                                <TouchableHighlight
                                    onPress={() => navigate('Profile', 
                                    {name: item.name,
                                    image: item.key
                                    } )}>
                                    <Image style={styles.image} source={{ uri: item.key }}/>
                                </TouchableHighlight>
                                <Text style={styles.titleText}>
                                    {item.name}
                                </Text>
                            </View>
                        )}
                    />
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        flexDirection: 'row',
        margin: 10,
    },
    listItem: {
        flex: 1,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
    },
    image: {
        height: 200,
        width: 300,
        padding: 5,
        borderRadius: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ListScreen;