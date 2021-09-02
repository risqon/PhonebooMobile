import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
    Modal,
    Pressable
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Input from '../../components/Input'
import * as ImagePicker from 'react-native-image-picker';


export class NewContact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filepath: {
                data: '',
                uri: ''
            },
            fileUri: '',
            name: '',
            phone: '',
            image: null,
            isUpload: false,
            modalVisible: false

        };
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                mediaType: 'photo'
            },
        };
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response.assets[0]);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.assets[0].uri

                });
            }
        });

    }

    launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response.assets[0].data));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.assets[0].uri
                });
            }
        });

    }

    submit = () => {

        if (this.state.name &&
            this.state.phone &&
            this.state.image) {
            this.props.postPhone(this.state.name, this.state.phone, this.state.image)
            console.log(this.state.name, this.state.phone)
            this.setState({
                name: "",
                phone: "",
                image: "",
                isUpload: false,
            })
        }
    }

    renderFileUri() {
        console.log(this.state.fileUri)
        if (this.state.fileUri) {
            return <Image
                source={{ uri: this.state.fileUri }}
                style={styles.formImageUrl}
            />
        } else {
            return <Icon name="camera" size={25} color="#E0E0E0" />
        }
    }




    render() {

        const { modalVisible } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.wrapper}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                this.setModalVisible(!modalVisible);
                            }} >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={styles.btn}>
                                        <TouchableOpacity onPress={this.launchCamera} style={styles.btnImg}  >
                                            <Text style={{ fontSize: 18, color: 'white' }}>Camera</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnImg}  >
                                            <Text style={{ fontSize: 18, color: 'white' }}>Gallery</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => this.setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Hide Modal</Text>
                                    </Pressable>
                                </View>
                            </View>

                        </Modal>
                        <Pressable style={styles.formImage} onPress={() => this.setModalVisible(true)}>
                            {this.renderFileUri()}
                        </Pressable>
                        <Input
                            label="Name"
                            nameIcon="user"
                            name='name'
                            value={this.state.name}
                            onChangeText={(value) => this.setState({ name: value })} />
                        <Input
                            label="Phone"
                            nameIcon="phone"
                            name='phone'
                            value={this.state.phone}
                            onChangeText={(value) => this.setState({ phone: value })} />
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
)(NewContact);

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

    },
    formImageUrl: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    btnImg: { 
        borderWidth: 1, 
        padding: 8,
        borderRadius: 10, 
        backgroundColor: 'orange', 
        borderColor: 'orange',
        marginHorizontal: 10 
        },
        btn :{
            flexDirection: 'row',
        }
})


// import React, { Fragment, Component } from 'react';
// import {
//     SafeAreaView,
//     StyleSheet,
//     View,
//     Text,
//     StatusBar,
//     Image,
//     Dimensions,
//     TouchableOpacity
// } from 'react-native';
// import {
//     Colors,
// } from 'react-native/Libraries/NewAppScreen';
// import * as ImagePicker from 'react-native-image-picker';



// const options = {
//     title: 'Select Avatar',
//     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//     storageOptions: {
//         skipBackup: true,
//         path: 'images',
//     },
// };
// export default class NewContact extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             filepath: {
//                 data: '',
//                 uri: ''
//             },
//             fileData: '',
//             fileUri: ''
//         }
//     }

//     chooseImage = () => {
//         let options = {
//             title: 'Select Image',
//             customButtons: [
//                 { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
//             ],
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };
//         ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//                 alert(response.customButton);
//             } else {
//                 const source = { uri: response.uri };

//                 // You can also display the image using data:
//                 // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//                 // alert(JSON.stringify(response));s
//                 console.log('response', JSON.stringify(response));
//                 this.setState({
//                     filePath: response,
//                     fileData: response.data,
//                     fileUri: response.uri
//                 });
//             }
//         });
//     }

//     launchCamera = () => {
//         let options = {
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//                 mediaType: 'photo'
//             },
//         };
//         launchCamera(options, (response) => {
//             console.log('Response = ', response.assets[0]);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//                 alert(response.customButton);
//             } else {
//                 const source = { uri: response.uri };
//                 console.log('response', JSON.stringify(response));
//                 this.setState({
//                     filePath: response,
//                     fileData: response.data,
//                     fileUri: response.assets[0].uri

//                 });
//             }
//         });

//     }

//     launchImageLibrary = () => {
//         let options = {
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };
//         ImagePicker.launchImageLibrary(options, (response) => {
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//                 alert(response.customButton);
//             } else {
//                 const source = { uri: response.uri };
//                 console.log('response', JSON.stringify(response.assets[0].data));
//                 this.setState({
//                     filePath: response,
//                     fileData: response.assets[0],
//                     fileUri: response.assets[0].uri
//                 });
//             }
//         });

//     }


//     renderFileData() {
//         console.log(this.state.fileData)
//         if (this.state.fileData) {
//             return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
//                 style={styles.images}
//             />
//         } else {
//             return <Image source={require('../../assets/images/balank.png')}
//                 style={styles.images}
//             />
//         }
//     }

//     renderFileUri() {
//         console.log(this.state.fileUri)
//         if (this.state.fileUri) {
//             return <Image
//                 source={{ uri: this.state.fileUri }}
//                 style={styles.images}
//             />
//         } else {
//             return <Image
//                 source={require('../../assets/images/balank.png')}
//                 style={styles.images}
//             />
//         }
//     }

//     render() {
//         return (
//             <Fragment>
//                 <StatusBar barStyle="dark-content" />
//                 <SafeAreaView>
//                     <View style={styles.body}>
//                         <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }} >Pick Images from Camera & Gallery</Text>
//                         <View style={styles.ImageSections}>
//                             <View>
//                                 {this.renderFileData()}
//                                 <Text style={{ textAlign: 'center' }}>Base 64 String</Text>
//                             </View>
//                             <View>
//                                 {this.renderFileUri()}
//                                 <Text style={{ textAlign: 'center' }}>File Uri</Text>
//                             </View>
//                         </View>

//                         <View style={styles.btnParentSection}>
//                             <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
//                                 <Text style={styles.btnText}>Choose File</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
//                                 <Text style={styles.btnText}>Directly Launch Camera</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
//                                 <Text style={styles.btnText}>Directly Launch Image Library</Text>
//                             </TouchableOpacity>
//                         </View>

//                     </View>
//                 </SafeAreaView>
//             </Fragment>
//         );
//     }
// };

// const styles = StyleSheet.create({
//     scrollView: {
//         backgroundColor: Colors.lighter,
//     },

//     body: {
//         backgroundColor: Colors.white,
//         justifyContent: 'center',
//         borderColor: 'black',
//         borderWidth: 1,
//         height: Dimensions.get('screen').height - 20,
//         width: Dimensions.get('screen').width
//     },
//     ImageSections: {
//         display: 'flex',
//         flexDirection: 'row',
//         paddingHorizontal: 8,
//         paddingVertical: 8,
//         justifyContent: 'center'
//     },
//     images: {
//         width: 150,
//         height: 150,
//         borderColor: 'black',
//         borderWidth: 1,
//         marginHorizontal: 3
//     },
//     btnParentSection: {
//         alignItems: 'center',
//         marginTop: 10
//     },
//     btnSection: {
//         width: 225,
//         height: 50,
//         backgroundColor: '#DCDCDC',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 3,
//         marginBottom: 10
//     },
//     btnText: {
//         textAlign: 'center',
//         color: 'gray',
//         fontSize: 14,
//         fontWeight: 'bold'
//     }
// });