import axios from "axios";
import * as SecureStore from 'expo-secure-store';
// import NetInfo from '@react-native-community/netinfo';



// Import Config
// const config = require("../config/envConfig");



const codeMessage = {
    200: "The server successfully returned the requested data. ",
    201: " New or modified data is successful. ",
    202: " A request has entered the background queue (asynchronous task). ",
    204: " Delete data successfully. ",
    400: " The request was sent with an error, and the server did not perform operations to create or modify data. ",
    401: "The user does not have permission (token, username, password is incorrect). ",
    403: " User is authorized, but access is forbidden. ",
    404: " The request was made for a record that does not exist and the server did not operate. ",
    406: " The format of the request is not available. ",
    410: "The requested resource was permanently deleted and will not be obtained again. ",
    422: " A validation error occurred while creating an object. ",
    500: "The server has an error, please check the server. ",
    502: " Gateway error. ",
    503: "The service is unavailable, the server is temporarily overloaded or maintained. ",
    504: "The gateway timed out. "
};

/**
 * Default parameters when configuring request request
 */

let url='http://103.119.71.9:4400';
// let url='http://192.168.0.104:3000/';
// let url= 'http://localhost:3000/'; 


// Prefix Config

const prefix = url;

/**
 *
 * @param {string} link   API link
 * @param {object} params API peramitter
 */
const request = async (link, params={}, noPrefix = null, header = null) => {

    net: Boolean 
    let headers = {
        "Content-Type": "application/json",
    };
    
    const token = await SecureStore.getItemAsync('accessToken')
   
     
    //  console.log("token",token);
     
    headers.Authorization =  token? 'Bearer '+ token : "";   

    let confiq = {
        method: (params && params.method) || "GET",
        url: noPrefix ? link : prefix + link,
        data:(params && params.data) || "",
        headers: headers,
        params : (params && params.query) || "",
        file : (params && params.file) || ""
    
    };

        let options={
            url: link,
            method: confiq.method, 
            baseURL: url,
            headers: headers,
            data: confiq.data,
            params : confiq.params,
            file : confiq.file
        }
        

        return axios(options).then(res=>{
            console.log('res ====', res.data);
            return res.data;
        }).catch(err=>{
            // console.log('reqest == err',err?.response?.data);
            // throw err?.response?.data;
            throw err?.response?.data;
        })
};

export default request;
