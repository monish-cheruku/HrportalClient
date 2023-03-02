import React from 'react'
import { Card } from 'primereact/card'

function Acknowledgementpage() {
  return (
    <div>
<style>

    {`
    .image-1{
        height:30vh;
        width: 50%;
        background-position:center;
        background-repeat: no-repeat;
        background-size: cover;
       background-attachment: fixed;
   
      background-image: url("https://images.unsplash.com/photo-1608389168343-ba8aa0cb3a63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGhhbmslMjB5b3V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")
    }
    
    
    `}
</style>
        {/* Acknowledgement */}
        <br />
        {/* <img className="image-1"> */}
{/* </img> */}
        <Card subTitle={()=>{return (<div style={{textAlign:"center"}}><h3>💼Thank you for submitting your details and response has been Recorded </h3></div>)}}>
          

        </Card>



    </div>
  )
}

export default Acknowledgementpage