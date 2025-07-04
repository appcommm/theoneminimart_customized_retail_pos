import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect, useDispatch, useSelector } from "react-redux";

import ReactDataTable from "../../../shared/table/ReactDataTable";
// import { fetchSales } from "../../../store/action/salesAction";
import {
    currencySymbolHandling,
    getFormattedDate,
    getFormattedMessage,
    placeholderText,
} from "../../../shared/sharedMethod";
import { salePdfAction } from "../../../store/action/salePdfAction";
import ActionDropDownButton from "../../../shared/action-buttons/ActionDropDownButton";
import { fetchFrontSetting } from "../../../store/action/frontSettingAction";
import ShowPayment from "../../../shared/showPayment/ShowPayment";
import { fetchSalePayments } from "../../../store/action/salePaymentAction";
import TopProgressBar from "../../../shared/components/loaders/TopProgressBar";
import { totalSaleReportExcel } from "../../../store/action/totalSaleReportExcel";

const Sales = (props) => {
    const {
        sales,
        totalRecord,
        isLoading,
        salePdfAction,
        fetchFrontSetting,
        frontSetting,
        isCallSaleApi,
        allConfigData,
        selectedData,
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isShowPaymentModel, setIsShowPaymentModel] = useState(false);
    const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [createPaymentItem, setCreatePaymentItem] = useState({});
    const { allSalePayments } = useSelector((state) => state);
    const [tableArray, setTableArray] = useState([]);
    const [isWarehouseValue, setIsWarehouseValue] = useState(false);

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    const currencySymbol =
        frontSetting &&
        frontSetting.value &&
        frontSetting.value.currency_symbol;

    const onChange = (filter) => {
        // fetchSales(filter, true);
    };

    const onExcelClick = () => {
        setIsWarehouseValue(true);
    };

    console.log(selectedData, "register sale");

    //sale edit function
    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = "#/app/sales/edit/" + id;
    };

    // delete sale function
    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };
    const dispatch = useDispatch();

    const onShowPaymentClick = (item) => {
        setIsShowPaymentModel(!isShowPaymentModel);
        setCreatePaymentItem(item);
        if (item) {
            dispatch(fetchSalePayments(item.id));
        }
    };

    const onCreatePaymentClick = (item) => {
        setIsCreatePaymentOpen(!isCreatePaymentOpen);
        setCreatePaymentItem(item);
        if (item) {
            dispatch(fetchSalePayments(item.id));
        }
    };

    //sale details function
    const goToDetailScreen = (ProductId) => {
        window.location.href = "#/app/sales/detail/" + ProductId;
    };

    //onClick pdf function
    const onPdfClick = (id) => {
        salePdfAction(id);
    };

    const onCreateSaleReturnClick = (item) => {
        const id = item.id;
        window.location.href =
            item.is_return === 1
                ? "#/app/sales/return/edit/" + id
                : "#/app/sales/return/" + id;
    };

    const itemsValue =
        currencySymbol &&
        selectedData.length >= 0 &&
        selectedData.map((item) => ({
            product_code: item.product.product_code,
            product_name: item.product.name,
            sub_total: item.product_price,
            quantity: item.quantity,
            currency: currencySymbol,
        }));

    const columns = [
        {
            name: getFormattedMessage("Code"),
            sortField: "product_code",
            sortable: false,
            cell: (row) => {
                return (
                    <span className="badge bg-light-danger">
                        <span>{row.product_code}</span>
                    </span>
                );
            },
        },
        {
            name: getFormattedMessage("Product"),
            selector: (row) => row.product_name,
            sortField: "product_name",
            sortable: false,
        },
        // {
        //     name: getFormattedMessage("Unit Price"),
        //     sortField: "product_price",
        //     cell: (row) => {
        //         return (
        //             <span>
        //                 {currencySymbolHandling(
        //                     allConfigData,
        //                     row.currency,
        //                     row.product_price
        //                 )}
        //             </span>
        //         );
        //     },
        //     sortable: false,
        // },
        {
            name: getFormattedMessage("Total Quantity"),
            selector: (row) => row.quantity,
            sortField: "quantity",
            sortable: false,
        },
        {
            name: getFormattedMessage("Total Price"),
            sortField: "sub_total",
            cell: (row) => {
                return (
                    <span>
                        {currencySymbolHandling(
                            allConfigData,
                            row.currency,
                            row.sub_total
                        )}
                    </span>
                );
            },
            sortable: false,
        },
    ];

    return (
        <ReactDataTable
            columns={columns}
            items={itemsValue}
            to="#/app/sales/create"
            // ButtonValue={getFormattedMessage("sale.create.title")}
            // isShowPaymentModel={isShowPaymentModel}
            isCallSaleApi={isCallSaleApi}
            // isShowDateRangeField
            onChange={onChange}
            totalRows={totalRecord}
            // goToEdit={goToEdit}
            isLoading={isLoading}
            isShowSearch
            // isShowFilterField
            // isEXCEL
            // isPaymentStatus
            // isStatus
            // isPaymentType
            // onExcelClick={onExcelClick}
        />
    );
};

const mapStateToProps = (state) => {
    const {
        sales,
        totalRecord,
        isLoading,
        frontSetting,
        isCallSaleApi,
        allConfigData,
        dates,
    } = state;
    return {
        sales,
        totalRecord,
        isLoading,
        frontSetting,
        isCallSaleApi,
        allConfigData,
        dates,
    };
};

export default connect(mapStateToProps, {
    salePdfAction,
    fetchFrontSetting,
    totalSaleReportExcel,
})(Sales);
