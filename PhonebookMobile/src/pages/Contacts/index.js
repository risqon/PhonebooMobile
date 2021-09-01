import React, { Component } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import SectionListContacts from 'react-native-sectionlist-contacts'
import ListContacts from '../ListContacts';




export default class Contacts extends Component {
    constructor(props) {
        super(props)

        let nameData = [
            { image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', name: "risqon", id: 'amani', params: '' },
            { name: "a" },
            { name: "b" },
            { name: "c" },
            { name: "d" },
            { name: "e" },
            { name: "f" },
            { name: "g" },
            { name: "h" },
        ]
        this.state = {
            dataArray: nameData
        }
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flex: 1, paddingTop: 20 }}>
                        <Text style={styles.title}>Contacts</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NewContact')} style={{ marginBottom: 4, flexDirection: 'row' }}>
                        <Icon name="plus" style={styles.new}/>
                        <Text style={styles.new}>Add New</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        position: 'relative',
                        marginHorizontal: 20,
                        marginTop: 40,
                        marginBottom: 4,
                        justifyContent: 'center',
                        backgroundColor: '#f9f9f9',
                        borderRadius: 10
                    }}
                >
                    <TextInput
                        placeholder="Cari disini ..."
                        placeholderTextColor="#E0E0E0"
                        underlineColorAndroid="transparent"
                        style={{
                            borderRadius: 10,
                            height: 40,
                            fontSize: 12,
                            paddingLeft: 45,
                            paddingRight: 20
                        }}
                    />
                    <Icon name="search" size={25} color="#E0E0E0" style={{ position: 'absolute', margin: 12 }} />
                </View>
                        <ListContacts />


                {/* <View style={styles.container}>
                        <SectionListContacts
                            ref={s => this.sectionList = s}
                            sectionListData={this.state.dataArray}
                            sectionHeight={50}
                            initialNumToRender={this.state.dataArray.length}
                            showsVerticalScrollIndicator={false}
                            SectionListClickCallback={(item, index) => {
                                console.log('---SectionListClickCallback--:', item, index)
                            }}
                            otherAlphabet="#"
                        />
                    </View> */}


            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,

    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    new: {
        fontSize: 18,
        color: '#01C7C8',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        marginLeft: 5,
        fontWeight:'bold'

    }
})
