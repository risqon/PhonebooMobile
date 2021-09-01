import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const API_URL = 'http://192.168.1.105:3001/graphql'

const client = new ApolloClient({
    uri: API_URL
})


// start load phone data
export const loadPhoneSuccess = ({ totalData, items }) => ({
    type: 'LOAD_PHONE_SUCCESS',
    totalData,
    items
})

export const loadPhoneFailure = () => ({
    type: 'LOAD_PHONE_FAILURE'
})

export const loadPhone = (offset = 0, limit = 10) => {
    const usersQuery = gql`
    query{
        phones(pagination:{offset: ${offset}, limit:${limit}}){
            totalData
            items{
                id
                name
                phone
                image
            }
        }
    }`
    return dispatch => {
        return client.query({
            query: usersQuery,
        }).then(function (response) {
          //  console.log('load', response.data)
            dispatch(loadPhoneSuccess(response.data.phones))
        }).catch(function (error) {
            console.error(error);
            dispatch(loadPhoneFailure())
        })
    }
}

//end load phone data

// start post phone data

export const postPhoneSuccess = (phones) => ({
    type: 'POST_PHONE_SUCCESS',
    phones
})

export const postPhoneFailure = (id) => ({
    type: 'POST_PHONE_FAILURE', id
})

export const postPhoneRedux = (id, name, phone, image) => ({
    type: 'POST_PHONE',
    id,
    name,
    phone,
    image
})


export const postPhone = (name, phone, image) => {
    let id = Date.now();
    const addQuery = gql`
    mutation addContact($name: String!, $phone: String!, $id:ID! $image: String!) {
        addContact(name: $name, phone: $phone, id:$id, image: $image ) {
            name
            phone
            id
            image
        }
    }`
    return dispatch => {
        dispatch(postPhoneRedux(
            id,
            name,
            phone,
            image))
        return client.mutate({
            mutation: addQuery,
            variables: {
                name,
                phone,
                id,
                image
            }
        })
            .then(function (response) {
                console.log('add', response)
                dispatch(postPhoneSuccess(response.data.addContact))
            })
            .catch(function (error) {
                console.error('eror action', error);
                dispatch(postPhoneFailure(id))
            });
    }
}

// start delete phone data