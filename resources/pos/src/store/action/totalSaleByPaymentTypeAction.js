import apiConfig from '../../config/apiConfig';
import { apiBaseURL, toastType, totalSaleByPaymentTypeActionType } from '../../constants';
import { addToast } from './toastAction';
import { setLoading } from "./loadingAction";

export const totalSaleByPaymentType = () => async (dispatch) => {
    dispatch(setLoading(true));

    apiConfig.get(apiBaseURL.TOTAL_SALE_BY_PAYMENT_TYPE)
        .then((response) => {
            dispatch({ type: totalSaleByPaymentTypeActionType.TOTAL_SALE_BY_PAYMENT_TYPE, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast(
                { text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
}
