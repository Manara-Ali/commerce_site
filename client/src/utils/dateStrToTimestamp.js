export const dateStrToTimestamp = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-US", {timeZone: "America/New_York", hour12: true});
};
