import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import FilePreview from './FilePreview';
import Uploadlist from './Uploadlist'

function Fileupload() {

  const [fileurl, setFileurl] = useState([]);
  const [fileinfo, setFileinfo] = useState([]);
  const [preview, setPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState('');
  
  const fileInput = useRef();

  const handleChangeFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    /*
    if(e.target.files[0]) {
      setFileinfo(e.target.files[0])
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result
  
      if(previewImgUrl) {
        setFileurl([...fileurl, previewImgUrl])
      }
    }

    let files = e.target.files;
    let formData = new FormData(); // formData 객체를 생성한다.
    for (let i = 0; i < files.length; i++) { 
      formData.append("files", files[i]); // 반복문을 활용하여 파일들을 formData 객체에 추가한다
    }
*/

    ///////////
    if(e.target.files[0]) {
      for(let x of e.target.files) {
        x['save'] = false;
        setFileinfo(prev => [...prev, x])
        // reader.readAsDataURL(x)

        // reader.onloadend = () => {
        //   const previewImgUrl = reader.result
      
        //   if(previewImgUrl) {
        //     setFileurl([...fileurl, previewImgUrl])
        //   }
        // }
      }
    }
    e.target.value = ''
  }
  console.log("fileinfo   ", fileinfo)

  const uploadFiles = (e) => {
    e.preventDefault();
    fileInput.current.click();
  }

  const deletefile = (index) => {
    // setFileinfo(fileinfo.splice(index, 1))
    setFileinfo(fileinfo.filter((val,idx) => idx !== index))
  }

  const changeFile = (file) => {
    setFileinfo(file)
  }




  return (
    <div>
      <h2>파일 올리기</h2>
      <input type="file" id="fileinput" onChange={handleChangeFile} multiple="multiple" encType="multipart/form-data" accept=".pdf, .jpeg, .jpg, .png"
        ref={fileInput} style={{display: 'none'}} />
      <button onClick={uploadFiles}>파일추가</button>

      <hr />

      {
        fileinfo.length > 0 && fileinfo ?
          <Uploadlist changeFile={changeFile} fileurl={fileurl} fileinfo={fileinfo} setFileinfo={setFileinfo} setPreview={setPreview} setPreviewFile={setPreviewFile} />
        :
          null
      }

      {/* 미리보기 */}
      { preview ?
          <FilePreview setPreview={setPreview} previewFile={previewFile} />
        :
          null
      }
    </div>
  )
}

export default Fileupload