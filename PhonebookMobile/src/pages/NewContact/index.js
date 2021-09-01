import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Input from '../../components/Input' 


export class NewContact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            image: null,
            progress: 0,
            isUpload: false,

        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleChangeName = this.handleChangeName.bind(this);
        // this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.name &&
            this.state.phone &&
            this.state.image) {
            this.props.postPhone(this.state.name, this.state.phone, this.state.image)
            this.setState({
                name: "",
                phone: "",
                image: "",
                isUpload: false,
            })
        }
    }





    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.wrapper}>
                        <View style={styles.formImage}>
                            <Icon name="camera" size={25} color="#E0E0E0" />
                        </View>
                        <Input label="Name" nameIcon="user" name='name'
								value={this.state.name} onChangeText={(value) => this.setState({ name: value })}/>
                        <Input label="Phone" nameIcon="phone" name='phone'
								value={this.state.phone} onChangeText={(value) => this.setState({ phone: value })}/>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 80, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Contacts")}>
                        <Text style={{ fontSize: 20, color: "orange" }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.submit()}>
                        <Text style={{ fontSize: 20, color: "orange" }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    postPhone: (name, phone, image) => dispatch(postPhone(name, phone, image)),
})

export default connect(
    null,
    mapDispatchToProps
) (NewContact);

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        height: 400,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    formImage: {
        backgroundColor: '#39A2DB',
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        marginTop: -50

    }
})
