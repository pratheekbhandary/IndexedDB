const pratDB = (function() {
    var pdb = {};
    var datastore = null;

    /** Open conection to the DB **/
    pdb.open = function() {
        console.log("Creating Indexed DB");
        var request = indexedDB.open("hosa",1);

        request.onupgradeneeded = function() {
            console.log("Inside OnUpgarde");
            // The database did not previously exist, so create object stores and indexes.
            var db = request.result;
            var store = db.createObjectStore('state1', {
                keyPath: 'timestamp'
            });
            store.put({game: "Cards", score: 100, speed: 23000, correct: 50, mistakes: 2, user: "Breta", timestamp: 1});
            store.put({game: "Numbers", score: 300, speed: 50000, correct: 100, mistakes: 1, user: "Breta", timestamp: 2 });
            store.put({game: "Cards", score: 50, speed: 30000, correct: 20, mistakes: 32, user: "Guest", timestamp: 3});
            store.put({game: "Cards", score: 120, speed: 15000, correct: 52, mistakes: 0, user: "Breta", timestamp: 5});

        };

        request.onsuccess = function() {
            datastore = request.result;
            console.log("Successfully created Indexed DB");
        };

        // Handle errors when opening the datastore.
        request.onerror = pdb.onerror;
    };

    pdb.fetchStats = function() {
        var db = datastore;
        var tx = db.transaction(['state1'], "readonly");
        var store = tx.objectStore('state1');
        var request=store.openCursor();

        var listOfTimestams=[];
        request.onsuccess = function(event) {
            var cursor = event.target.result;
            
            console.log("onsuccess"+event.target.result)
            if(cursor) {

                listOfTimestams.push(cursor.value.timestamp);
                
                console.log(cursor.primaryKey);
                cursor.continue();
              } else {
                console.log('Entries all displayed here'+listOfTimestams);
              }
        };

        request.onerror = pdb.onerror;
    };


    pdb.fetchSingleValue = function() {
        var db = datastore;
        var tx = db.transaction(['state1'], "readonly");
        var store = tx.objectStore('state1');

        var request  = store.get(1)

        request.onsuccess = function(event) {
            var cursor = event.target.result;
        
            
            console.log("onsuccess"+JSON.stringify(event.target.result));
        };

        request.onerror = pdb.onerror;
    };


  

   

    pdb.onerror = function() {
        console.log("Something went wrong! Error in database");
    }

    // Export the mkDB object.
    return pdb;
}());

export default pratDB;
