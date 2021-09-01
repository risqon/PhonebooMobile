import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Item from '../../components/Item'
import { loadPhone } from '../../redux/actions'

export class ListContacts extends Component {

    componentDidMount(){
        this.props.loadPhone();
    }

    render() {
        const contact = this.props.stateFormMaps.phones.map((item, index) => {
            return  <Item
            key={index}
            id={item.id}
            sent={item.sent}
            name={item.name}
            phone={item.phone}
            edit={item.isEdit}
            avatar={item.image}
        />
        })
        console.log(contact)

        return (
            <ScrollView>
              {contact}
            </ScrollView>
        )
    }
}

const mapStateToProps = ({phones}) => ({
    stateFormMaps: phones
})

const mapDispatchToProps = (dispatch) => ({
    loadPhone: () => dispatch(loadPhone())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (ListContacts)
