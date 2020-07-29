import React, { useState, useEffect} from 'react';
import { Image } from "cloudinary-react";

function ImageUpload(props) {
  const [image, setImage] = useState()
  const [prevSource, setPrevSource] = useState()
  const onInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
  }

  const removeImage = async () => {

    try {
        await fetch(`http://localhost:3002/images/delete/${postId}`, {
            method: 'DELETE',
            body: JSON.stringify({ id: postId}),
            headers: {'Content-type': 'application/JSON'}

        })
    } catch (err) {
        console.error(err)
    }
    displayImage();
  }

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
    displayImage();
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
    finally {
    displayImage()
    }
  }

  const displayImage = async () => {
    try {
        const res = await fetch(`http://localhost:3002/images/upload/${postId}`)
        const data = await res.json()
        setImage(data)
        console.log(data)
    } catch (err) {
        console.error(err);
    }
  }

  useEffect(() => {
      displayImage()
  }, []);

  return (
      <div>

          {Array.isArray(image) && image != '' ?  image.map((id, index) => (
          <div key ={`${index}i`}>
            <img src={`https://res.cloudinary.com/nurts/image/upload/v1/upload/${postId}?${Math.floor(Math.random() * 100)}`}/>
            {/* <Image
                cloudName="nurts"
                // key = {`${index}i`}
                publicId={id}
            /> */}
            <button className="removeimage" onClick={removeImage}>Remove this image</button>
          </div>
          )) :
          <form onSubmit={submitFile}>
            <input 
                name="imgFile" id="imgFile"
                type="file" accept="image/*" 
                onChange={onInputChange} 
                // value={image} 
            />
            <button type="submit">Upload</button>
          </form>
            }
          {prevSource && (
            <img src={prevSource} alt='' style={{height: '300px'}}/>   
          )}
    </div>
  );
}

export default ImageUpload;