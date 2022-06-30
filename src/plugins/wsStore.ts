import { Module } from 'vuex'
import { RootState } from '/src/store'

export interface wsRootState {
    socket: any;
    messages: messageType[];
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

}



export const wsStore: Module<wsRootState, RootState> = {
  state: {
    socket: {
      isConnected: false,
      // Message content
      message: "",
      // Reconnect error
      reconnectError: false,
      // Heartbeat message sending time
      heartBeatInterval: 50000,
      // Heartbeat timer
      heartBeatTimer: 0
    },
    messages:[],

  },
  getters:{
    getWSMessage: state => state.messages,
    getWSMessagePopup: state => state.messages.filter((x: messageType) => x.readPopup == false ),
    getWSMessagePopupCnt: state => state.messages.filter((x: messageType) => x.readPopup == false ).length,
    getWSMessageCnt: state => state.messages.length,
  },
  mutations: {
    // Connection open
    [wsStoreMutations.SOCKET_ONOPEN] (state, event) {

      // globalProperties.$socket = event.currentTarget;
      state.socket.isConnected = true;
      // When the connection is successful, start sending heartbeat messages regularly to avoid being disconnected by the server
      state.socket.heartBeatTimer = setInterval(() => {
        const message = "Heartbeat message";
      //   state.socket.isConnected &&
      //     globalProperties.$socket.send(JSON.stringify({
      //       code: 200,
      //       msg: message
      //     }));
      }, state.socket.heartBeatInterval);
    },

    [wsStoreMutations.SOCKET_ONCLOSE] (state, event) {
      state.socket.isConnected = false;
      clearInterval(state.socket.heartBeatTimer);
      state.socket.heartBeatTimer = 0;
      console.log("The line is disconnected: " + new Date());
      console.log(event);
    },
    // An error occurred
    [wsStoreMutations.SOCKET_ONERROR] (state, event) {
      console.error(state, event);
    },
    // Receive the message sent by the server
    [wsStoreMutations.SOCKET_ONMESSAGE](state, message) {
      //console.log(message)
      const msg = {
          id: state.messages.length,
          time: Date.now(), 
          message: message.data,
          readPopup: false,
      }
      state.messages.push(msg)
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
    
  }
}