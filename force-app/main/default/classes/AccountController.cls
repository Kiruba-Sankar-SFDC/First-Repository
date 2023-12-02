public class AccountController 
{
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(String Rating)
    {
        return [Select Id, Name, Industry, Rating From Account Where Rating=:Rating];
    }    

    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(string AccountId){
        try {
            return [Select Id, Full_Name__c	 From Contact Where AccountId =:AccountId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}