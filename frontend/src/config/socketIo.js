import { io } from 'socket.io-client'
import axios from 'axios'
import { API_SOCKET_BASE_URL } from '@/config/serverApiConfig';

import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';

export const socketApi = axios.create({
    baseURL: API_SOCKET_BASE_URL,
    withCredentials: true

});


export const socket = (setOrders) => {
    const socket = io(`ws://${API_SOCKET_BASE_URL}`)
    console.log('case2')
    socket.on('connnection', () => {
        console.log('connected to server');
    })

    socket.on('order-added', (newOrders) => {
        setOrders(newOrders)
    })

    socket.on('message', (message) => {
        console.log(message);
    })

    socket.on('disconnect', () => {
        console.log('Socket disconnecting');
    })
}

export const getOrders = async (setOrders) => {
    try {
        const response = await socketApi.get(`http://${API_SOCKET_BASE_URL}/orders`)
        const ordersData = response.data?.orders;
        setOrders(ordersData)
        successHandler(response, {
            notifyOnSuccess: false,
            notifyOnFailed: true,
        });
    } catch (error) {
        return errorHandler(error);
    }

}

export const postOrder = async (data) => {
    try {
        const response = await socketApi.post(`http://${API_SOCKET_BASE_URL}/orders`, {
            ...data
        });
        successHandler(response, {
            notifyOnSuccess: true,
            notifyOnFailed: true,
        });
    } catch (error) {
        return errorHandler(error);
    }






}