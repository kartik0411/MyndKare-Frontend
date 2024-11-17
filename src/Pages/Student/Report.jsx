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
import { TableWithoutPagination } from '../../components/Table'
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

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

const tableOptions = {
  height: "auto",
  width: "100%",
  checkboxSelection: false,
  disableSelectionOnClick: true,
};

const columns = [
  {
    field: "code",
    headerName: "Code",
    flex: 1
  },
  {
    field: "name",
    headerName: "Exam Name",
    flex: 2
  },
  {
    field: "detail",
    headerName: "Detail",
    flex: 5
  },
  {
    field: "score",
    headerName: "Score",
    flex: 1
  },
]




// Create Document Component
function Report(props) {
  const { onClose, selectedValue, open } = props;
  const [report, setReport] = useState({});
  const [showDialogActions, setDialogActions] = useState(true);
  const [divref,setDivRef] = useState();
  // const [paddingTest, setPaddingTest] = useState(100);

  const handleClose = () => {
    setDivRef(null)
    // setPaddingTest(100);
    onClose(selectedValue);
  };

  useEffect(() => {
    if (open == true) {
      getStudentTestReport();
    }
  }, [open]);

  // useEffect(() => {
  //   if (divref!=null) {
  //     if(divref.offsetHeight) {
  //       console.log(divref);
  //       console.log(JSON.stringify(paddingTest));
  //       console.log(JSON.stringify(divref.offsetHeight));
  //       setPaddingTest(paddingTest+divref.offsetHeight-2000);
  //     }
  //   }
  // }, [divref]);

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


  const chartSetting = {
    yAxis: [
      {
        label: '',
        min: 0,
        max: 10,
      },
    ],
    width: 750,
    height: 500,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };




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
                  <div className="absolute left-1/2 transform -translate-x-1/2" style={{ marginTop: 280 }} >
                    <Text style={{ fontSize: 16, color: '#000000', lineHeight: 100, textDecorationLine: 'underline' }}> STUDENT INFORMATION
                    </Text>
                  </div>
                  <div className="absolute left" style={{ marginTop: 330 }} >
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100 }}>
                      Student Name:
                    </Text>
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100, fontWeight: '300', marginLeft: 5 }}>
                      {selectedValue?.name}
                    </Text>
                  </div>
                  <div className="absolute" style={{ left: '67%', marginTop: 330 }} >
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100 }}>
                      Admission Number:
                    </Text>
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100, fontWeight: '300', marginLeft: 5 }}>
                      {selectedValue?.admsnno}
                    </Text>
                  </div>
                  <div className="absolute left" style={{ marginTop: 380 }} >
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100 }}>
                      School:
                    </Text>
                    <Text style={{ fontSize: 15, color: '#000000', lineHeight: 100, fontWeight: '300', marginLeft: 5 }}>
                      {selectedValue?.school}
                    </Text>
                  </div>
                  <div className="absolute" style={{ left: '67%', marginTop: 380 }} >
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
                gap: 50,
                marginTop: 150
              }}>
                <a className="relative flex flex-col items-center w-full">
                  <hr style={{ width: '100%', border: '1px solid #000' }} />
                  {report?.map(testReport => (
                    <><div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 20,
                      width: '100%',
                    }}>
                      {testReport.type == 1 && <>
                        <div style={{ textAlign: 'center' }}>
                          <Text style={{ fontSize: 20, color: '#000000', textDecorationLine: 'underline' }}> {testReport.name} (Personality Test)
                          </Text>
                        </div>
                        <div style={{
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}>
                          {testReport?.examsResults.map(exam=>(
                          <><Text style={{ fontSize: 16, color: '#000000', textDecorationLine: 'underline' }}>{exam?.name} Personality Type:
                            </Text>
                            <p style={{ fontSize: 14, color: '#000000' }}> {exam.output}
                            </p>
                          </>
                          ))}
                        </div>
                      </>}
                      {testReport.type == 2 && <>
                        <div style={{ textAlign: 'center' }}>
                          <Text style={{ fontSize: 20, color: '#000000', textDecorationLine: 'underline' }}> {testReport.name} (Aptitude Test)
                          </Text>
                        </div>
                        <TableWithoutPagination
                          height={tableOptions.height}
                          width={tableOptions.width}
                          rows={testReport.dbdaResults}
                          columns={columns}
                          checkboxSelection={tableOptions.checkboxSelection}
                          disableSelectionOnClick={tableOptions.disableSelectionOnClick} />
                        <div style={{ textAlign: 'center' }}>
                          <Text style={{ fontSize: 16, color: '#000000', textDecorationLine: 'underline' }}> APTITUDE PROFILE
                          </Text>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <BarChart dataset={testReport.dbdaResults}
                            xAxis={[{ scaleType: 'band', dataKey: 'code', label: 'ABILITIES' }]}
                            series={[
                              { dataKey: 'score', label: testReport.name + ' Scores' },
                            ]}
                            {...chartSetting} />
                        </div>
                        <div style={{
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}>
                          <Text style={{ fontSize: 16, color: '#000000', textDecorationLine: 'underline' }}> Areas of Proficiency:
                          </Text>
                          {testReport?.proficiency?.map(prof => (
                            <p style={{ fontSize: 14, color: '#000000' }}> {'\u2022'}{prof}
                            </p>
                          ))}
                        </div>
                        <div style={{
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}>
                          <Text style={{ fontSize: 16, color: '#000000', textDecorationLine: 'underline' }}> Areas of Strength:
                          </Text>
                          {testReport?.strength?.map(prof => (
                            <p style={{ fontSize: 14, color: '#000000' }}> {'\u2022'}{prof}
                            </p>
                          ))}
                        </div>
                        <div style={{
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}>
                          <Text style={{ fontSize: 16, color: '#000000', textDecorationLine: 'underline' }}> Areas of Improvement:
                          </Text>
                          {testReport?.improvement?.map(prof => (
                            <p style={{ fontSize: 14, color: '#000000' }}> {'\u2022'}{prof}
                            </p>
                          ))}
                        </div>


                      </>}
                      {testReport.type == 3 && <>
                        <div style={{ textAlign: 'center' }}>
                          <Text style={{ fontSize: 20, color: '#000000',  textDecorationLine: 'underline' }}> {testReport.name} (Interest Test)
                          </Text>
                        </div>
                      </>}
                      {testReport.type == 4 && <>
                        <div style={{ textAlign: 'center' }}>
                          <Text style={{ fontSize: 20, color: '#000000',  textDecorationLine: 'underline' }}> Counsellor Feedback
                          </Text>
                        </div>
                        <div style={{
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                        }}>
                          <><Text style={{ fontSize: 15, color: '#000000',fontWeight: "bold" }}>Academic:
                            </Text>
                            <p style={{ fontSize: 14, color: '#000000' }}>{testReport?.feedback?.feedbacks[0]}
                            </p>
                            <Text style={{ fontSize: 15, color: '#000000',fontWeight: "bold" }}>Personal Interaction Child:
                            </Text>
                            <p style={{ fontSize: 14, color: '#000000' }}>{testReport?.feedback?.feedbacks[1]}
                            </p>
                            <Text style={{ fontSize: 15, color: '#000000',fontWeight: "bold" }}>Personal Interactions Parents:
                            </Text>
                            <p style={{ fontSize: 14, color: '#000000' }}>{testReport?.feedback?.feedbacks[2]}
                            </p>
                            <Text style={{ fontSize: 15, color: '#000000',fontWeight: "bold" }}>Suggested Career or Stream Option-1:
                            </Text>
                            <p style={{ fontSize: 14, color: '#000000' }}>{testReport?.feedback?.feedbacks[3]}
                            </p>
                            <Text style={{ fontSize: 15, color: '#000000',fontWeight: "bold" }}>Suggested Career or Stream Option-2:
                            </Text>
                            <p style={{ fontSize: 14, color: '#000000' }}>{testReport?.feedback?.feedbacks[4]}
                            </p>
                            <Text style={{ fontSize: 15, color: '#000000',fontWeight: "bold" }}>Counsellor Remarks:
                            </Text>
                            <p style={{ fontSize: 14, color: '#000000' }}>{testReport?.feedback?.feedbacks[5]}
                            </p>
                            <wbr></wbr>
                            <Text style={{ fontSize: 14, color: '#000000' }}> Regards,
                            </Text>
                            <Text style={{ fontSize: 14, color: '#000000' }}> For & on behalf of
                            </Text>
                            <Text style={{ fontSize: 14, color: '#000000' }}> MyndKare
                            </Text>
                            <wbr></wbr>
                            <wbr></wbr>
                            <p style={{ fontSize: 14, color: '#000000',fontWeight: "bold"  }}>{testReport?.feedback?.feedbacks[6]}
                            </p>
                            <Text style={{ fontSize: 14, color: '#000000' }}>Clinical Psychologist
                            </Text>

                          </>
                        </div>
                      </>}
                    </div>
                      <hr style={{ width: '100%', border: '1px solid #000' }} /></>
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