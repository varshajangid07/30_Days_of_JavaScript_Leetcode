/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function(fn) {
    const ans={};
    for(const item of this){
        const key=fn(item);
        if(!ans[key]) ans[key]=[];
        ans[key].push(item);
    }
    return ans;
};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */