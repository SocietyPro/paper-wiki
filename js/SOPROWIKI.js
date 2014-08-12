var SOPROWIKI = SOPROWIKI || {};

function supportsHTML5Storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

if(supportsHTML5Storage()){
  SOPROWIKI.storageType = "localstorage";
  console.log("Current localstorage");
  console.log(window.localStorage);
} else { 
  SOPROWIKI.storageType = "mock";
}

SOPROWIKI.getTopic = function(topicid, callback){
  console.log('Fetching:');
  console.log(topicid);

  switch(SOPROWIKI.storageType){
    case 'localstorage':
      getFromLocalStorage(topicid, callback); 
      break;
    case 'memory':
      getFromMemory(topicid, callback); 
      break;
    case 'mongodb':
      getFromMongoDB(topicid, callback); 
      break;
    case 'mock': 
      getFromMock(topicid, callback); 
      break;
    default: 
      return callback('Bad SOPROWIKI.storageType');
      break;
  };
};

SOPROWIKI.saveTopic = function(topicObj, callback){
  console.log('Stashing:');
  console.log(topicObj);
  switch(SOPROWIKI.storageType){
    case 'localstorage':
      saveToLocalStorage(topicObj, callback); 
      break;
    case 'memory':
      saveToMemory(topicObj, callback); 
      break;
    case 'mongodb':
      saveToMongoDB(topicObj, callback); 
      break;
    case 'mock': 
      saveToMock(topicObj, callback); 
      break;
    default: 
      break;
  };
};

/* LOCALSTORAGE */
function getFromLocalStorage(topicid, callback){
  var str = localStorage.getItem(encodeLS(topicid));
  if(str === null){
    return callback('Not found');
  } else {
    callback(null, unJSON(str));
  }
}

function saveToLocalStorage(topicObj, callback){
  var topicid = topicObj.topicid;
  var str = JSONify(topicObj);
  try{
    localStorage.setItem(encodeLS(topicid), str);
  } catch(e) {
    return callback(e);
  }
  return callback(null);
};

function encodeLS(topicid){
  var LSid = "SOPRO.wiki."+topicid;
  return LSid;
}

function decodeLS(LSid){
  var topicid = LSid.slice(11, -1); // everything after SOPRO.wiki.
  return topicid;
}


function JSONify(obj){
  // Warning, eats function properties!
  return JSON.stringify(obj);
}

function unJSON(str){
  return JSON.parse(str);
};


/* MOCK */

SOPROWIKI.mockTopic = {
  topicid: "test-async-topic",
  topic: "Test Async Topic",
  information: "See wiki-topic.html and SOPROWIKI.js",
};

function getFromMock(topicid, callback){
  window.setTimeout(function(){
    callback(null, SOPROWIKI.mockTopic);
  }
  ,1);
};

function saveToMock(topicObj, callback){
  window.setTimeout(function(){
    SOPROWIKI.mockTopic = topicObj;
    callback(null);
  }
  ,1);
};

/* MEMORY */
