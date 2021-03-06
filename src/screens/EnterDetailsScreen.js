import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Spinner, Card, CardItem, Body } from 'native-base'
import store from '../store/store';
import { setStudentDetails } from '../store/actions/studentDetails';

const EnterDetailsScreen = props => {

    //$ TODO REMOVE DEFAULT VALUES
    const [regNumber, setRegNumber] = useState('');
    const [name, setName] = useState('');
    const [disableButton, setDisableButton] = useState(true);

    const handleNameInput = name => {
        setName(name);
        handleButtonDisabling(name, regNumber);
    }

    const handleRegInput = regNumber => {
        setRegNumber(regNumber);
        handleButtonDisabling(name, regNumber);
    }

    const handleButtonDisabling = (name, regNumber) => {
        if (name && regNumber.length == 9) {
            setDisableButton(false);
        }
        else {
            setDisableButton(true);
        }
    }

    const handleNavigation = () => {
        if (!name && regNumber.length != 9) {
            Alert.alert("Please Enter Correct Information");
            return;
        }
        store.dispatch(setStudentDetails({ name: name, regNumber: regNumber }))

        props.navigation.navigate('QRScan');
    }

    return (

        <Container>
            <Content padder>
                <Card style={{ backgroundColor: 'yellow' }}>
                    <CardItem header >
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Enter Details</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Item style={{ margin: 10 }} floatingLabel>
                                <Label>Enter Registration Number</Label>
                                <Input
                                    keyboardType="number-pad"
                                    onChangeText={handleRegInput}
                                    value={regNumber}
                                />
                            </Item>
                            <Item style={{ margin: 10 }} floatingLabel>
                                <Label>Enter Full Name</Label>
                                <Input
                                    onChangeText={handleNameInput}
                                    value={name}
                                />
                            </Item>
                            <Button
                                full
                                success
                                disabled={disableButton}
                                onPress={handleNavigation}
                                style={disableButton ? { ...styles.button, backgroundColor: '#bdbdbd' } : { ...styles.button, backgroundColor: '#26a69a' }}
                            >
                                <Text style={{ color: 'white', fontSize: 18 }}>Proceed</Text>
                            </Button>

                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        backgroundColor: 'yellow',
        margin: 10,
        alignContent: 'center'
    },
    button: {
        borderRadius: 6
    }
});

export default EnterDetailsScreen;