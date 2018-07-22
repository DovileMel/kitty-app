import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    FlatList,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator,
    Modal
} from 'react-native';
import ButtonBox from './ButtonBox';
import SelectSearch from './SelectSearch';
const kittyNames = require('../data/names.json');

class ListScreen extends React.Component {
    state = {
        kitties: [],
        searchAmount: 30,
        modalVisible: false,
    }

    static navigationOptions = {
        title: 'Kitten list',
    };

    componentDidMount = () => {
        this.getImages(30);
    }

    getImages = (number) => {
        this.setState({
            kitties: [],
            searchAmount: number,
            modalVisible: false
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
                    const randomNumber = Math.floor(Math.random() * kittyNames[0].names.length);
                    const kittyHasName = kittyNames[0].names[randomNumber]
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

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { navigate } = this.props.navigation;
        
        if (this.state.kitties.length === 0 ){
            return <Text>No internet connection</Text>
        }
        if (this.state.kitties.length < this.state.searchAmount) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={styles.indicator}
                    size="large"
                />
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.btn}>
                    <ButtonBox btnTitle='30' btnAction={this.getImages} />
                    <ButtonBox btnTitle='50' btnAction={this.getImages} />
                    <ButtonBox btnTitle='100' 
                    btnAction={this.getImages} 
                    />
                    <TouchableHighlight
                        style={styles.filter}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Text>Show Filter</Text>
                    </TouchableHighlight>
                </View>
                
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={styles.container}>
                        <SelectSearch btnAction={this.getImages} />
                    </View>
                </Modal>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <FlatList
                        data={this.state.kitties.map(kitty => {
                            return { key: kitty.url, name: kitty.name }
                        })}
                        renderItem={({ item }) => (
                            <View style={styles.listItem} key={item.key + item.name}>
                                <TouchableHighlight
                                    onPress={() => navigate('Profile',
                                        {
                                            name: item.name,
                                            image: item.key
                                        })}>
                                    <Image style={styles.image} source={{ uri: item.key }} />
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
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
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
    filter: {
        margin: 15,
    }
});

export default ListScreen;