/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function(arr, fn) {
    const ans=[], n=arr.length;
    let size=0;
    for(let i=0;i<n;i++){
        if(fn(arr[i], i)){
            ans[size]=arr[i];
            size++;
        }
    }
    return ans;
};