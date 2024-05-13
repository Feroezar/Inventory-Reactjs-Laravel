// File: PDFExport.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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

const PDFExport = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>ID</Text>
        {data.map((item, index) => (
          <Text key={index}>{item.id}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text>Nomor PR</Text>
        {data.map((item, index) => (
          <Text key={index}>{item.nomor_pr}</Text>
        ))}
      </View>
      {/* Tambahkan bagian lain dari data yang ingin Anda ekspor */}
    </Page>
  </Document>
);

export default PDFExport;
