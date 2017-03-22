/* eslint-disable */

var response = {
  "status":200,
  "data":[{
    "productId":123,
    "companyId":234,
    "insuranceSubProductId":321,
    "territory":{
      "id":1,
      "code":"vtb-e",
      "countryGroup":["vtb-part-e","vtb-allworld","vtb-schengen","vtb-evro"]
    },
    "insuredDays":1,
    "sport":null,
    "currency":"EUR",
    "price":123,
    "priceRub":654,
    "assistances":[{
      "all":[{
        "id":4, "code":"gva","name":"Global Voyager Assistance", "phone":["000000000"]
      }]
    },{
      "italy":[{
        "id":4,"code":"gva","name":"Global Voyager Assistance","phone":null,"localPhone":["00000000"]
      }]
    }]
  }]
};

module.exports = response;
