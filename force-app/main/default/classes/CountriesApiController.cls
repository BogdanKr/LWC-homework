/**
 * Created by Bogdan on 04.10.2020.
 */

public with sharing class CountriesApiController {
    static CountriesApiEndpoint__mdt metaEndpoint =
    [SELECT Endpoint__c FROM CountriesApiEndpoint__mdt WHERE Label = 'SearchByCountriesAPI'];

    @AuraEnabled(Cacheable=true)
    public static List<Country> getCountriesBySearchType(String searchKey, String searchType) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(metaEndpoint.Endpoint__c + searchType + '/' + searchKey);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        try {
            List<Country> countries = (List<Country>) JSON.deserialize(response.getBody(), List<Country>.class);
            for (Country c : countries) {
                c.currencyCode = '';
                for (CountryCurrency cc : c.currencies) {
                    c.currencyCode += ' ' + cc.code ;
                }
            }
            System.debug(countries);
            return countries;
        } catch (Exception e) {
            throw new AuraHandledException('Wrong input ' + e.getMessage());
        }
    }

    public class Country {
        @AuraEnabled
        public String name { get; set; }
        @AuraEnabled
        public String capital { get; set; }
        @AuraEnabled
        public Integer population { get; set; }
        @AuraEnabled
        public String currencyCode;
        public CountryCurrency[] currencies { get; set; }
        @AuraEnabled
        public String subregion { get; set; }
        @AuraEnabled
        public String flag { get; set; }

    }

    public class CountryCurrency {
        public String code;
        public String name;
        public String symbol;
    }

}