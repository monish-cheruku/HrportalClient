import React, { useEffect } from 'react'

function Annexure(props) {
    const data = props.annexure
    useEffect(() => {
        console.log(data)
    })
    return (
        <div>
            <table style={{ borderCollapse: "collapse",border: "1px solid #dddddd" ,width:"100%"}}>
                <tr>
                    <td style={{ border: "1px solid #dddddd" }}>NAME   </td>

                    <td style={{ border: "1px solid #dddddd",textAlign:"center"  }} colSpan={2}>{data.varName}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #dddddd" }}>Band   </td>

                    <td style={{ border: "1px solid #dddddd",textAlign:"center" }} colSpan={2}>{data.varBand}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #dddddd" }}>Sub Band   </td>

                    <td style={{ border: "1px solid #dddddd",textAlign:"center" }} colSpan={2}>{data.varSubBand}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #dddddd" }}>Designation   </td>

                    <td style={{ border: "1px solid #dddddd",textAlign:"center" }} colSpan={2}>{data.varDesignation}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid #dddddd" }}>Location   </td>

                    <td style={{ border: "1px solid #dddddd",textAlign:"center" }} colSpan={2}>{data.varLocation}</td>
                </tr>
              
                {!data.iSVariablePay ? <>
                    <tr>
                    <td style={{backgroundColor:"skyblue"}}>Total Gross Salary	:</td>
                    
                    <td  colSpan={2}  style={{backgroundColor:"skyblue",textAlign:"center"}}>{data.varTotalACTC}</td>
                </tr>
                    <tr >
                        <tr style={{ border: "1px solid #dddddd",fontWeight:"600",display:"flex",borderCollapse: "collapse",backgroundColor:"skyblue" }}>Components</tr>
                        <th style={{ border: "1px solid #dddddd" }}>Per Month</th>
                        <th style={{ border: "1px solid #dddddd" }}>Per Annum</th>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd",backgroundColor:"skyblue" }}>Basic</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varMBasic}</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varABasic}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd" ,backgroundColor:"skyblue"}}>HRA</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varMHRA}</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varAHRA}</td>
                   
                        
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd",backgroundColor:"skyblue" }}>Employer Provident Fund	</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varMPF}</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varAPF}</td>
                    </tr>


                    {
                        data.iSBonus == true ? <>
                            <tr>
                                <td style={{ border: "1px solid #dddddd",backgroundColor:"skyblue" }}>Statutory Bonus</td>
                                <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varMBonus}</td>
                                <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varABonus}</td>
                            </tr>

                        </>
                            :
                            <></>
                    }
                    {
                        data.iSShiftAllow == true ? <>
                            <tr>
                                <td style={{ border: "1px solid #dddddd" ,backgroundColor:"skyblue"}}>Shift Allowance</td>
                                <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varMShiftAllow}</td>
                                <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varTotalFixedCTC}</td>
                            </tr>

                        </>
                            :
                            <></>
                    }
                    <tr>
                        <td style={{ border: "1px solid #dddddd",backgroundColor:"skyblue" }}>Flexible Benefit  Plan </td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varMFBP}</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varAFBP}</td>
                    </tr>



                    <tr>
                        <td  style={{ border: "1px solid #dddddd",backgroundColor:"skyblue" }}>Total  </td>
                        <td  style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varTotalMCTC}</td>
                        <td  style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varTotalACTC}</td>
                    </tr>


                    <tr>
                        <td style={{ border: "1px solid #dddddd",backgroundColor:"skyblue" }}>Total CTC</td>
                        <td style={{ border: "1px solid #dddddd" }}></td>
                        <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varTotalACTC}</td>
                    </tr>



                </> : <>
                <tr>
                        <th style={{ border: "1px solid #dddddd",backgroundColor:"skyblue" }}>Components</th>
                       
                        <th style={{ border: "1px solid #dddddd",backgroundColor:"skyblue" }} colSpan={2}></th>
                    </tr>
                <tr>
                        <tr  className="flex" style={{ border: "1px solid #dddddd",fontWeight:"600" }}>Fixed Compensation:</tr>
                        <th style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varFixedPayPerc}%</th>
                        <th style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varTotalFixedCTC}</th>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #dddddd",backgroundColor:"skyblue"  }}>A.Fixed Compensation:</th>
                        <th style={{ border: "1px solid #dddddd" }}>Per Month</th>
                        <th style={{ border: "1px solid #dddddd" }}>Per Annum</th>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd" }}>Basic</td>
                        <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varMBasic}</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varABasic}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd" }}>HRA</td>
                        <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varMHRA}</td>
                        <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varAHRA}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd" }}>Employer Provident Fund	</td>
                        <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varMPF}</td>
                        <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varAPF}</td>
                    </tr>


                    {
                        data.iSBonus == true ? <>
                            <tr>
                                <td style={{ border: "1px solid #dddddd" }}>Statutory Bonus</td>
                                <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varMBonus}</td>
                                <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varABonus}</td>
                            </tr>

                        </>
                            :
                            <></>
                    }
                    {
                        data.iSShiftAllow == true ? <>
                            <tr>
                                <td style={{ border: "1px solid #dddddd" }}>Shift Allowance</td>
                                <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varMShiftAllow}</td>
                                <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varTotalFixedCTC}</td>
                            </tr>

                        </>
                            :
                            <></>
                    }
                    <tr>
                        <td style={{ border: "1px solid #dddddd" }}>Flexible Benefit  Plan </td>
                        <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varMFBP}</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varAFBP}</td>
                    </tr>



                    <tr>
                        <td style={{ border: "1px solid #dddddd" ,textAlign:"center",backgroundColor:"skyblue" ,fontWeight:"700"}}>Total (A) </td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varTotalMCTC}</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varTotalFixedCTC}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center",backgroundColor:"skyblue",fontWeight:"700"  }}>B. Variable Compensation </td>
                        <td style={{ border: "1px solid #dddddd" }}>Per annum</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd" }}>Individual Performance Linked Pay</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varVariablePayPerc}%</td>
                        <td style={{ border: "1px solid #dddddd" ,textAlign:"center"}}>{data.varVariablePay}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #dddddd" ,textAlign:"center",backgroundColor:"skyblue",fontWeight:"700" }}>Total (B) </td>
                        <td style={{ border: "1px solid #dddddd" }}>{}</td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varVariablePay}</td>
                    </tr>


                    <tr>
                        <td style={{ border: "1px solid #dddddd" ,backgroundColor:"skyblue",fontWeight:"700" }}>Total Cash Compensation (A+B) (TCC)</td>
                        <td style={{ border: "1px solid #dddddd" }}></td>
                        <td style={{ border: "1px solid #dddddd",textAlign:"center" }}>{data.varTotalACTC}</td>
                    </tr>

                </>}
            </table>



        </div>
    )
}

export default Annexure

const mystyle = {

}