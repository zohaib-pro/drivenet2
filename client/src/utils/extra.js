export function GetStringsWithDelay(strings, onNext=(str)=>{}, delay=2000) {
    //Initialize a counter for the current index
    let currentIndex = 0;

    // Function to print the current string and set up the next print
    function printNext() {
        // Check if the current index is within the array bounds
        if (currentIndex < strings.length) {
            onNext(strings[currentIndex]);
            currentIndex++;
            // Set a timeout to call this function again after 2 seconds
            setTimeout(printNext, delay);
        }
    }

    // Start the printing process
    printNext();

}

export const getTimeDiff = (vehicleAd) => {
    const timeDiff = new Date() - new Date(vehicleAd.createdAt);
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

export const getUpdatedAt = (obj) => {
    if (!obj) 
        return "1970-01-01"
    return obj?.updatedAt.substring(0, obj?.updatedAt.indexOf('T'));
}