import request from "request";
import fs from "fs";

export const downloadFile = (url, path, callback) => {
  request.head(url, () => {
    request(url).pipe(fs.createWriteStream(path)).on("close", callback);
  });
};
