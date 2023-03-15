// npm packages
import imageToBase64 from "image-to-base64/image-to-base64.js";

// export const
import { keys } from "../lib/keys.js";
import { downloadURL } from "./downloadURL.js";

// destructuring
const { telegram_token } = keys;

export const photoToBase64 = async (fileId) => {
  const res = await fetch(
    `https://api.telegram.org/bot${telegram_token}/getFile?file_id=${fileId}`
  );

  const res2 = await res.json();
  const filePath = res2.result.file_path;

  return await imageToBase64(`${downloadURL(filePath)}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("err", err);
    });
};
