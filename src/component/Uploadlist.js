import React, { useEffect, useState } from 'react'
// import Preview from './Preview'
import Filelist from './Filelist'

function Uploadlist(props) {
  const fileinfo = props.fileinfo;
  const setFileinfo = props.setFileinfo;

  const [filesCheck, setFilesCheck] = useState(false);
  const [checkedfile, setCheckedfile] = useState([]);

  const selectAllFiles = (checked) => {
    if(checked) setFilesCheck(true)
    else if(!checked) setFilesCheck(false)
  }

  const checkAll = () => {

  }

  const deleteFile = () => {
    if(checkedfile.length > 0) {
      checkedfile.map((el) => {
        return setFileinfo(fileinfo.filter((val, idx) => idx != el))
        
      })
      console.log("test   ", fileinfo)
    }
    setCheckedfile([])
  }
console.log("parent  ", checkedfile)
console.log("info    ", fileinfo)

  

  return (
    <div>
      <h3>올린파일</h3>
      {/* ------- 파일 미리보기용 -------- */}
      {/* <Preview fileurl={props.fileurl} fileinfo={props.fileinfo} deletefile={props.deletefile} /> */}
      
      <div>
        <button onClick={deleteFile}>삭제</button>
        <button>저장</button>
      </div>
      
      <table style={{width: '500px', margin:'0 auto'}}>
        <thead>
          <tr>
            <th><input type="checkbox" onChange={(e) => (selectAllFiles(e.target.checked))} /></th>
            <th>No</th>
            <th>FileName</th>
            <th>Preview</th>
            <th>state</th>
          </tr>
        </thead>
        {/* <tbody> */}
          <Filelist fileinfo={fileinfo} filesCheck={filesCheck} setCheckedfile={setCheckedfile} />
        {/* </tbody> */}
      </table>
    </div>
  )
}

export default Uploadlist