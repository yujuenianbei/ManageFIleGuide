import {
    TYPE,
    TYPEPRODUCT,
    TYPELOADING,
} from '../actions/index'

const initValue = {
    type: 1,
    typeProduct: [],
    typeLoading: false
}
export default (state = initValue, action) => {
    const data = action.data
    switch (action.type) {
        case TYPE: {
            return Object.assign({}, state, { type: data })
        }
        case TYPEPRODUCT: {
            return Object.assign({}, state, { typeProduct: data })
        }
        case TYPELOADING: {
            return Object.assign({}, state, { typeLoading: data })
        }
        default: {
            return state;
        }
    }
}