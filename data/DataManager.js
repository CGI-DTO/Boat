import WMSDataRetriever from "/Ocean/data/WMSDataRetriever.js";

// Manages where to get the data from (API, WMS, or static files)
class DataManager{


  constructor(){

    // Constructor
    this.WMSDataRetriever = new WMSDataRetriever();
  }




  





  // PUBLIC METHODS




}

// Singleton
const dataManager = new DataManager();
export default dataManager;