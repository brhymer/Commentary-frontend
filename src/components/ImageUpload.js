import React, {useState, useEffect} from 'react';
import { Image } from "cloudinary-react";

function ImageUpload(props) {
  const [image, setImage] = useState()
  const [prevSource, setPrevSource] = useState()
  const onInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
  }

//   const removeImage = () => {
//     // cloudinary.uploader.destroy('zombie', function(err, result) { console.log(result) });
//   }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPrevSource(reader.result);
    }
  }
  const submitFile = (event) => {
    event.preventDefault();
    if(!prevSource) return;
    uploadImage(prevSource);
  }

  const postId = props.id

  const uploadImage = async (base64EncodedImage) => {
    try {
        await fetch('http://localhost:3002/upload', {
            method: 'POST',
            body: JSON.stringify({data: base64EncodedImage, id: postId}),
            headers: {'Content-type': 'application/JSON'}
       })
    } catch (err) {
        console.error(err);
    }
  }

  const displayImage = async () => {
    try {
        const res = await fetch('http://localhost:3002/images')
        const data = await res.json()
        setImage(data)
        // console.log(data)
    } catch (err) {
        console.error(err);
    }
  }

  useEffect(() => {
      displayImage()
  }, []);

  return (
      <div>
          {image && image.filter( i => i.includes(postId)).map((id, index) => (
          <Image
            cloudName="nurts"
            key ={index}
            publicId={id}
          />
          ) 
          )}        

          <form onSubmit={submitFile}>
            <input 
                name="imgFile" id="imgFile"
                type="file" accept="image/*" 
                onChange={onInputChange} 
                // value={image} 
            />
            <button type="submit">Upload</button>
          </form>
        {/* //   } */}
          {prevSource && (
            <img src={prevSource} alt='' style={{height: '300px'}}/>   
          )}
        {/* {images ? <button onClick={() => removeImage("image")}>Remove Image</button> : 
        <button onClick={() => beginUpload("image")}>Upload Image</button>} */}
    </div>
  );
}

export default ImageUpload;