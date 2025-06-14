export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
    
        deliveryOptions.forEach(option => {
          if(option.id === deliveryOptionId){
            deliveryOption = option;
          }
        });

    return deliveryOption;
}

export const deliveryOptions = [{
    id : '1',
    days: 7,
    cost: 0
},{
    id : '2',
    days: 3,
    cost: 50
},{
    id : '3',
    days: 1,
    cost: 80
}];