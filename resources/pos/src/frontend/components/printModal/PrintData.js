import React from "react";
import { Table, Image } from "react-bootstrap-v5";
import { calculateProductCost } from "../../shared/SharedMethod";
import "../../../assets/scss/frontend/pdf.scss";
import {
    currencySymbolHandling,
    getFormattedDate,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
class PrintData extends React.PureComponent {
    render() {
        const paymentPrint = this.props.updateProducts;
        const allConfigData = this.props.allConfigData;
        const paymentType = this.props.paymentType;
        const currency =
            paymentPrint.settings &&
            paymentPrint.settings.attributes &&
            paymentPrint.settings.attributes.currency_symbol;
        return (
            <div
                className="print-data"
                style={{
                    padding: "none !important",
                }}
            >
                <div className="d-flex justify-content-between align-items-center mt-5 mb-5">
                    <section className="w-50">
                        <div className="mt-4 mb-4 text-black text-center">
                            {paymentPrint.settings &&
                            parseInt(
                                paymentPrint.settings.attributes
                                    .show_logo_in_receipt
                            ) === 1 ? (
                                <img
                                    src={
                                        paymentPrint.frontSetting &&
                                        paymentPrint.frontSetting.value.logo
                                    }
                                    alt=""
                                    width="200px"
                                />
                            ) : (
                                ""
                            )}
                        </div>
                        <div
                            className="mt-4 mb-4 text-black text-center"
                            style={{
                                fontSize: "24px",
                                fontWeight: "600",
                                marginBottom: "15px !important",
                            }}
                        >
                            {paymentPrint.frontSetting &&
                                paymentPrint.frontSetting.value.company_name}
                        </div>
                    </section>

                    <section className="w-50">
                        <div
                            style={{
                                marginBottom: "4px",
                            }}
                        >
                            <span className="fw-bold me-2">
                                {paymentPrint.frontSetting &&
                                    paymentPrint.frontSetting.value
                                        .company_name}
                            </span>
                        </div>
                        {paymentPrint.settings &&
                            parseInt(
                                paymentPrint.settings.attributes.show_address
                            ) === 1 && (
                                <div
                                    style={{
                                        marginBottom: "4px",
                                    }}
                                >
                                    <span className="fw-bold me-2">
                                        {getFormattedMessage(
                                            "supplier.table.address.column.title"
                                        )}
                                        :
                                    </span>
                                    <span>
                                        {paymentPrint.frontSetting &&
                                            paymentPrint.frontSetting.value
                                                .address}
                                    </span>
                                </div>
                            )}

                        {paymentPrint.settings &&
                            parseInt(
                                paymentPrint.settings.attributes.show_phone
                            ) === 1 && (
                                <div
                                    style={{
                                        marginBottom: "4px",
                                    }}
                                >
                                    <span className="fw-bold me-2">
                                        {getFormattedMessage(
                                            "pos-sale.detail.Phone.info"
                                        )}
                                        :
                                    </span>
                                    <span>
                                        {paymentPrint.frontSetting &&
                                            paymentPrint.frontSetting.value
                                                .phone}
                                    </span>
                                </div>
                            )}
                    </section>
                </div>

                <section className="card p-4 mt-5 mb-5">
                    <div className="d-flex justify-content-between">
                        {paymentPrint.settings &&
                            parseInt(
                                paymentPrint.settings.attributes.show_customer
                            ) === 1 && (
                                <div style={{}}>
                                    <span className="fw-bold me-2">
                                        {getFormattedMessage(
                                            "dashboard.recentSales.customer.label"
                                        )}
                                        :
                                    </span>
                                    <span>
                                        {paymentPrint.customer_name &&
                                        paymentPrint.customer_name[0]
                                            ? paymentPrint.customer_name[0]
                                                  .label
                                            : paymentPrint.customer_name &&
                                              paymentPrint.customer_name.label}
                                    </span>
                                </div>
                            )}

                        <div className="d-flex">
                            <span className="fw-bold me-2">Invoice # </span>
                            <span
                                className="d-block"
                                style={{
                                    color: "#000000",
                                    padding: "none !important",
                                }}
                            >
                                {paymentPrint && paymentPrint.reference_code}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-block"></div>
                        <div
                            style={{
                                marginBottom: "4px",
                            }}
                        >
                            <span className="fw-bold me-2">
                                {getFormattedMessage(
                                    "react-data-table.date.column.label"
                                )}
                                :
                            </span>
                            <span>
                                {getFormattedDate(
                                    new Date(),
                                    allConfigData && allConfigData
                                )}
                            </span>
                        </div>
                    </div>
                </section>

                <table class="table table-borderless mt-5 mb-5">
                    <thead class="table-light">
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentPrint.products &&
                            paymentPrint.products.map((productName, index) => {
                                const productCost =
                                    calculateProductCost(productName);
                                const amount =
                                    productName.quantity * productCost;
                                return (
                                    <tr key={index}>
                                        <td>
                                            {productName.name}{" "}
                                            {paymentPrint.settings &&
                                            parseInt(
                                                paymentPrint.settings.attributes
                                                    .show_product_code
                                            ) === 1 ? (
                                                <span>
                                                    ({productName.code})
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </td>
                                        <td>
                                            {productName.quantity.toFixed(2)}{" "}
                                            {(productName.product_unit ===
                                                "3" &&
                                                "Kg") ||
                                                (productName.product_unit ===
                                                    "1" &&
                                                    "Pc") ||
                                                (productName.product_unit ===
                                                    "2" &&
                                                    "M")}
                                        </td>
                                        <td>
                                            {currencySymbolHandling(
                                                allConfigData,
                                                currency,
                                                productCost.toFixed(2)
                                            )}
                                        </td>

                                        <td>
                                            {currencySymbolHandling(
                                                allConfigData,
                                                currency,
                                                amount.toFixed(2)
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="3" class="text-end">
                                Subtotal
                            </th>
                            <td>
                                {" "}
                                {currencySymbolHandling(
                                    allConfigData,
                                    currency,
                                    paymentPrint.subTotal
                                        ? paymentPrint.subTotal
                                        : "0.00"
                                )}
                            </td>
                        </tr>
                        {paymentPrint.settings &&
                            parseInt(
                                paymentPrint.settings.attributes
                                    .show_tax_discount_shipping
                            ) === 1 && (
                                <tr>
                                    <th colspan="3" class="text-end">
                                        {getFormattedMessage(
                                            "globally.detail.order.tax"
                                        )}
                                        :{" "}
                                        {Number(paymentPrint.tax) > 0
                                            ? paymentPrint
                                                ? `(${Number(
                                                      paymentPrint.tax
                                                  ).toFixed(2)}%)`
                                                : "(0.00%)"
                                            : null}
                                    </th>
                                    <td>
                                        {currencySymbolHandling(
                                            allConfigData,
                                            currency,
                                            paymentPrint.taxTotal
                                                ? paymentPrint.taxTotal
                                                : "0.00"
                                        )}
                                    </td>
                                </tr>
                            )}
                        {paymentPrint.settings &&
                            parseInt(
                                paymentPrint.settings.attributes
                                    .show_tax_discount_shipping
                            ) === 1 && (
                                <tr>
                                    <th colspan="3" class="text-end">
                                        {getFormattedMessage(
                                            "globally.detail.discount"
                                        )}
                                        :
                                    </th>
                                    <td>
                                        {currencySymbolHandling(
                                            allConfigData,
                                            currency,
                                            paymentPrint
                                                ? paymentPrint.discount
                                                : "0.00"
                                        )}
                                    </td>
                                </tr>
                            )}
                        {paymentPrint.settings &&
                            parseInt(
                                paymentPrint.settings.attributes
                                    .show_tax_discount_shipping
                            ) === 1 &&
                            parseFloat(paymentPrint.shipping) !== 0.0 && (
                                <tr>
                                    <th colspan="3" class="text-end">
                                        {getFormattedMessage(
                                            "globally.detail.shipping"
                                        )}
                                        :
                                    </th>
                                    <td>
                                        {currencySymbolHandling(
                                            allConfigData,
                                            currency,
                                            paymentPrint
                                                ? paymentPrint.shipping
                                                : "0.00"
                                        )}
                                    </td>
                                </tr>
                            )}
                        <tr>
                            <th colspan="3" class="text-end">
                                {getFormattedMessage(
                                    "globally.detail.grand.total"
                                )}
                                :
                            </th>
                            <td>
                                {currencySymbolHandling(
                                    allConfigData,
                                    currency,
                                    paymentPrint.grandTotal
                                )}
                            </td>
                        </tr>
                    </tfoot>
                </table>

                <Table
                    style={{
                        padding: "none !important",
                        marginTop: "40px !important",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                padding: "none !important",
                            }}
                        >
                            <th
                                className="fw-bold"
                                style={{
                                    textAlign: "start",
                                    padding: "8px 15px",

                                    color: "#000000",
                                }}
                            >
                                {getFormattedMessage(
                                    "pos-sale.detail.Paid-bt.title"
                                )}
                            </th>
                            <th
                                className="fw-bold"
                                style={{
                                    textAlign: "center",
                                    padding: "8px 15px",

                                    color: "#000000",
                                }}
                            >
                                {getFormattedMessage(
                                    "expense.input.amount.label"
                                )}
                            </th>
                            <th
                                className="fw-bold"
                                style={{
                                    textAlign: "end",
                                    padding: "8px 15px",

                                    color: "#000000",
                                }}
                            >
                                {getFormattedMessage("pos.change-return.label")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            style={{
                                padding: "none !important",
                            }}
                        >
                            <td
                                style={{
                                    padding: "8px 15px",
                                    color: "#000000",
                                }}
                            >
                                {paymentType}
                            </td>
                            <td
                                style={{
                                    textAlign: "center",
                                    padding: "8px 15px",
                                    color: "#000000",
                                }}
                            >
                                {currencySymbolHandling(
                                    allConfigData,
                                    currency,
                                    paymentPrint.grandTotal
                                )}
                            </td>
                            <td
                                style={{
                                    textAlign: "end",
                                    padding: "8px 15px",
                                    color: "#000000",
                                }}
                            >
                                {currencySymbolHandling(
                                    allConfigData,
                                    currency,
                                    paymentPrint.changeReturn
                                )}
                            </td>
                        </tr>
                    </tbody>
                </Table>

                {/*note section*/}
                {paymentPrint && paymentPrint.note ? (
                    <Table>
                        <tbody>
                            <tr
                                style={{
                                    border: "0",
                                }}
                            >
                                <td
                                    scope="row"
                                    style={{
                                        padding: "none !important",
                                        fontSize: "15px",
                                    }}
                                >
                                    <span
                                        style={{
                                            padding: "none !important",
                                            fontSize: "15px",
                                            verticalAlign: "top",
                                            display: "inline-block",
                                            color: "#000000",
                                        }}
                                    >
                                        {getFormattedMessage(
                                            "globally.input.notes.label"
                                        )}{" "}
                                        :
                                    </span>
                                    <p
                                        style={{
                                            fontSize: "15px",
                                            verticalAlign: "top",
                                            display: "inline-block",
                                            padding: "none !important",
                                            color: "#000000",
                                        }}
                                    >
                                        {paymentPrint && paymentPrint.note}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                ) : (
                    ""
                )}
                {paymentPrint.settings &&
                    parseInt(paymentPrint.settings.attributes.show_note) ===
                        1 && (
                        <h3
                            style={{
                                textAlign: "center",
                                color: "#000000",
                                padding: "none !important",
                            }}
                        >
                            {paymentPrint.settings &&
                            paymentPrint.settings.attributes.notes
                                ? paymentPrint.settings &&
                                  paymentPrint.settings.attributes.notes
                                : ""}
                        </h3>
                    )}
                <div className="text-center d-block">
                    {paymentPrint.settings &&
                        parseInt(
                            paymentPrint.settings.attributes
                                ?.show_barcode_in_receipt
                        ) === 1 && (
                            <Image
                                src={paymentPrint && paymentPrint.barcode_url}
                                alt={
                                    paymentPrint && paymentPrint.reference_code
                                }
                                height={25}
                                width={100}
                            />
                        )}
                    <span
                        className="d-block"
                        style={{
                            color: "#000000",
                            padding: "none !important",
                        }}
                    >
                        {paymentPrint && paymentPrint.reference_code}
                    </span>
                </div>
            </div>
        );
    }
}

export default PrintData;
