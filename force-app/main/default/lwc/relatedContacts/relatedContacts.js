import { LightningElement, api, wire } from 'lwc';
import getRelatedContacts from '@salesforce/apex/AccountController.getRelatedContacts'; 1
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class RelatedContacts extends LightningElement {
    @api recordId;
    accountId;
    relatedContacts;
    response;

    @wire(getRelatedContacts, { AccountId: '$recordId' })
    foundRelatedContacts(response) {
        console.log(this.recordId);
        this.response = response;
        console.log("Inside wire method")
        if (response.data) {
            console.log(response.data);
            this.relatedContacts = response.data;
        }
        if (response.error) {
            console.log(response.error);
            this.dispatchEvent(new ShowToastEvent({
                title: "Contacts Not Found",
                message: response.error.body.message,
                variant: "error"
            }));
        }
    }


    deleteContactHandler(event) {
        console.log(`This is Contact Id ${event.target.name}`);
        const contactId = event.target.name
        deleteRecord(contactId)
            .then(data => {
                this.dispatchEvent(new ShowToastEvent({
                    title: "Deleted",
                    message: "Contact Deleted Successfully",
                    variant: "success"
                }))
                //refreshApex(this.response);
            })

            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: "Contact Not Deleted",
                    message: error.body.message,
                    variant: "error"
                }));
            })
    }
}