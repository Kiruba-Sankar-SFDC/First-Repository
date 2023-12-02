import { LightningElement, wire, track } from 'lwc';
import getAccount from '@salesforce/apex/AccountController.getAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ApexDataConnectivity extends LightningElement {
    value;
    accounts;
    isAccount;

    get options() {
        return [
            { label: 'Hot', value: 'Hot' },
            { label: 'Warm', value: 'Warm' },
            { label: 'Cold', value: 'Cold' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    @wire(getAccount, { Rating: '$value' })
    returnedAccounts({ data, error }) {
        if (data) {
            this.accounts = data;
            if (this.accounts.length > 0)
                this.isAccount = true;
            else
                this.isAccount = false;
            console.log(this.accounts);
        }
        if (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message, // Display the error message sent by the Apex method
                    variant: 'error'
                })
            );
        }
    }
}
