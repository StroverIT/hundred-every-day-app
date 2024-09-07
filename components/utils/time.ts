export const convertToTwoDigest = (hour: number, minute: number) => {
  return `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }`;
};
