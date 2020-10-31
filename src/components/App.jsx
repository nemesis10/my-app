import React, {useState} from 'react';
import {storage} from "../firebase/index";
import CropImage from "./CropImage";



function App() {
  
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = React.useState();
  const [preview, setPreview] = React.useState();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setError("");
        setImage(selectedFile);
    } else {
      setError("Please select an image to upload");
    }
    }
    setFile(file);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  
  };

  const handleClick = () => {
    if(image) {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            setProgress(progress);
          },
          error => {
            setError(error);
          },
          () => {
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setUrl(url);
              setProgress(0);
            });
          }

        );  

    } else {
      setError("Error please choose an image to upload");
    }
  };

  const onCropSave = ({ file, preview }) => {
    setPreview(preview);
    setFile(file);
  }

  return (
    <>
    <div className="upload">

    <div>
    {url ? (<img src={url} />) : (<img src={preview || require("../images/profilepic.jpg")} />)}
    </div>

    <div>
    <input type="file" onChange={handleChange} />
    <button onClick={handleClick}>Upload</button>
    </div>
      

    <div style={{height: "100px"}} >
    {progress > 0 ? <progress value={progress} max="100" /> : ""}
    <p style={{color: "red"}}>
      {error}
    </p>
    </div>

    </div>

    <CropImage 
    onSave={onCropSave}
    selectedFile={image}  
    />
    </>
  );

}

export default App;