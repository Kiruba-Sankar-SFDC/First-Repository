import { LightningElement, track } from 'lwc';
export default class DataTableComponent extends LightningElement {
    @track showDataTable = true;
    @track showRecordForm = false;
    @track selectedAccountId;
    handleAccountSelected(event) {
        this.selectedAccountId = event.detail.accountId;
        this.showDataTable = false;
        this.showRecordForm = true;
    }
}