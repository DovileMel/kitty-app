import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class SelectSearch extends React.Component {
    state = {
        text: '10',
        error: false
    }

    handleInput = (input) => {
        this.setState({
            text: input
        })

        //validate input
        if (input.length > 0) {
            if (/^[0-9]*$/.test(input)) {
                validationSuccess = true
                this.setState({
                    error: false
                })
            } else {
                validationSuccess = false
                this.setState({
                    error: true
                })
            }
        } else {
            this.setState({
                error: true
            })
        }
    }

    handleClick = () => {
        if (Number(this.state.text) > 0) {
            return this.props.btnAction(Number(this.state.text))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.question}>
                    Please enter the number of results
                    </Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(text) => this.handleInput(text)}
                    value={this.state.text}
                />
                {this.state.error && <Text style={styles.error}>
                    Incorrect value
                    </Text>
                }
                {!this.state.error
                    && this.state.text.length >= 0
                    && Number(this.state.text) > 0
                    && <Text style={styles.question}>
                        Are you sure you want to get {this.state.text} results?
                    </Text>
                }
                <Button
                    style={styles.btn}
                    title="Meow"
                    onPress={this.handleClick}
                    disabled={this.state.error}
                />
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
    inputText: {
        height: 40,
        width: 60,
        textAlign: 'center',
        fontSize: 20,
    },
    question: {
        margin: 20,
        fontSize: 20,
    },
    btn: {
        color: '#616161',
    },
    error: {
        color: 'red'
    }
});

export default SelectSearch;