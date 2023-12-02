import { LightningElement, track, wire } from 'lwc';
import { getBarcodeScanner } from 'lightning/mobileCapabilities';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { publish, MessageContext } from 'lightning/messageService';
import PRODUCT_SCAN_CHANNEL from '@salesforce/messageChannel/ProductScanChannel__c';

export default class BarcodeScannerDemo extends LightningElement {
    @track scannedItems = [];
    @wire(MessageContext)
    messageContext;
    myScanner;

    connectedCallback() {
        this.myScanner = getBarcodeScanner();
    }

    handleBarcodeClick(event) {
        if (this.myScanner.isAvailable()) {
            const scanningOptions = {
                barcodeTypes: [
                    this.myScanner.barcodeTypes.QR,
                    this.myScanner.barcodeTypes.UPC_E,
                    this.myScanner.barcodeTypes.EAN_13,
                    this.myScanner.barcodeTypes.CODE_39
                ],
                instructionText: 'Scan a QR, UPC, EAN 13, Code 39',
                successText: 'Scanning complete.'
            };

            this.myScanner.beginCapture(scanningOptions)
                .then((result) => {
                    this.handleScannedBarcode(result.value);
                })
                .catch((error) => {
                    this.showError('Error', error);
                })
                .finally(() => {
                    this.myScanner.endCapture();
                });
        } else {
            this.showError('Error', 'Scanner not supported on this device');
        }
    }

    handleScannedBarcode(barcode) {
        const scannedItem = this.scannedItems.find(item => item.barcode === barcode);
        if (scannedItem) {
            scannedItem.count++;
        } else {
            this.scannedItems.push({ barcode: barcode, count: 1 });
        }
        const payload = { barcode: scannedItem };
        publish(this.messageContext, PRODUCT_SCAN_CHANNEL, payload);

        this.showSuccess('Success', `Scanned Barcode: ${barcode}`);
    }

    showError(title, msg) {
        const event = new ShowToastEvent({
            title: title,
            message: msg,
            variant: 'error'
        });
        this.dispatchEvent(event);
    }

    showSuccess(title, msg) {
        const event = new ShowToastEvent({
            title: title,
            message: msg,
            variant: 'success'
        });
        this.dispatchEvent(event);
    }
}
