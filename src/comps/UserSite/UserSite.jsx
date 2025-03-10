import { useState } from 'react'

import './usersite.scss'

// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
// https://stackoverflow.com/questions/62069150/modifying-of-css-by-document-stylesheets

export default function UserSite() {

  return (


    <div id="site">
    
      <style id="inlinestylesheet">
      {`
        #site{
          border: solid 1px green;
        }

      `}
      </style>

      <div id="content-main">
        <h2 contentEditable="true">Fiiiish</h2>
      </div>

    </div>


  )
}


