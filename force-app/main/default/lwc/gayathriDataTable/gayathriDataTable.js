/* import { LightningElement, wire } from 'lwc'; import { getRecord } from 'lightning/uiRecordApi';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';


export default class AccountDataTable extends LightningElement {
    const columns = [{ label: 'ID', fieldName: 'Id', type: 'text' }, { label: 'Account Name', fieldName: 'Name', type: 'text' }, { label: 'Industry', fieldName: 'Industry', type: 'text' }, { label: 'Phone', fieldName: 'Phone', type: 'text' }]
    columns = columns; accounts; error;
    @wire(getAccountList) wiredAccounts({ data, error }) { if (data) { this.accounts = data; console.log(this.accounts) this.error = undefined; } else if (error) { this.error = error; this.accounts = undefined; } } handleRowClick(event) { const accountId = event.detail.row.Id; const accountSelectedEvent = new CustomEvent('accountselected', { detail: { accountId }, }); this.dispatchEvent(accountSelectedEvent); }
}  */