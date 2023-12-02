import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SCANNED_ITEM_CHANNEL from '@salesforce/messageChannel/ProductScanChannel__c';

export default class DesktopScannedProducts extends LightningElement {
    scannedItems = [];

    @wire(MessageContext)
    messageContext;

    subscription;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            SCANNED_ITEM_CHANNEL,
            (message) => this.handleScannedItemEvent(message)
        );
    }

    handleScannedItemEvent(message) {
        console.log(message);
        console.log("From desktop component " + message.barcode);
        const barcode = message.barcode;
        this.scannedItems.push(barcode);
    }

    disconnectedCallback() {
        // Unsubscribe from the channel when the component is disconnected
        unsubscribe(this.subscription);
    }
}
