import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class ButtonBox extends React.Component {

    handleClick = () => {
        return this.props.btnAction(Number(this.props.btnTitle))
    }

    render() {

        return (
            <View style={styles.container}>
                <Button
                    color='#E0E0E0'
                    title={this.props.btnTitle}
                    onPress={this.handleClick}
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
});

export default ButtonBox;