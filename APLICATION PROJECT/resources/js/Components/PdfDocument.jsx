import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const logo = '/mnt/data/image.png'; // Use the correct path to the logo

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%', // Make the table width 100%
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '12.5%', // Adjust the width of each column header
    padding: 8,
    backgroundColor: '#f3f3f3',
    fontWeight: 'bold',
    border: '1px solid #e0e0e0',
    fontSize: 10,
  },
  tableCol: {
    width: '12.5%', // Adjust the width of each column
    padding: 8,
    border: '1px solid #e0e0e0',
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 12,
    color: 'grey',
  },
});

const PdfDocument = ({ laporans }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.header}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.title}>Laporan Inventory</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>ID</Text>
          <Text style={styles.tableColHeader}>Kode Barang</Text>
          <Text style={styles.tableColHeader}>Nama Barang</Text>
          <Text style={styles.tableColHeader}>Divisi</Text>
          <Text style={styles.tableColHeader}>Quantity</Text>
          <Text style={styles.tableColHeader}>User</Text>
          <Text style={styles.tableColHeader}>Action</Text>
          <Text style={styles.tableColHeader}>Tanggal</Text>
        </View>
        {laporans.map((laporan) => (
          <View style={styles.tableRow} key={laporan.id}>
            <Text style={styles.tableCol}>{laporan.id}</Text>
            <Text style={styles.tableCol}>{laporan.inventory.kode_barang}</Text>
            <Text style={styles.tableCol}>{laporan.inventory.name}</Text>
            <Text style={styles.tableCol}>{laporan.inventory.divisiinv.divisi}</Text>
            <Text style={styles.tableCol}>{laporan.quantity}</Text>
            <Text style={styles.tableCol}>{laporan.user.name}</Text>
            <Text style={styles.tableCol}>{laporan.action}</Text>
            <Text style={styles.tableCol}>{new Date(laporan.created_at).toLocaleDateString()}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);

export default PdfDocument;
