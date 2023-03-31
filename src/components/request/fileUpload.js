import { useHistory } from "react-router-dom";
import { url } from "../../utiles/url";
import fetch from "isomorphic-fetch";
const FileApiRequests = () => {
  const addFile = (data) => {
    return fetch(`${url}/file`, {
      method: "POST",
      headers: {},
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => err);
  };
  const viewFiles = () => {
    return fetch(`${url}/file`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => err);
  };
  const deletFile = (id) => {
    return fetch(`${url}/file/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => err);
  };

  return {
    viewFiles,
    deletFile,
    addFile
  };
};

export default FileApiRequests;
