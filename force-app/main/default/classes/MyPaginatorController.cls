/**
 * Created by Bogdan on 08.10.2020.
 */

public with sharing class MyPaginatorController {
    @AuraEnabled(Cacheable = true)
    public static List<Contact> getContactList(Integer pageNumber, Integer pageSize) {
        return [SELECT Id, Name, Title, Phone, Email FROM Contact LIMIT :pageSize OFFSET :(pageSize * (pageNumber - 1))];
    }

    @AuraEnabled(Cacheable = true)
    public static Integer countContacts(){
        return [SELECT COUNT() FROM Contact];
    }


}