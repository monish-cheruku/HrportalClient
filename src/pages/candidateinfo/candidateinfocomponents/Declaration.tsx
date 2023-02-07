import { Button } from 'primereact/button'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { acceptofferletteraction, getcandidateinfoclearanceaction } from '../../../features/Candidate info/candidateinfoslice'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { companySlice } from '../../../features/Company/companyslice'
function Declaration() {
    const dispatch = useDispatch()
    const [declared, setdeclared] = useState(false)
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
    const clearancedata = useSelector((state: RootState) => state.candidateinfo.clearance)
    const msgs1 = useRef([]);
    useEffect(() => {
        dispatch(getcandidateinfoclearanceaction({
            "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

        }))
        console.log(clearancedata)
        console.log(msgs1)
    }, [])
    useEffect(() => {
        var arr: any = []
        clearancedata ? clearancedata.messages.map((i) => {
            console.log(i.toString())
            arr.push(

                { severity: 'info', summary: '', detail: i.toString(), sticky: true, closable: false },

            )
        }) : console.log("")
        console.log(msgs1)

        msgs1.current.clear()
        msgs1.current.show(arr)
    }, [candidateinfodata])
    const acceptoffer = () => {
        dispatch(acceptofferletteraction({
            "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

        }))
    }
    const shouldbuttondisabled = () => {
        if (declared && clearancedata.validation)
            return false
        return true
    }
    return (
        <div>
            <br>
            </br>
            <br>
            </br>
            <Messages ref={msgs1} />

            <br>
            </br>
            <br>
            </br>
            <input type="checkbox" id="declare" onClick={e => setdeclared(!declared)}>
            </input>
            <label htmlFor ="declare">

                I do hereby declare that the information furnished as above by me is true and correct to be the best
                of my knowledge and belief. If any information furnished by me is proved to be incorrect or false,
                management may take appropriate action against me including termination of service

            </label>


            <div style={{ height: "140px" }}>


            </div>
           
            <div className="p-fluid  grid">

                <div className="field col-12 md:col-4 flex">
                </div>
                <div className="field col-12 md:col-4 flex">
                </div>

                <div className="field col-12 md:col-4 flex gap-4">
                    <Button className='mr-4' onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
                    <Button disabled={shouldbuttondisabled()} onClick={e => acceptoffer()}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default Declaration