import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Download from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});




// Create Document Component
function Report(props) {
  const { onClose, selectedValue, open } = props;
  const [report, setReport] = useState({});
  const [showDialogActions, setDialogActions] = useState(true);
  const [divref,setDivRef] = useState();
  const [paddingTest, setPaddingTest] = useState(100);

  const handleClose = () => {
    setDivRef(null)
    setPaddingTest(100);
    onClose(selectedValue);
  };

  useEffect(() => {
    if (open == true) {
      getStudentTestReport();
    }
  }, [open]);

  useEffect(() => {
    if (divref!=null) {
      if(divref.offsetHeight) {
        console.log(divref);
        console.log(JSON.stringify(paddingTest));
        console.log(JSON.stringify(divref.offsetHeight));
        setPaddingTest(paddingTest+divref.offsetHeight-2000);
      }
    }
  }, [divref]);

  const getStudentTestReport = async () => {
    if (selectedValue && selectedValue._id) {
      let reportvalue;
      if(selectedValue.testid && selectedValue.testid!="") {
        reportvalue = await axios.get("/report/" + selectedValue._id + "/" + selectedValue.testid)
      } else {
        reportvalue = await axios.get("/report/" + selectedValue._id)
      }
      setReport(reportvalue.data);
    }
  }
  function getTestTypeDesc(type) {
    if (type == 1) {
      return "Personality";
    } else if (type == 2) {
      return "Aptitude";
    } else {
      return "Interest";
    }
  }

  const handleDownload = async () => {
    // const fileName = selectedValue?.name + '_Report.pdf';
    // const blob = await pdf(
    //   <Document>
    //     <Page size="A4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    //       <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
    //         <Image
    //           src="https://www.myndkare.com/wp-content/uploads/2021/05/cropped-myndkare-logo-115x57.png"
    //           style={{ height: 64, marginRight: 10 }} // Adjusted to match the height in the original code
    //         />
    //         <View>
    //           <Text>MYNDKARE</Text>
    //         </View>
    //       </View>
    //     </Page>
    //     <Page size="A4" style={styles.page}>
    //       <View style={styles.section}>
    //         <Text>Section #1</Text>
    //       </View>
    //       <View style={styles.section}>
    //         <Text>Section #2</Text>
    //       </View>
    //     </Page>
    //   </Document>
    // ).toBlob();

    // saveAs(blob, fileName);
    setDialogActions(false);
    // window.print();
  };

  useEffect(() => {
    if (showDialogActions == false) {
      window.print();
      setTimeout(() => {
        console.log('Executed after 1 second');
      }, 1000);
      setDialogActions(true);
    }
  }, [showDialogActions]);







  return (
    <>
      {selectedValue?.name && report && report.length > 0 &&
        <><Dialog fullWidth maxHeight="80vh" PaperProps={{
          style: { minHeight: '80vh' } // Set minHeight here
        }} maxWidth="md" onClose={handleClose} open={open}>
          {showDialogActions && (<DialogTitle>Test Report</DialogTitle>)}
          <DialogContent>
            <Document>
              <Page size={[600, 11000]} style={{
                display: 'flex',
                justifyContent: 'center',
              }}>
                <a className="relative flex items-center w-full" >
                  <div style={{ marginTop: 20 }}>
                    <img
                      src="https://www.myndkare.com/wp-content/uploads/2021/05/cropped-myndkare-logo-115x57.png"
                      className="h-16 mr-3"
                      alt="Myndkare Logo"
                      style={{ height: 75, width: 150 }}
                    />
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2" style={{ marginTop: 0 }}>
                    <Text style={{ fontSize: 60, color: '#1adb4e', fontWeight: "bold" }}>MYNDKARE
                    </Text>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2" style={{ marginTop: 65 }} >
                    <Text style={{ fontSize: 17, color: '#000000', lineHeight: 50 }}>Career Testing and Counselling Services
                    </Text>
                  </div>
                  {selectedValue.testid == null && (
                    <div className="absolute left-1/2 transform -translate-x-1/2" style={{ marginTop: 100 }} >
                      <Text style={{ fontSize: 12, color: '#000000', lineHeight: 50 }}>Certification no: {selectedValue._id}
                      </Text>
                    </div>
                  )}
                  <div className="absolute left-1/2 transform -translate-x-1/2" style={{ marginTop: 160 }} >
                    <Text style={{ fontSize: 21, color: '#000000', lineHeight: 50, textDecorationLine: 'underline', fontWeight: 'bold' }}>CAREER TESTING AND GUIDANCE REPORT
                    </Text>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2" style={{ marginTop: 250 }} >
                    <Text style={{ fontSize: 16, color: '#000000', lineHeight: 100, textDecorationLine: 'underline' }}> STUDENT INFORMATION
                    </Text>
                  </div>
                  <div className="absolute left" style={{ marginTop: 300 }} >
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100 }}>
                      Student Name:
                    </Text>
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100, fontWeight: '300', marginLeft: 5 }}>
                      {selectedValue?.name} 
                    </Text>
                  </div>
                  <div className="absolute" style={{ left: '67%', marginTop: 300 }} >
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100 }}>
                      Admission Number:
                    </Text>
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100, fontWeight: '300', marginLeft: 5 }}>
                      {selectedValue?.admsnno}
                    </Text>
                  </div>
                  <div className="absolute left" style={{ marginTop: 350 }} >
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100 }}>
                      School:
                    </Text>
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100, fontWeight: '300', marginLeft: 5 }}>
                      {selectedValue?.school}
                    </Text>
                  </div>
                  <div className="absolute" style={{ left: '67%', marginTop: 350 }} >
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100 }}>
                      Class:
                    </Text>
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100, fontWeight: '300', marginLeft: 5 }}>
                      {(selectedValue?.section && selectedValue?.section != "") ? (selectedValue?.class + " - " + selectedValue?.section) : (selectedValue?.class)}
                    </Text>
                  </div>
                  {/* Horizontal Line */}
                  {/* <hr style={{ width: '100%', border: '1px solid #000', marginTop: 350 }} /> */}
                </a>


              </Page>
              <Page size={[600, 11000]} style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 100
              }}>
                <a className="relative flex items-center w-full" style={{ marginTop: 140 }}>
                  <hr style={{ width: '100%', border: '1px solid #000' }} />
                  {report?.map(testReport => (
                    <>
                      {testReport.type == 1 && <>
                        <div className="absolute left-1/2 transform -translate-x-1/2" ref={el=>setDivRef(el.height)} style={{  paddingTop: paddingTest }} >
                          <Text style={{ fontSize: 19, color: '#000000', lineHeight: 100, textDecorationLine: 'underline' }}> {testReport.name} (Personality Test)
                          </Text>
                        </div>
                      </>}
                      {testReport.type == 2 && <>
                        <div className="absolute left-1/2 transform -translate-x-1/2"  ref={el=>{setPaddingTest(paddingTest+el?.offsetHeight-2000); console.log(paddingTest)}} style={{  paddingTop: paddingTest }}>
                          <Text style={{ fontSize: 19, color: '#000000', lineHeight: 100, textDecorationLine: 'underline' }}> {testReport.name} (Aptitude Test)
                          </Text>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2" ref={el=>setPaddingTest(paddingTest+el?.offsetHeight-2000)} style={{  paddingTop: paddingTest }} >
                          <Text style={{ fontSize: 19, color: '#000000', lineHeight: 100, textDecorationLine: 'underline' }}> {testReport.name} (Interest Test)
                          </Text>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2" ref={el=>setPaddingTest(paddingTest+el?.offsetHeight-2000)} style={{  paddingTop: paddingTest }} >
                          <Text style={{ fontSize: 19, color: '#000000', lineHeight: 100, textDecorationLine: 'underline' }}> {testReport.name} (Interest Test)
                          </Text>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2" ref={el=>setPaddingTest(paddingTest+el?.offsetHeight-2000)} style={{  paddingTop: paddingTest }} >
                          <Text style={{ fontSize: 19, color: '#000000', lineHeight: 100, textDecorationLine: 'underline' }}> {testReport.name} (Interest Test)
                          </Text>
                        </div>
                      </>}
                      {testReport.type == 3 && <>
                        <div className="absolute left-1/2 transform -translate-x-1/2" ref={el=>setDivRef(el)} style={{  paddingTop: paddingTest }} >
                          <Text style={{ fontSize: 19, color: '#000000', lineHeight: 100, textDecorationLine: 'underline' }}> {testReport.name} (Interest Test)
                          </Text>
                        </div>
                      </>}
                      {testReport.type == 4 && <>
                        <div className="absolute left-1/2 transform -translate-x-1/2" ref={el=>setDivRef(el)} style={{  paddingTop: paddingTest }} >
                          <Text style={{ fontSize: 19, color: '#000000', lineHeight: 100, textDecorationLine: 'underline' }}> Counseller Feedback
                          </Text>
                        </div>
                      </>}
                    </>
                  ))}
                </a>
              </Page>
            </Document>

          </DialogContent>
          {showDialogActions && (
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button size="small" variant="contained" style={{
                backgroundColor: "#8F00FF"
              }} startIcon={<Download />} onClick={handleDownload} >Download</Button>
            </DialogActions>
          )}
        </Dialog></>


      }
    </>
  );

}

export default Report