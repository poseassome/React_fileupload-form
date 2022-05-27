import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'


function Preview(props) {
  // const filepreview = props.fileurl;
  // const filename = props.fileinfo.name.split(".")[0];


  const deletefile = (index) => {
    console.log(index)
    props.deletefile(index)
  }

  /*****  파일 미리보기용  *****/
  const imglist = props.fileinfo.map((file, idx) => (
    <li key={idx}
      style={{width: '100px', height: '130px', background: 'rgba(0,0,0,0.16)', borderRadius: '5px', padding:'10px', listStyle:'none',
      float:'left', margin:'0 5px', display:'flex', flexDirection: 'column', justifyContent: 'space-between', position:'relative'}}>
      <button style={{background:'none', border: 'none', width:'15px', height:'15px', position:'absolute', top:'-5px', padding:0, right:'-5px'}}
        onClick={() => deletefile(idx)}>
        <FontAwesomeIcon icon={faCircleXmark} style={{width:'100%', height:'100%', cursor:'pointer'}} />
      </button>

      <img src='' alt=""
        style={{width: '100%', height: '100%'}} />
      <p style={{height: '16px', margin: '5px 0 0 0'}}>{file.name.split('.')[0]}</p>
    </li>
  ))

  return (
    <div>
      <ul style={{margin: '0 auto', width:'fit-content'}}>
        {imglist}
      </ul>
    </div>
  )
}

export default Preview