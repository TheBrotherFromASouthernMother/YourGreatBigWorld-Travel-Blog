array = [2,4,7,8,9,10,14,17,18,20];

function binarySearch(arr, target) {
    let min = 0
    let max = arr.length-1;
    let mean;

    while(arr[mean] != target) {
        if (max < min) {
            console.log(`target: ${target} not found in data set provided`)
            return false;
        }
        mean = Math.floor((min + max) / 2);
        console.log(mean)
        if (arr[mean] > target) {
            max = mean - 1;
        } else if (arr[mean] < target) {
            min = mean + 1;
        }
    }
    console.log(`Target found at index: ${mean}`);
    return true;
}

binarySearch(array, 3)
