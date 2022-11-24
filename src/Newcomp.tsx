import React, { useEffect } from 'react'

function Newcomp() {
  useEffect(()=>{
    console.log("rendering")
  })
  return (
    <div>


        new component image
        {/* <img src="./dashboard/jobpostsactionApproval/assets/images/arya-blue.png"/> */}
        <img src="assets/layout/images/themes/md-dark-deeppurple.svg"/>
    </div>
  )
}

export default Newcomp