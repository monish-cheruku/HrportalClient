import { call, takeEvery } from "redux-saga/effects"
import { downloadpdf, generatepdf } from "../../api/agent"

function* genpdfsagaworker(payload){
  console.log(payload)
    // console.log("pdf downloading")
    var res=yield call(generatepdf.downloadpdf,payload.payload)
    
              const byteCharacters = atob(res.toString('base64'));
              // const byteCharacters = Buffer.from(res, 'base64');
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray]);

            //   console.log(blob);
              let a = document.createElement("a");
              a.href = window.URL.createObjectURL(blob);
              a.download = "pdffile.pdf";
              // a.href=window.URL.createObjectURL(res1)
              a.click();


    console.log(res)
}
function* downloadpdfsagaworker(payload){
  console.log(payload)
    // console.log("pdf downloading")
    var res=yield call(downloadpdf.downloadpdf,payload.payload)
    
              const byteCharacters = atob(res.toString('base64'));
              // const byteCharacters = Buffer.from(res, 'base64');
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray]);

            //   console.log(blob);
              let a = document.createElement("a");
              a.href = window.URL.createObjectURL(blob);
              a.download = "pdffile.pdf";
              // a.href=window.URL.createObjectURL(res1)
              a.click();


    console.log(res)
}
export function* watcherpdfdownload(){
    yield takeEvery("pdfdownload/genpdf",genpdfsagaworker)
    yield takeEvery("pdfdownload/downloadresume",downloadpdfsagaworker)

    // yield takeEvery("Industry/createIndustryaction",createIndustrysagaworker)
    // yield takeEvery("Industry/updateIndustryaction",updateIndustrysagaworker)
   }