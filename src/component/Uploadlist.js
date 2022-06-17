import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileSaver from 'file-saver'
import _ from 'lodash';
// import Preview from './Preview'
import Filelist from './Filelist'
import JSZip from 'jszip';

function Uploadlist(props) {
  const fileinfo = props.fileinfo;
  const setFileinfo = props.setFileinfo;
  const setPreview = props.setPreview;
  const setPreviewFile = props.setPreviewFile;

  const [filesCheck, setFilesCheck] = useState(false);
  const [checkedfile, setCheckedfile] = useState([]);

  // console.log("checked  ", checkedfile)

  const uploadFileUrl = 'http://localhost:8080/uploadFile'
  const uploadFilesUrl = 'http://localhost:8080/uploadMultipleFiles'
  const downloadFileUrl = 'http://localhost:8080/downloadFile/'

  const selectAllFiles = (checked) => {
    if(checked) setFilesCheck(true)
    else if(!checked) setFilesCheck(false)
  }

  const checkAll = () => {

  }

  useEffect(() => {
    // setCheckedfile([...checkedfile])
    setFilesCheck(false)
  }, [fileinfo])


  /******************      저장된 파일 불러오기      ******************/
  // useEffect(() => {

  // }, [fileinfo])

  /******************      등록한 파일 업로드      ******************/
  const uploadFile = () => {
    console.log(fileinfo)
    if(checkedfile.length === 0) alert("저장할 파일을 선택해주세요.")
    /***  파일 여러개 선택 저장  ***/
    else if(checkedfile.length>1){
      let formData = new FormData();
      
      for(let i=0; i<checkedfile.length; i++){
        formData.append("files", fileinfo[checkedfile[i]]);
      }

      axios.post(uploadFilesUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log(res)
          alert("파일을 저장하였습니다.")
        })
        .catch((error) => {
          console.log(error)
          alert("파일 저장에 실패하였습니다.")
        })

    } else {
      /***  파일 하나 선택 저장  ***/
      let formData = new FormData();
      formData.append("file", fileinfo[checkedfile[0]]);

      axios.post(uploadFileUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log(res)
          // save -> true 변경

          // props.setFileinfo(
          //   fileinfo.map( (file, idx) => 
          //     idx == checkedfile[0] ?
          //       {
          //         ...file
          //       }
          //     :
          //     file
          //   )
          // );
          console.log(fileinfo)
          // setFileinfo(fileinfo.filter((val,idx) => idx != checkedfile[0]))
          // setFileinfo(fileinfo.map((val, idx) => 
          //     idx == checkedfile[0] ? {...val, save: true} : val
          // ))
          alert("파일을 저장하였습니다.")
        })
        .catch((error) => {
          console.log(error)
          alert("파일 저장에 실패하였습니다.")
        })

    }
  }

  console.log("info   ", fileinfo)


  /******************      등록 또는 저장한 파일 삭제      ******************/
  // 저장된 파일 삭제 API 현재 없음
  const deleteFile = () => {
    if(checkedfile.length === 0) alert("삭제할 파일을 선택해주세요.")

    // else if(checkedfile.length === fileinfo.length) {
    //   setFileinfo([]);
    // }
    else if(checkedfile.length > 1) {
      /**  파일 다중 삭제  **/

        checkedfile.sort();
        let arr = [];
        let prevFile = fileinfo
  
        checkedfile.map((el) => {
          return fileinfo.filter((val, idx) => {
            if(el === idx ) arr.push(val);
          })
        })
        console.log("arr ", arr)
        for(let i=0; i<prevFile.length; i++){
          if(arr.includes(prevFile[i])) {
            prevFile.splice(i, 1);
            i--;
          }
        }
        // setFileinfo(prevFile);
        props.changeFile(prevFile)
        setCheckedfile([])
        setFilesCheck(false)
        

    } else {
      /**  파일 하나 삭제  **/
      checkedfile.map((el) => {
        return setFileinfo(fileinfo.filter((val, idx) => idx != el))
      })
    }
    setCheckedfile([])
  }


  /******************      저장된 파일 다운로드      ******************/
  const downloadFile = async () => {
    if(checkedfile.length === 0) alert("다운로드할 파일을 선택해주세요.")
    
    /***  파일 여러개 선택 압축 다운로드  ***/
    else if(checkedfile.length>1){
      const zip = new JSZip();
      let ziparray = [];
      for(let i=0; i<checkedfile.length; i++){
        axios.get(downloadFileUrl+fileinfo[checkedfile[i]].name, {
          responseType: 'blob'
        })
         /****    압축파일 생성(1)    ****/
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })

        let fileRes = await fetch(downloadFileUrl+fileinfo[checkedfile[i]].name)
        let fileBlob = await fileRes.blob();
        zip.file(fileinfo[checkedfile[i]].name, fileBlob)

        // .then((res) => {
        //   FileSaver.saveAs(res.data, fileinfo[checkedfile[i]].name);
        // })
        // .catch((error) => {
        //   console.log(error)
        // })
      }
      /****    압축파일 생성(2)    ****/
      zip.generateAsync({type:"blob"})
        .then(blob => {
          FileSaver.saveAs(blob, "다중파일압축.zip")
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      /***  파일 하나 선택 다운로드  ***/
      axios.get(downloadFileUrl+fileinfo[checkedfile[0]].name, {
        responseType: 'blob'
      })
        .then((res) => {
          FileSaver.saveAs(res.data, fileinfo[checkedfile[0]].name);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  

  return (
    <div>
      <h3>올린파일</h3>
      {/* ------- 파일 미리보기용 -------- */}
      {/* <Preview fileurl={props.fileurl} fileinfo={props.fileinfo} deletefile={props.deletefile} /> */}
      
      <div style={{width: '800px', margin:'0 auto 20px', textAlign:'right'}}>
        <button onClick={deleteFile}>삭제</button>
        <button onClick={uploadFile}>저장</button>
        <button onClick={downloadFile}>다운로드</button>
      </div>
      
      <table style={{width: '800px', margin:'0 auto'}}>
        <thead>
          <tr>
            <th><input type="checkbox" onChange={(e) => (selectAllFiles(e.target.checked))} checked={filesCheck ? true : false} /></th>
            <th>No</th>
            <th>FileName</th>
            <th>Preview</th>
            {/* <th>state</th> */}
          </tr>
        </thead>
        {/* <tbody> */}

          <Filelist checkedfile={checkedfile} fileinfo={fileinfo} filesCheck={filesCheck} setFilesCheck={setFilesCheck} setCheckedfile={setCheckedfile} setPreview={setPreview} setPreviewFile={setPreviewFile} />

        {/* </tbody> */}
      </table>
    </div>
  )
}

export default Uploadlist