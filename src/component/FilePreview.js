import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { pdfjs, Document, Page } from 'react-pdf';

import '../assets/css/FilePreview.css';

function FilePreview(props) {

  const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    backgroundColor: 'lavender',
  }

  const canvas_style = {
    width: '100%',
    height: '100%',
  }

  const [img, setImg] = useState('');

  const downloadFileUrl = 'http://localhost:8080/downloadFile/'

  /******  파일 불러오기  ******/
  useEffect(() => {
    axios.get(downloadFileUrl+props.previewFile, {
      responseType: 'blob'
    })
      .then((res) => {
        console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] } ));
        setImg(url);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [props.previewFile])

  
  /******  PDF 미리보기 작업  *******/
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  /******  ***************  *******/

  return (
    <div style={style}>
      <FontAwesomeIcon icon={faCircleXmark} style={{cursor:'pointer', float:'right'}} onClick={() => props.setPreview(false)} />
      <h1>파일 미리보기</h1>

      { // 이미지, PDF 미리보기 구분
        props.previewFile.split('.')[1] === "jpg" ?

          <img src={img} alt="" />
        :          
          <div>
            <Document file={img} onLoadSuccess={onDocumentLoadSuccess} >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              {/* //이전 페이지 보기 */}
              <FontAwesomeIcon onClick={() => pageNumber > 1 ? setPageNumber(pageNumber-1):null} icon={faCaretLeft}
                style={{cursor:'pointer'}} />

              <span> Page {pageNumber} of {numPages} </span>

              {/* //다음 페이지 보기 */}
              <FontAwesomeIcon onClick={() => pageNumber < numPages ? setPageNumber(pageNumber+1):null} icon={faCaretRight} 
                style={{cursor:'pointer'}} />
            </p>
          </div>
      }
    </div>
  )
}

export default FilePreview