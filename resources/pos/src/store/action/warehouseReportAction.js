import apiConfig from "../../config/apiConfig";
import { apiBaseURL, toastType, warehouseActionType } from "../../constants";
import { addToast } from "./toastAction";

// export const fetchWarehouseReport = (id) => async (dispatch) => {
//     await apiConfig.get(apiBaseURL.WAREHOUSE_REPORT + '?warehouse_id=' + id)
//         .then((response) => {
//             dispatch({type: warehouseActionType.FETCH_WAREHOUSE_REPORT, payload: response.data.data});
//         })
//         .catch(({response}) => {
//             dispatch(addToast(
//                 {text: response.data.message, type: toastType.ERROR}));
//         });
// };

export const fetchWarehouseReport =
    (id, fromDate = "", toDate = "") =>
    async (dispatch) => {
        let query = "?warehouse_id=" + id;
        if (fromDate) {
            query += "&from_date=" + fromDate;
        }
        if (toDate) {
            query += "&to_date=" + toDate;
        }

        await apiConfig
            .get(apiBaseURL.WAREHOUSE_REPORT + query)
            .then((response) => {
                dispatch({
                    type: warehouseActionType.FETCH_WAREHOUSE_REPORT,
                    payload: response.data.data,
                });
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text:
                            response?.data?.message ||
                            "Error fetching warehouse report.",
                        type: toastType.ERROR,
                    })
                );
            });
    };
