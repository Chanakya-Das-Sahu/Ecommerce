import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    product:{productId:''}
}

const slice = createSlice({
    name:'Product',
    initialState,
    reducers:{
        addProductId : (state,action) =>{
          state.product.productId = action.payload
        },
        flush : (state,action)=>{
          return initialState 
        }
    }
})

export const { addProductId , flush } = slice.actions ;
export default slice.reducer ;