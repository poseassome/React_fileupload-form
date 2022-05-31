import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { PDFtoIMG } from 'react-pdf-to-image';

// import PDFpreview from './PDFpreview'

function FilePreview(props) {

  const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    backgroundColor: 'lavender',
  }

  const [img, setImg] = useState('');

  const downloadFileUrl = 'http://localhost:8080/downloadFile/'

  useEffect(() => {
    console.log(downloadFileUrl+props.previewFile)
    axios.get(downloadFileUrl+props.previewFile, {
      responseType: 'blob'
    })
      .then((res) => {
        console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] } ));


        setImg(url);

      })
      .catch((error) => {
        console.log(error)
      })
  }, [props.previewFile])
  

  return (
    <div style={style}>
      <FontAwesomeIcon icon={faCircleXmark} style={{cursor:'pointer'}} onClick={() => props.setPreview(false)} />
      <h1>파일 미리보기</h1>

      {
        props.previewFile.split('.')[1] === "jpg" ?

          <img src={img} alt="" />
        :
          // <PDFpreview pdfurl={img.split("blob:")[1]} />
          <PDFtoIMG file='http://localhost:8080/downloadFile/테스트페이지.pdf'>
            {(pages) => {
                if (!pages.length) return 'Loading...';
                return pages.map((page, index)=>
                    <img key={index} src={page}/>
                );
            }}
          </PDFtoIMG>

      }

      <p>미리보기</p>
    </div>
  )
}

export default FilePreview