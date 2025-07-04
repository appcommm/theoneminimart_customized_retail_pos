import React, { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap-v5";
import { connect } from "react-redux";
import ProductModal from "./ProductModal";
import Form from "react-bootstrap/Form";
import {
    taxAmountMultiply,
    discountAmountMultiply,
    subTotalCount,
    amountBeforeTax,
} from "../../calculation/calculation";
import { productUnitDropdown } from "../../../store/action/productUnitAction";
import { currencySymbolHandling, decimalValidate } from "../../sharedMethod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactSelect from "../../select/reactSelect";

const PurchaseTable = (props) => {
    const {
        singleProduct,
        index,
        updateCost,
        updateDiscount,
        updateProducts,
        setUpdateProducts,
        frontSetting,
        updateTax,
        updateSubTotal,
        productUnitDropdown,
        productUnits,
        updatePurchaseUnit,
        allConfigData,
    } = props;
    const [updateData, setUpdateData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalId, setModalId] = useState(null);

    const SaleUnitOptions = [
        {
            label: `pcs`,
            value: 1,
        },
        { label: `box`, value: 2 },
    ];

    useEffect(() => {
        singleProduct.newItem !== "" &&
            productUnitDropdown(singleProduct.product_unit);
    }, [updateData, singleProduct.purchase_unit]);

    useEffect(() => {
        singleProduct.sub_total = Number(subTotalCount(singleProduct));
    }, [singleProduct.sub_total]);

    const onDeleteCartItem = (id) => {
        const newProduct = updateProducts.filter((item) => item.id !== id);
        setUpdateProducts(newProduct);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
        e.stopPropagation();
        productUnitDropdown(singleProduct.product_unit);
        setModalId(singleProduct.id);
    };

    const onProductUpdateInCart = (item) => {
        setUpdateData(item);
    };

    const handleIncrement = () => {
        setUpdateProducts((updateProducts) =>
            updateProducts.map((item) =>
                item.id === singleProduct.id
                    ? { ...item, quantity: item.quantity++ + 1 }
                    : item
            )
        );
    };

    const handleDecrement = () => {
        if (singleProduct.quantity - 1 > 0.0) {
            setUpdateProducts((updateProducts) =>
                updateProducts.map((item) =>
                    item.id === singleProduct.id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity > 0.0 && item.quantity-- - 1,
                          }
                        : item
                )
            );
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        // check if value includes a decimal point
        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            // restrict value to only 2 decimal places
            if (decimal?.length > 2) {
                // do nothing
                return;
            }
        }
        setUpdateProducts((updateProducts) =>
            updateProducts.map((item) =>
                item.id === singleProduct.id
                    ? { ...item, quantity: Number(value) }
                    : item
            )
        );
    };

    const onMethodChangeFinalProduct = (obj, index) => {
        console.log(obj, "obj");

        setUpdateProducts((updateProducts) =>
            updateProducts.map((item) => {
                if (item.id === singleProduct.id) {
                    if (obj.value === 2) {
                        return {
                            ...item,
                            fix_net_unit: item.box_per_purchase_cost,
                            unit: obj.value,
                        };
                    }
                    if (obj.value === 1) {
                        console.log("Reverting to original fix_net_unit");
                        return {
                            ...item,
                            fix_net_unit: singleProduct.product_cost || 0,
                            unit: obj.value,
                        };
                    }
                }
                return item;
            })
        );
    };

    return (
        <>
            <tr key={index} className="align-middle text-nowrap">
                <td className="ps-3">
                    <h4 className="product-name">{singleProduct.code}</h4>
                    <div className="d-flex align-items-center">
                        <span className="badge bg-light-success">
                            <span>{singleProduct.name}</span>
                        </span>
                        <span className="badge bg-light-primary p-1 ms-1">
                            <FontAwesomeIcon
                                icon={faPencil}
                                onClick={(e) => handleClose(e)}
                                style={{ cursor: "pointer" }}
                            />
                        </span>
                    </div>
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        amountBeforeTax(singleProduct)
                    )}
                </td>
                <td>
                    {singleProduct.isEdit ? (
                        singleProduct.stocks.length >= 1 ? (
                            singleProduct.stocks.map((item) => {
                                return (
                                    <div className="d-flex flex-column gap-2">
                                        <span className="badge bg-light-warning">
                                            <span>
                                                {item.quantity}&nbsp;
                                                {singleProduct.short_name}
                                            </span>
                                        </span>

                                        <span className="badge bg-light-success">
                                            <span>
                                                {singleProduct.box_per_qty}
                                                &nbsp; qty per box
                                            </span>
                                        </span>

                                        <span className="badge bg-light-primary">
                                            <span>
                                                {currencySymbolHandling(
                                                    allConfigData,
                                                    frontSetting.value &&
                                                        frontSetting.value
                                                            .currency_symbol,
                                                    singleProduct.box_per_purchase_cost
                                                )}
                                                &nbsp; price per box
                                            </span>
                                        </span>
                                    </div>
                                );
                            })
                        ) : singleProduct.stock === "" ? (
                            <span className="badge bg-light-warning">
                                <span>
                                    {singleProduct.sold_quantity}&nbsp;
                                    {singleProduct.short_name}
                                </span>
                            </span>
                        ) : null
                    ) : singleProduct.stock >= 0 ? (
                        <div className="d-flex flex-column gap-2">
                            <span className="badge bg-light-warning">
                                <span>
                                    {singleProduct.stock}&nbsp;
                                    {singleProduct.short_name}
                                </span>
                            </span>
                            <span className="badge bg-light-success">
                                <span>
                                    {singleProduct.box_per_qty}&nbsp; qty per
                                    box
                                </span>
                            </span>

                            <span className="badge bg-light-primary">
                                <span>
                                    {currencySymbolHandling(
                                        allConfigData,
                                        frontSetting.value &&
                                            frontSetting.value.currency_symbol,
                                        singleProduct.box_per_purchase_cost
                                    )}
                                    &nbsp; purchase cost per box
                                </span>
                            </span>
                        </div>
                    ) : // <span className="badge bg-light-warning">
                    //     <span>0 &nbsp;{singleProduct.short_name}</span>
                    // </span>
                    null}
                </td>
                <td>
                    <ReactSelect
                        name="SaleUnit"
                        data={SaleUnitOptions}
                        onChange={(obj) =>
                            onMethodChangeFinalProduct(obj, index)
                        }
                        // defaultValue={SaleUnitOptions[0]}
                        defaultValue={
                            SaleUnitOptions.find(
                                (option) => option.value == singleProduct?.unit
                            ) || SaleUnitOptions[0]
                        }
                        isRequired
                    />
                </td>
                <td>
                    <div className="custom-qty">
                        <InputGroup className="flex-nowrap">
                            <InputGroup.Text
                                className="btn btn-primary btn-sm px-4 pt-2"
                                onClick={() => handleDecrement()}
                            >
                                -
                            </InputGroup.Text>
                            <Form.Control
                                aria-label="Product Quantity"
                                onKeyPress={(event) => decimalValidate(event)}
                                className="text-center px-0 py-2 rounded-0 hide-arrow"
                                value={singleProduct.quantity}
                                type="number"
                                step={0.01}
                                min={0.0}
                                onChange={(e) => handleChange(e)}
                            />
                            <InputGroup.Text
                                className="btn btn-primary btn-sm px-4 px-4 pt-2"
                                onClick={(e) => handleIncrement(e)}
                            >
                                +
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        discountAmountMultiply(singleProduct)
                    )}
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        taxAmountMultiply(singleProduct)
                    )}
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        subTotalCount(singleProduct)
                    )}
                </td>
                <td className="text-start">
                    <button className="btn px-2 text-danger fs-3">
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => onDeleteCartItem(singleProduct.id)}
                        />
                    </button>
                </td>
            </tr>
            <ProductModal
                handleClose={handleClose}
                setIsOpen={setIsOpen}
                show={isOpen}
                modalId={modalId}
                isOpen={isOpen}
                frontSetting={frontSetting}
                product={singleProduct}
                id={singleProduct.id}
                productUnits={productUnits}
                updatePurchaseUnit={updatePurchaseUnit}
                updateProducts={updateProducts}
                title={singleProduct.name}
                onProductUpdateInCart={onProductUpdateInCart}
                updateSubTotal={updateSubTotal}
                updateCost={updateCost}
                updateDiscount={updateDiscount}
                updateTax={updateTax}
            />
        </>
    );
};

const mapStateToProps = (state) => {
    const { productUnits, frontSetting, allConfigData } = state;
    return { productUnits, frontSetting, allConfigData };
};

export default connect(mapStateToProps, { productUnitDropdown })(PurchaseTable);
