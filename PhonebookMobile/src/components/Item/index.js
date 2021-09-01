import React from 'react'
import { View, Text, Image } from 'react-native'

const Item = (props) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
            <View>
                <Image style={{ height: 70, width: 70, borderRadius: 50, resizeMode: 'cover'}} source={{uri: props.avatar}} />
            </View>
            <View style={{ alignSelf: 'center', marginLeft: 12 }}>
                <Text>
                    {props.name}
                </Text>
                <Text>
                    {props.phone}
                </Text>
            </View>
        </View>
    )
}

export default Item