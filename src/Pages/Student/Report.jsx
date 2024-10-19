import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Download from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';

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

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleDownload = async () => {
    // onClose(selectedValue);
    const fileName = selectedValue?.name + '_Report.pdf';
    const blob = await pdf(<Document>
      <Page size="A4" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <a href="#" className="flex items-center">
          <img
            src="https://www.myndkare.com/wp-content/uploads/2021/05/cropped-myndkare-logo-115x57.png"
            className="h-16 mr-3"
            alt="Myndkare Logo"
          />
          <Text style={{ textAlign: "center", lineHeight: '64px' }}>MYNDKARE</Text> {/* Adjust lineHeight as needed */}
        </a>
      </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>).toBlob();
    saveAs(blob, fileName);
  };
  


  return (<>
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Test Report</DialogTitle>
      <DialogContent>
        <Document>
          <Page size="A4" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <a href="#" className="flex items-center">
              <img
                src="https://www.myndkare.com/wp-content/uploads/2021/05/cropped-myndkare-logo-115x57.png"
                className="h-16 mr-3"
                alt="Myndkare Logo"
              />
              <Text style={{ textAlign: "center", lineHeight: '64px' }}>MYNDKARE</Text> {/* Adjust lineHeight as needed */}
            </a>
          </Page>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Section #1</Text>
              </View>
              <View style={styles.section}>
                <Text>Section #2</Text>
              </View>
            </Page>
          </Document>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button size="small" variant="contained" style={{
            backgroundColor: "#8F00FF"
          }} startIcon={<Download />} onClick={handleDownload} >Download</Button>
        </DialogActions>
      </Dialog>

    </>
    );

  }

  export default Report