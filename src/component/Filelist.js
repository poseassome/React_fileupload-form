import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faDownload } from '@fortawesome/free-solid-svg-icons'
import { faImage, faFileLines, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

function Filelist( props ) {

  const files = props.fileinfo;    // files 배열
  const Allfiles = props.filesCheck;    // 전체선택

  const [checkedList, setCheckedList]= useState([]);    // 파일 check 여부


console.log(checkedList)
  /***  파일 하나 선택 check  ***/
  const onCheckedElement = (checked, item) => {
    if(checked) {
      setCheckedList([...checkedList, item]);
    }
    else if(!checked) {
      props.setFilesCheck(false)
      setCheckedList(checkedList.filter(el => el !== item));
    }
  }

  const checkref = useRef([]);

  useEffect(() => {
    setCheckedList([])
  }, [files])

  useEffect(() => {
    if(Allfiles===true){
      let arr = []
      checkref.current.forEach((val, idx) => {
        val.checked = true;
        arr.push(idx)
      })
      setCheckedList(arr)
    }
    else if(Allfiles===false && checkedList.length === files.length) setCheckedList([]);
  }, [Allfiles])

console.log(checkedList)

  useEffect(() => {
    props.setCheckedfile(checkedList)
    if(checkedList.length === files.length) props.setFilesCheck(true)
  }, [checkedList])

// const checkref = useRef([]);
// if(Allfiles === true) {
//   checkref.current.forEach((element, index) => {
//     console.log(element)
//     element.checked = true;
//   });
// } else {
//   checkref.current.forEach(element => {
//     element.checked = false
//   });
// }

  const showPreview = (name) => {
    console.log(name)
    props.setPreview(true);
    props.setPreviewFile(name);
  }

  const Onefile= files.map( (file, idx) => (
    <tr key={idx}>
      <td>
        <input type="checkbox" value={idx}
          onChange={(e) => onCheckedElement(e.target.checked, Number(e.target.value))}
          checked={checkedList.includes(idx) ? true : false}
          ref={el => checkref.current[idx] = el} 
          />
       </td>
      <td>{idx + 1}</td>
      <td style={{textAlign: 'left', paddingLeft:'50px'}}>
        <span style={{display:'inline-block', width: '20px', textAlign:'center'}}>
          {
            file.name.split('.')[1] === 'jpg' ?
              <FontAwesomeIcon icon={faImage} />
            :
              <FontAwesomeIcon icon={faFileLines} />
          }
        </span>
        {`  ${file.name}`}
       </td>
      <td>
        {/* {
          file.save ?
            <FontAwesomeIcon icon={faEye} style={{cursor: 'pointer'}} />
          :
            <FontAwesomeIcon icon={faEyeSlash} />
        } */}

        {/* !!!!!    TEMP     !!!!! */}
            <FontAwesomeIcon icon={faEye} style={{cursor: 'pointer'}} onClick={() => showPreview(file.name)} />

       </td>
      <td>
        {
          file.save ?
            '저장 완료'
          :
            '저장 안 됨'
        }
       </td>
    </tr>
  ))

  return (
    <tbody>
      {Onefile}
    </tbody>
  )  
}

export default Filelist