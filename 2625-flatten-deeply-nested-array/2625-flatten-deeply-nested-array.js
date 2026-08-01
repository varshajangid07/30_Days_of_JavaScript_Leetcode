/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    const result = [];
    const flattenHelper = (currentArray, currentDepth) => {
        for (let i = 0; i < currentArray.length; i++) {
            const element = currentArray[i];
            if (Array.isArray(element) && currentDepth > 0) {
                flattenHelper(element, currentDepth - 1);
            } else {
                result.push(element);
            }
        }
    };
    flattenHelper(arr, n);
    return result;
};