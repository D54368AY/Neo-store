import axios from 'axios'
import { INVOICE_URL } from './url'
export function AddUser(data){
    return axios.post(`${INVOICE_URL}user/adduser`,data)
}
// email login
export function UserLogin(data){
    return axios.post(`${INVOICE_URL}user/loginuser`,data)
}
//social login
export function LoginSocial(data){
    return axios.post(`${INVOICE_URL}user/loginsocial`,data)
}
//forgot password
export function sendOtp(data){
    return axios.post(`${INVOICE_URL}user/sendotp`,data)
}
export function changePASS(data){
    return axios.post(`${INVOICE_URL}user/changepass`,data)
}

//editprofile
export function UpdateProfile(data){
    return axios.post(`${INVOICE_URL}user/updateprof`,data)
}
//password change in profile
export function updatePassword(data){
    return axios.post(`${INVOICE_URL}user/updatepassword`,data)
}

//add address
export function addAddress(data){
    return axios.post(`${INVOICE_URL}user/newaddress`,data)
}
//del address
export function deleteAddress(data){
    return axios.post(`${INVOICE_URL}user/deladdress`,data)
}

// add picture

export function AddProfilePicture(data){
    return axios.post(`${INVOICE_URL}user/addpicture`,data,{ headers: {'content-type': 'multipart/form-data'}})
}


//get All products

export function GETAllProducts(data){
    return axios.get(`${INVOICE_URL}product/getAllProducts`)
}


export function GETSORTUP(data){
    return axios.get(`${INVOICE_URL}product/getSortUp`)
}

export function GETSORTDOWN(data){
    return axios.get(`${INVOICE_URL}product/getSortDown`)
}

// rating poduct

export function RATEPRODUCT(data){
    return axios.post(`${INVOICE_URL}product/rating`,data)
}

//add to cart

export function ADDTOCART(data){
    return axios.post(`${INVOICE_URL}cart/addtocart`,data)
}

//get cart

export function GETALLCART(data){
    return axios.post(`${INVOICE_URL}cart/getcart`,data)
}

export function REMOVECART(data){
    return axios.post(`${INVOICE_URL}cart/removecart`,data)
}

export function INC(data){
    return axios.post(`${INVOICE_URL}cart/inc`,data)
}

export function DEC(data){
    return axios.post(`${INVOICE_URL}cart/dec`,data)
}

//place an order

export function PLACEORDER(data){
    return axios.post(`${INVOICE_URL}cart/placeorder`,data)
}

//clear cart

export function CLEARCART(data){
    return axios.post(`${INVOICE_URL}cart/clearcart`,data)
}

//getorders

export function GETORDERS(data){
    return axios.post(`${INVOICE_URL}cart/getorders`,data)
}

export function GETSINGLEORDER(data){
    return axios.post(`${INVOICE_URL}cart/getsingleorder`,data)
}