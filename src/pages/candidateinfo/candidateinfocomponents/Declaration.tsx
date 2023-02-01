import { Button } from 'primereact/button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
function Declaration() {
    const dispatch = useDispatch()

    return (
        <div>Declaration
            <br>
            </br>
            <br>
            </br>
            <input type="checkbox">
            </input>
            <label>

                I do hereby declare that the information furnished as above by me is true and correct to be the best
                of my knowledge and belief. If any information furnished by me is proved to be incorrect or false,
                management may take appropriate action against me including termination of service

            </label>


            <div style={{ height: "140px" }}>

            </div>

            <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">

                </div>
                <div className="field col-12 md:col-4">

                </div>
                <div className="field col-12 md:col-4 flex">
                    <Button onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
                    <Button onClick={e => console.log("")}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default Declaration