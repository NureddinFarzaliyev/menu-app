import axios from "axios";

const uploadToCloudinary = async (file, setImageUrl) => {
    if (!file) return console.log("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "menuapp");

    try {
        const response = await axios.post(import.meta.env.VITE_CLOUDINARY_LINK, formData);
        if(setImageUrl){
            setImageUrl(response.data.secure_url);
        }else{
            return response.data.secure_url;
        }
    } catch (err) {
        console.error("Error uploading file:", err);
    }
};

export const useCloudinary = () => {
    return { uploadToCloudinary };
}
