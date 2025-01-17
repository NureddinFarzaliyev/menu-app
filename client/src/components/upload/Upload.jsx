import React, { useEffect, useState } from "react";
import axios from "axios";
import { sendPutRequest } from "../../utils/sendPutRequest";

const UploadImage = ({saveTo, onSave}) => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return console.log("Please select a file.");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "menuapp");

        try {
            const response = await axios.post(import.meta.env.VITE_CLOUDINARY_LINK, formData);
            setImageUrl(response.data.secure_url);
        } catch (err) {
            console.error("Error uploading file:", err);
        }
    };

    useEffect(() => {
        if(imageUrl && saveTo){
            sendPutRequest(saveTo, {logo: imageUrl}, (response) => {
                if(response.success){
                    console.log("Image uploaded to Cloudinary and saved to database")
                    onSave();
                }else if(response.error){
                    console.log(response.error)
                }
            })
        }
    }, [imageUrl])

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && (
          <div>
            <p>Image uploaded successfully:</p>
          {/* <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} /> */}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
