import AsyncStorage from '@react-native-community/async-storage';

module.exports = {
    sortByKey: function(array, key){
        if(Array.isArray(array)==false){
            return
        }
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    },

    encrypt: function (obj, salt="NRLU") {
        obj = JSON.stringify(obj).split('');
        for(var i = 0, l = obj.length; i < l; i++)
            if(obj[i] == '{')
                obj[i] = '}';
            else if(obj[i] == '}')
                obj[i] = '{';
        let encode = encodeURI(salt + obj.join(''));
        return btoa(encode);
    },

    decrypt: function (obj, salt="NRLU") {
        obj = atob(obj);
        obj = decodeURI(obj);
        if(salt && obj.indexOf(salt) != 0)
            throw new Error('object cannot be decrypted');
        obj = obj.substring(salt.length).split('');
        for(var i = 0, l = obj.length; i < l; i++)
            if(obj[i] == '{')
                obj[i] = '}';
            else if(obj[i] == '}')
                obj[i] = '{';
        return JSON.parse(obj.join(''));
    },

    capitalize: function(s){
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1)
    },

    countWords: function(str) {
        return str.trim().split(/\s+/).length;
    }, 

    isMongoId: function(id){
        return id.match(/^[0-9a-fA-F]{24}$/) ? true : false 
    },
   
    loadState: async function(stateName){
        try {
            const serializedState = await AsyncStorage.getItem(stateName)
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    },

    saveState: async function(stateName, state){
        try {
            const serializedState = JSON.stringify(state);
            await AsyncStorage.setItem(stateName, serializedState)
        } catch (err){
            // ignore write errors
        }
    },

    deleteState: async function (stateName){
        try{
            await AsyncStorage.removeItem(stateName);
        }
        catch (err) {

        }
    },

    sizeOfObject: function( object ) {
        var objectList = [];
        var stack = [ object ];
        var bytes = 0;
    
        while ( stack.length ) {
            var value = stack.pop();
    
            if ( typeof value === 'boolean' ) {
                bytes += 4;
            }
            else if ( typeof value === 'string' ) {
                bytes += value.length * 2;
            }
            else if ( typeof value === 'number' ) {
                bytes += 8;
            }
            else if
            (
                typeof value === 'object'
                && objectList.indexOf( value ) === -1
            )
            {
                objectList.push( value );
    
                for( var i in value ) {
                    stack.push( value[ i ] );
                }
            }
        }
        return bytes;
    }

};
