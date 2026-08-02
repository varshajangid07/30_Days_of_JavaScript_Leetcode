/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
    if(obj==null) return null;
    if(Array.isArray(obj)) return obj.filter(Boolean).map(compactObject);
    if(typeof obj!='object') return obj;
    const comp={};
    for(const key in obj){
        let val=compactObject(obj[key]);
        if(val) comp[key]=val;
    }
    return comp;
};