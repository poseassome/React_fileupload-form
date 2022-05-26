import React, { useRef, useState } from 'react'
import Uploadlist from './Uploadlist'

function Fileupload() {

  const [fileurl, setFileurl] = useState([]);
  const [fileinfo, setFileinfo] = useState([]);
  
  const fileInput = useRef();

  const handleChangeFile = (e) => {
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
        setFileinfo(prev => [...prev, x])
        reader.readAsDataURL(x)

        reader.onloadend = () => {
          const previewImgUrl = reader.result
      
          if(previewImgUrl) {
            setFileurl([...fileurl, previewImgUrl])
          }
        }
      }
    }
  }
  console.log(fileurl)

  const uploadFiles = (e) => {
    e.preventDefault();
    fileInput.current.click();
  }

  const deletefile = (index) => {
    console.log(fileinfo)
    // setFileinfo(fileinfo.splice(index, 1))
    setFileinfo(fileinfo.filter((val,idx) => idx !== index))
  }

  const submitFiles = () => {

  }

  return (
    <div>
      <h2>파일 올리기</h2>
      <input type="file" id="fileinput" onChange={handleChangeFile} multiple="multiple" encType="multipart/form-data"
        ref={fileInput} style={{display: 'none'}} />
      <button onClick={uploadFiles}>파일등록</button>

      {
        fileurl.length > 0 ?
          <Uploadlist fileurl={fileurl} fileinfo={fileinfo} deletefile={deletefile} />
        :
          null
      }
      <button style={{display:'block'}} onClick={submitFiles}>저장</button>
    </div>
  )
}

export default Fileupload