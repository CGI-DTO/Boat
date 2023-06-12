import WMSDataRetriever from "/Ocean/data/WMSDataRetriever.js";

// Manages where to get the data from (API, WMS, or static files)
class DataManager{


  constructor(){

    // Constructor
    this.WMSDataRetriever = new WMSDataRetriever();

    // Web socket events
 
  }




  





  // PUBLIC METHODS
  startWebSocket = function(){
    // Web socket
    //window.AppSocket = new WebSocket('ws://127.0.0.1:8000');
    window.AppSocket = new WebSocket('ws://digitaltwinocean.live');

    let ws = window.AppSocket;
    window.eventBus.emit('DataManager_WebSocketStatus', WebSocket.CONNECTING);
    // Web socket events
    ws.onopen = function(event) {
      console.log('***********************Connected to: ' + event.currentTarget.URL);
      console.log(event);
      window.eventBus.emit('DataManager_WebSocketStatus', ws.readyState);
    };
    ws.onerror = function(error) {
      console.log(error);
      window.eventBus.emit('DataManager_WebSocketStatus', ws.readyState);
    };
    ws.onmessage = function(event) {
      console.log(event.data);
      let msg = event.data;
      window.eventBus.emit('DataManager_WebSocketMessage', msg);
    };
  }

  reconnectWebSocket = function(){
    let ws = window.AppSocket;
    if (ws.readyState == WebSocket.CLOSED){
      this.startWebSocket();
    }
  }



}

// Singleton
const dataManager = new DataManager();
export default dataManager;