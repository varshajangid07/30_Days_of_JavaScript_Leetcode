/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    const ans=[];
    for(let i=0;i<arr.length;i++){
        const newValue=fn(arr[i], i);
        ans.push(newValue);
    }
    return ans;
};