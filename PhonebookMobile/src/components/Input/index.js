import React from 'react'
import { Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

 const Input = (props) => {
    return (
        <View style={{ flexDirection: 'row', marginRight: 30, marginTop: 20 }}>
            <Icon name={props.nameIcon} size={22} color="#E0E0E0" backgroundColor="blue" />
            <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={{ fontSize: 16, color: "#E0E0E0", height: 20 }}>{props.label}</Text>
                <TextInput style={{ borderBottomWidth: 1, height: 40, borderBottomColor: '#E0E0E0' , color:'#000'}} />
            </View>
        </View>
    )
}

export default Input