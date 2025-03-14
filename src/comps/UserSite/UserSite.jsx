import { useState } from 'react'

import './usersite.scss'

// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
// https://stackoverflow.com/questions/62069150/modifying-of-css-by-document-stylesheets

export default function UserSite() {

  return (


    <div id="site">
    {/*    <div id="site" style={{ pointerEvents: 'none' }}> */}
    
      <style id="inlinestylesheet">
      {`
        
        #placeh2{}
        #content-main{
          color: black;
        }
      `}
      </style>

      <div id="content-main">
        <h2 contentEditable="true" id="placeh2">Fiiiish</h2>
      </div>

    </div>


  )
}


