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

    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  
  };

  const handleClick = () => {
    if(file) {
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
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
            .child(file.name)
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

  const onModalClose = () => {

  }

  return (
    <>
    <div className="upload">

    <div>
    {url ? (<img className="profilepic" src={url} />) : (<img className="profilepic" src={ require("../images/profilepic.jpg")} />)}
    </div>

    <div>
    <input type="file" onChange={handleChange} />
    <button className="btn" onClick={handleClick}>Upload</button>
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
    onClose={onModalClose}
    selectedFile={image}  
    />
    </>
  );

}

export default App;