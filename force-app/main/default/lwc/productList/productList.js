// productDisplay.js
import { LightningElement, track, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import PRODUCT_SCAN_CHANNEL from '@salesforce/messageChannel/ProductScanChannel__c';

export default class ProductDisplay extends LightningElement {
    @track scannedItems = [];
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(this.messageContext, PRODUCT_SCAN_CHANNEL, (message) => {
            this.handleScannedBarcode(message.barcode);
        });
    }

    handleScannedBarcode(barcode) {
        const scannedItem = this.scannedItems.find(item => item.barcode === barcode);
        if (scannedItem) {
            scannedItem.count++;
        } else {
            this.scannedItems.push({ barcode: barcode, count: 1 });
        }
    }
}
