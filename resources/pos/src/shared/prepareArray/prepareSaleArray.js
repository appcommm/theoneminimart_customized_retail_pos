export const prepareSaleProductArray = (products) => {
    let saleProductRowArray = [];
    products.forEach((product) => {
        saleProductRowArray.push({
            name: product.attributes.name,
            code: product.attributes.code,
            stock: product.attributes.stock
                ? product.attributes.stock.quantity
                : "",
            box_per_qty: product.attributes?.box_per_qty,
            box_per_price: product.attributes?.box_per_price,
            short_name: product.attributes?.sale_unit_name?.short_name,
            product_unit: product.attributes.product_unit,
            product_id: product.id,
            product_price: product.attributes.product_price,
            net_unit_price: product.attributes.product_price,
            fix_net_unit: product.attributes.product_price,
            original_fix_net_unit: product.attributes.product_price,
            unit: 1,
            tax_type: product.attributes.tax_type
                ? product.attributes.tax_type
                : 1,
            tax_value: product.attributes.order_tax
                ? product.attributes.order_tax
                : 0.0,
            tax_amount: 0.0,
            discount_type: "2",
            discount_value: 0.0,
            discount_amount: 0.0,
            sale_unit: product.attributes?.sale_unit?.id
                ? Number(product.attributes.sale_unit.id)
                : Number(product.attributes.sale_unit),
            quantity: 1,
            sub_total: 0.0,
            id: product.id,
            sale_item_id: "",
            sale_return_item_id: "",
            adjustMethod: 1,
            adjustment_item_id: "",
            quotation_item_id: "",
            quantity_limit: product.attributes.quantity_limit,
        });
    });
    return saleProductRowArray;
};
