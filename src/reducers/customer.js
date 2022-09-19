import { actionTypes, reduxUtil } from '../actions/customer';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_CUSTOMER_LIST,
    DELETE_CUSTOMER,
    GET_CUSTOMER_AUTOCOMPLE
} = actionTypes;

const initialState = { 
    customerData: [],
    tbcustomerLoading: false,
    customerAutoComple:[]
};

const reducer = createReducer({
        [defineActionLoading(GET_CUSTOMER_LIST)]: (state) => {
            return {
                ...state,
                tbcustomerLoading: true
            }
        },
        [defineActionSuccess(GET_CUSTOMER_LIST)]: (state, { customerData }) => {
            return {
                ...state,
                customerData,
                tbcustomerLoading: false
            }
        },
        [defineActionSuccess(GET_CUSTOMER_AUTOCOMPLE)] : (state, {customerAutoComple} ) =>{
            return {
                ...state,
                customerAutoComple,
            }
        },
        [defineActionLoading(DELETE_CUSTOMER)] : (state) =>{
            return {
                ...state,
                tbcustomerLoading: true,
            }
        },
        [defineActionFailed(DELETE_CUSTOMER)] : (state) =>{
            return {
                ...state,
                tbcustomerLoading: false,
            }
        }
    },
    initialState
)

export default {
    reducer
};
