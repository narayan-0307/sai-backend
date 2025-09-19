export function convertTimestampToYYYYMMDD(timestamp) {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Months are zero-indexed, so we add 1
    const day = date.getUTCDate();

    // Padding single digits with leading zeros
    const formattedYear = year;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDay = day < 10 ? "0" + day : day;

    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}
