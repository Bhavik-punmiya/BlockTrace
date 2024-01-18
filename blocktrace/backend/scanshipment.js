const fs = require('fs');
const QRCode = require('qrcode');

// Replace 'your_parcel_string' with the actual parcel string
const parcelString = 'your_parcel_string';

// Generate QR code
QRCode.toFile('parcel_qr_code.png', parcelString, function (err) {
  if (err) throw err;
  console.log('QR code generated successfully');
});
