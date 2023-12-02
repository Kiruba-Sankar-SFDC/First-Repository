import { LightningElement, api, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import { getRecord } from 'lightning/uiRecordApi';

export default class LightningDataService extends LightningElement {
    @track fields = { Name: NAME_FIELD, Amount: REVENUE_FIELD, Rating: RATING_FIELD };
    @api recordId;
    @api objectApiName;
    
    submitHandler(event) {
        console.log("Inside onsubmit");
        console.log(event.data);
        event.preventDefault();
        if (event.data) {
            this.template.querySelector('lightning-record-edit-form').submit(fields);
        }
    }
}