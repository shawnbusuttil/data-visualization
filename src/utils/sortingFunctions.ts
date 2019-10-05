export function sort<T>(data: T[], key: string | number = 0, descending = false) {
    return data.sort((a: T, b: T) => {
        return descending 
            ? a[key] < b[key] ? 1 : -1
            : a[key] > b[key] ? 1 : -1
    });
}

export function sortByDOB<T>(data: T[], key: string, descending = false) {
    return data.sort((a: T, b: T) => {
        const aDate = a[key].split('/').reverse().join();
        const bDate = b[key].split('/').reverse().join();
        return descending 
            ? aDate < bDate ? 1 : -1
            : aDate > bDate ? 1 : -1
    });
}