import apiConfig from "../../config/apiConfig";
import { toastType } from "../../constants";
import { addToast } from "./toastAction";
import { setLoading } from "./loadingAction";

export const totalSaleReportExcel =
    (
        dates,
        setIsWarehouseValue,
        filter = {},
        isLoading = true,
        user_id,
        closed_at,
        opened_at
    ) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        await apiConfig
            .get(
                `total-sale-report-excel?start_date=${
                    dates.start_date ? dates.start_date : null
                }&end_date=${dates.end_date ? dates.end_date : null}&user_id=${
                    user_id ? user_id : null
                }&closed_at=${closed_at ? closed_at : null}&opened_at=${
                    opened_at ? opened_at : null
                }`
            )
            .then((response) => {
                window.open(response.data.data.total_sale_excel_url, "_blank");
                setIsWarehouseValue(false);
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };
