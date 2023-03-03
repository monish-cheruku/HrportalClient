import React from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { downloadresume } from '../../features/Downloadpdfs/pdfslice';
import { useDispatch } from 'react-redux';
import { documentdownloadaction } from '../../features/Candidate info/candidateinfoslice';
import { TabView, TabPanel } from 'primereact/tabview';
function CandidateDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
  const noofdaysremaining = (value) => {
    var dt = new Date(value)
    var dnow = new Date
    return (!dt.getDate() - dnow.getDate()) > 0 ? (dt.getDate() - dnow.getDate()) : "--"
  }
  return (
    <div>
      <div className="grid">
        <div className="md:col-4">
          <Card title="Date of Joining" style={{ marginBottom: '2em', color: "blue" }}><p className="m-0" style={{ lineHeight: '1.5' }}>{candidateinfodata.DateOfJoining}</p>
          </Card>
        </div>
        <div className="md:col-4">
          <Card title="Reporting Time" style={{ marginBottom: '2em', color: "blue" }}><p className="m-0" style={{ lineHeight: '1.5' }}>09:00 Am</p>
          </Card>
        </div>
        <div className="md:col-4">
          <Card title="Days Remaining" style={{ marginBottom: '2em', color: "blue" }}><p className="m-0" style={{ lineHeight: '1.5' }}>{
            noofdaysremaining(candidateinfodata.DateOfJoining)}</p>
          </Card>
        </div>
      </div>


      <div className="grid">
        <div className="md:col-4">
          <Card title="Candidate Information" onClick={e => { (candidateinfodata.VerificationStatus == "pending" && candidateinfodata.VerificationStatus != "verified") ? navigate("/candidateinfo") : console.log("") }} style={{ width: '25rem', marginBottom: '2em', }}><p className="m-0" style={{ lineHeight: '1.5' }}>edit</p>
          </Card>
        </div>
        <div className="md:col-4">
          <Card title="Update Information">
            <Link to={'/PFDetails'}><i className="pi pi-pencil"> </i> PF Detials</Link><br /><br /><Link to={'/BankDetails'}><i className="pi pi-pencil"> </i> Bank Detials</Link><br /><br /><Link to={'/candidateinsurance'}><i className="pi pi-pencil"> </i> Insurance Detials</Link>

          </Card>

        </div>
        <div className='md:col-4'>
          <Card title="Download Offer Letter"><div>
            <a style={{ cursor: "pointer" }} onClick={(e) => {

              dispatch(documentdownloadaction(
                {
                  'file': candidateinfodata.OfferLetter.toString().substring(1,candidateinfodata.OfferLetter.length)
                }
              ))
            }}  >
              {
                candidateinfodata.OfferLetter.toString().split("/")[candidateinfodata.OfferLetter.toString().split("/").length - 1]
              }  </a>
          </div>

          </Card>
        </div>
      </div>


      <div className='grid'>
        <div className='md:col-4'>
          <TabView><TabPanel header="Header I">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur.    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></TabPanel>
            <TabPanel header="Header II">  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione    voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p></TabPanel>
            <TabPanel header="Header III">  <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
              excepturi sint occaecati    cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p></TabPanel>
          </TabView>
        </div>
      </div>
    </div>

  )
}

export default CandidateDashboard