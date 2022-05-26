import React from 'react'
import Preview from './Preview'

function Uploadlist(props) {
  return (
    <div>
      <h3>올린파일</h3>
      <Preview fileurl={props.fileurl} fileinfo={props.fileinfo} deletefile={props.deletefile} />
    </div>
  )
}

export default Uploadlist