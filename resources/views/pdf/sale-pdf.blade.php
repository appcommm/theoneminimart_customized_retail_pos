<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <title>{{ __('messages.sale_pdf') }}</title>
    <style>
        body {
            font-family: "pyidaungSu", sans-serif;
            margin: 20px;
            padding: 0;
            font-size: 14px;
        }

        .container {
            width: 90%;
            margin: 0 auto;
        }

        .header-section {
            text-align: center;
            margin-bottom: 15px;
        }

        .header-section img {
            max-width: 120px;
            margin-bottom: 5px;
        }

        .header-section p {
            margin: 3px 0;
        }

        .divider {
            border-top: 2px solid #000;
            margin: 10px 0;
        }

        .thick-divider {
            border-top: 6px solid #000;
            margin: 10px 0;
        }

        .invoice-info {
            width: 100%;
            margin-bottom: 15px;
        }

        .invoice-info td {
            padding: 3px 0;
            vertical-align: top;
        }

        .invoice-info .label {
            font-weight: bold;
            width: 100px;
        }

        .products-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }

        .products-table th, 
        .products-table td {
            padding: 8px;
            text-align: left;
        }

        .products-table th {
            border-bottom: 2px solid #000;
        }

        .summary-section {
            width: 100%;
        }

        .summary-table {
            width: 50%;
            margin-left: auto;
            border-collapse: collapse;
        }

        .summary-table th {
            text-align: right;
            padding: 5px;
            font-weight: bold;
        }

        .summary-table td {
            text-align: right;
            padding: 5px;
        }

        .footer-section {
            text-align: center;
            margin-top: 20px;
        }

        .footer-section h5 {
            margin: 5px 0;
            font-size: 16px;
        }

        .footer-section h6 {
            margin: 5px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Reference Code at Top -->
        <div style="text-align: left; margin-bottom: 10px;">
            {{ $sale->reference_code }}
        </div>

        <!-- Header Section with Logo and Company Info -->
        <div class="header-section">
            <img src="{{ asset('images/16.png') }}" alt="Company Logo" width="380px" />
            <!-- <p>{{ getSettingValue('address') }}</p> -->
            <!-- <p>Phone Number: {{ getSettingValue('phone') }}</p> -->
        </div>

        <!-- Dividers -->
        <div class="thick-divider"></div>
        <div class="divider"></div>

        <!-- Invoice Information -->
        <table class="invoice-info">
            <tr>
                <td class="label">Invoice No:</td>
                <td>{{ $sale->reference_code }}</td>
            </tr>
            <tr>
                <td class="label">Date:</td>
                <td>{{ \Carbon\Carbon::parse($sale->created_at)->format('Y-m-d') }}</td>
            </tr>
            <tr>
                <td class="label">Customer Name:</td>
                <td>
                    {{ isset($sale->customer->name) ? $sale->customer->name : '' }}
                </td>
            </tr>
                        <tr>
                <td class="label">Customer Address:</td>
                <td>
                    {{ isset($sale->customer->address) ? $sale->customer->address : '' }}
                    {{ isset($sale->customer->city) ? $sale->customer->city : '' }}
                    {{ isset($sale->customer->country) ? $sale->customer->country : '' }}
                </td>
            </tr>
            <tr>
                <td class="label">Phone No:</td>
                <td>{{ isset($sale->customer->phone) ? $sale->customer->phone : 'N/A' }}</td>
            </tr>
        </table>

        <!-- Products Table -->
        <table class="products-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach($sale->saleItems as $key => $saleItem)
                <tr>
                    <td>{{ $key + 1 }}</td>
                    <td>{{ $saleItem->product->name }}</td>
                    <td>
                        {{ $saleItem->unit == 1 ? $saleItem->quantity . ' Pc' : $saleItem->quantity . ' Bc (' . ($saleItem->quantity * $saleItem->box_per_qty) . ' Pc)' }}
                    </td>

                    <td>
                        {{ currencyAlignment(number_format((float)($saleItem->unit == 1 ? $saleItem->net_unit_price : $saleItem->net_unit_price), 2)) }}
                    </td>

                    <td>{{ currencyAlignment(number_format((float)$saleItem->sub_total, 2)) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="divider"></div>

        <!-- Summary Section -->
        <div class="summary-section">
            <table class="summary-table">
                <tr>
                    <th>Total:</th>
                    <td>{{ currencyAlignment(number_format((float) ($sale->grand_total + $sale->discount), 2)) }}</td>
                </tr>
                <tr>
                    <th>Discount:</th>
                    <td>{{ currencyAlignment(number_format((float)$sale->discount, 2)) }}</td>
                </tr>
                <tr>
                    <th>Net Amount:</th>
                    <td>{{ currencyAlignment(number_format((float)$sale->grand_total, 2)) }}</td>
                </tr>
            </table>
        </div>

        <div class="divider"></div>

        <!-- Footer Section -->
        <div class="footer-section">
            <h5>မိမိဝယ်ယူသည့်ပစ္စည်းများကို သေချာစစ်ဆေးပေးပါရန် ...</h5>
            <h6>ဝယ်ယူမှုအတွက်ကျေးဇူးတင်ပါသည်</h6>
        </div>
    </div>
</body>
</html>