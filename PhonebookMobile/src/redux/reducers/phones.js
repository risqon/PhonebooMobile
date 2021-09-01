let globalState = {
    phones: [],
    isActive: false,
    pages: 0,
    limit: 3,
    offset: 0,
    currentPage: 1,
    isSearchModeOn: false,
    filterName: '',
    filterPhone: '',
    filterImage: ""
}


const phones = (state = globalState, action) => {
    switch (action.type) {
        case 'LOAD_PHONE_SUCCESS':
            return {
                ...state,
                phones: action.items.map((item) => {
                    item.sent = true
                    item.isEdit = false
                    return item
                }),
                pages: Number(Math.ceil(action.totalData / state.limit)),
                totalData: Number(action.totalData),
            }

        case 'POST_PHONE':
            return {
                ...state,
                phones: [
                    ...state.phones, {
                        id: action.id,
                        name: action.name,
                        phone: action.phone,
                        image: action.image,
                        sent: true,
                        isEdit: false
                    }
                ]
            }

        case 'POST_PHONE_SUCCESS':
            return state

        case 'POST_PHONE_FAILURE':
            return {
                ...state,
                phones: state.phones.map((item) => {
                    if (item.id === action.id) {
                        item.sent = false;
                    }
                    return item
                })
            }

        case 'LOAD_PHONE_FAILURE':
        default:
            return state
    }
}

export default phones