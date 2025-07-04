import { totalSaleByPaymentTypeActionType } from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case totalSaleByPaymentTypeActionType.TOTAL_SALE_BY_PAYMENT_TYPE:
            return action.payload;
        default:
            return state;
    }
};
