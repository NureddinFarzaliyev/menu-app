import React, { useEffect, useState } from "react";
import { sendPutRequest } from "../../utils/sendPutRequest";
import { useCloudinary } from "../../utils/useCloudinary";
import { useParams } from "react-router-dom";
import { defaultResponseHandler } from "../../utils/defaultResponseHandler";

const UploadMenuImage = ({onSave}) => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const { uploadToCloudinary } = useCloudinary();
    const {menuId} = useParams()

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    useEffect(() => {
        if(imageUrl !== ""){
            sendPutRequest(`/menus/${menuId}`, {imageUrl}, (res) => defaultResponseHandler(res, onSave))
        }
    }, [imageUrl])

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => uploadToCloudinary(file, setImageUrl)}>Upload</button>
      {imageUrl && (
          <div>
            <p>Image uploaded successfully:</p>
        </div>
      )}
    </div>
  );
};

export default UploadMenuImage;
