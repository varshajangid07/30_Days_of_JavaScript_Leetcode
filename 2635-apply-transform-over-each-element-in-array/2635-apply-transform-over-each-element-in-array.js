/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    const n=arr.length;
    const ans=new Array(n);
    for(let i=0;i<n;i++){
        ans[i]=fn(arr[i], i);
    }
    return ans;
};