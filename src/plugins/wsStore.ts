import { Module } from 'vuex'
import { globalProperties } from '../main';
import { RootState } from '/src/store'

export interface wsRootState {
    socket: any;
    messages: messageType[];
}

interface wsMessage {
  type: string,
  text: string,
  date: string
}

export interface messageType {
  id: number,
  time: number, 
  message: string,
  readPopup: boolean,
}


export enum wsStoreMutations {
	SOCKET_ONOPEN = 'SOCKET_ONOPEN',
	SOCKET_ONCLOSE = 'SOCKET_ONCLOSE',
	SOCKET_ONERROR = 'SOCKET_ONERROR',
	SOCKET_ONMESSAGE = 'SOCKET_ONMESSAGE',
	SOCKET_RECONNECT = 'SOCKET_RECONNECT',
	SOCKET_RECONNECT_ERROR = 'SOCKET_RECONNECT_ERROR',

  REMOVE_ALL_POPUP = 'WS_REMOVE_ALL_POPUP',
  REMOVE_POPUP = 'WS_REMOVE_POPUP',
  REMOVE_ALL_MESSAGE = 'WS_REMOVE_ALL_MESSAGE',
  REMOVE_MESSAGE = 'WS_REMOVE_MESSAGE',
}

export enum wsStoreActions {
  AUTH_WS = 'AUTH_WS',
}



export const wsStore: Module<wsRootState, RootState> = {
  state: {
    socket: {
      isConnected: false,
      message: "",
      reconnectError: false,
      heartBeatInterval: 5000,
      heartBeatTimer: 0
    },
    messages:[],

  },
  getters:{
    getWSisConnected: state => state.socket.isConnected,
    getWSMessage: state => state.messages,
    getWSMessagePopup: state => state.messages.filter((x: messageType) => x.readPopup == false ),
    getWSMessagePopupCnt: state => state.messages.filter((x: messageType) => x.readPopup == false ).length,
    getWSMessageCnt: state => state.messages.length,
  },
  mutations: {
    // Connection open
    [wsStoreMutations.SOCKET_ONOPEN] (state, event) {
      state.socket.isConnected = true
      const token = localStorage.getItem('id_token')
      if (token) globalProperties.send(JSON.stringify({token}))
      // // When the connection is successful, start sending heartbeat messages regularly to avoid being disconnected by the server
      // state.socket.heartBeatTimer = setInterval(() => {
      //   const message = "Heartbeat message";
      //   state.socket.isConnected &&
      //     globalProperties.$socket.send(JSON.stringify({
      //       code: 200,
      //       msg: message
      //     }));
      // }, state.socket.heartBeatInterval);
    },

    [wsStoreMutations.SOCKET_ONCLOSE] (state, event) {
      state.socket.isConnected = false;
    },
    
    [wsStoreMutations.SOCKET_ONERROR] (state, event) {
      console.error(state, event);
    },

    [wsStoreMutations.SOCKET_ONMESSAGE](state, message ) {
      const wsMsg = <wsMessage>message.data

      if (wsMsg.type == 'popup'){
        const msg = {
            id: state.messages.length,
            time: Date.now(), 
            message: message.data,
            readPopup: false,
        }
        state.messages.push(msg)
      } else if (wsMsg.type == 'message'){

      }
    },
    // Auto reconnect
    [wsStoreMutations.SOCKET_RECONNECT](state, count) {
      console.info("Message system reconnecting...", state, count);
    },
    // Reconnect error
    [wsStoreMutations.SOCKET_RECONNECT_ERROR](state) {
      state.socket.reconnectError = true;
    },

    [wsStoreMutations.REMOVE_ALL_POPUP](state){
      state.messages.forEach(x=>x.readPopup=true)
    },
    [wsStoreMutations.REMOVE_POPUP] (state, id: number){
      const m = state.messages.find((x)=>x.id == id) 
      if (m) m.readPopup = true
    },
    [wsStoreMutations.REMOVE_MESSAGE] (state, id: number){
      state.messages = state.messages.filter((x)=>x.id != id) 
    },
    [wsStoreMutations.REMOVE_ALL_MESSAGE] (state){
      state.messages = []
    },
  },
  actions: {
    [wsStoreActions.AUTH_WS] ({state}){
      const token = localStorage.getItem('id_token')
      if (state.socket.isConnected && token) globalProperties.$socket.send(JSON.stringify({token}));
    }
    
  }
}