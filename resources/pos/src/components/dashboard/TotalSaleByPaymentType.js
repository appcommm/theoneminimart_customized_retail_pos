import React, { useEffect, useState } from "react";
import { Card, Row, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import {
    currencySymbolHandling,
    getFormattedMessage,
} from "../../shared/sharedMethod";
import { totalSaleByPaymentType } from "../../store/action/totalSaleByPaymentTypeAction";
import { Tokens } from "../../constants";
import "moment/min/locales.min";

const TotalSaleByPaymentType = (props) => {
    const {
        totalSale,
        totalSaleByPaymentType,
        frontSetting,
        allConfigData,
    } = props;
    const [languageCode, setLanguageCode] = useState("enGB");

    const updatedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE);
    const { selectedLanguage } = useSelector((state) => state);
    const messages = updatedLanguage ? updatedLanguage : selectedLanguage;
    useEffect(() => {
        totalSaleByPaymentType();
    }, []);

    useEffect(() => {
        if (messages === "en") {
            setLanguageCode("enGB");
        } else if (messages === "sp") {
            setLanguageCode("es");
        } else if (messages === "gr") {
            setLanguageCode("de");
        } else if (messages === "fr") {
            setLanguageCode("fr");
        } else if (messages === "ar") {
            setLanguageCode("ar");
        } else if (messages === "tr") {
            setLanguageCode("tr");
        } else if (messages === "vi") {
            setLanguageCode("vi");
        } else if (messages === "cn") {
            setLanguageCode("zh-cn");
        }
    }, [messages]);

    return (
        <div className="pt-6">
            <Row className="g-4">
                <div className="col-xxl-8 col-12">
                    <Card>
                        <Card.Header className="pb-0 px-10">
                            <h5 className="mb-0">
                                {getFormattedMessage(
                                    "dashboard.paymentTypes.total-sale.title"
                                )}{" "}
                            </h5>
                        </Card.Header>
                        <Card.Body className="pt-7 pb-2">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>
                                            {getFormattedMessage(
                                                "select.payment-type.label"
                                            )}
                                        </th>
                                        <th>
                                            {getFormattedMessage(
                                                "dashboard.grantTotal.label"
                                            )}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { totalSale &&
                                        totalSale.map((top, index) => {
                                            const renderTooltip = (props) => (
                                                <Tooltip
                                                    id="button-tooltip"
                                                    {...props}
                                                >
                                                    {currencySymbolHandling(
                                                        allConfigData,
                                                        frontSetting.value &&
                                                        frontSetting.value
                                                            .currency_symbol,
                                                        top.grand_total
                                                    )}
                                                </Tooltip>
                                            );
                                            return (
                                                <tr key={index}>
                                                    <td className="py-4">
                                                        {
                                                            (top.payment_type === 1 && getFormattedMessage("cash.label")) ||
                                                            (top.payment_type === 2 && getFormattedMessage("payment-type.filter.cheque.label")) ||
                                                            (top.payment_type === 3 && getFormattedMessage("payment-type.filter.bank-transfer.label")) ||
                                                            (top.payment_type === 4 && getFormattedMessage("payment-type.filter.other.label")) ||
                                                            (top.payment_type === 5 && getFormattedMessage("payment-type.filter.kpay.label"))
                                                        }
                                                    </td>
                                                    <td className="py-4">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            delay={{
                                                                show: 250,
                                                                hide: 400,
                                                            }}
                                                            overlay={
                                                                renderTooltip
                                                            }
                                                        >
                                                            <span>
                                                                {currencySymbolHandling(
                                                                    allConfigData,
                                                                    frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                    top.grand_total
                                                                )}
                                                            </span>
                                                        </OverlayTrigger>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log(state.totalSaleByPaymentType);
    const { totalSaleByPaymentType, allConfigData } = state;
    return { totalSale: totalSaleByPaymentType, allConfigData };
};

export default connect(mapStateToProps, {
    totalSaleByPaymentType,
})(TotalSaleByPaymentType);
