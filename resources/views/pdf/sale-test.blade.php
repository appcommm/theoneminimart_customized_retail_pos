<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "//www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>{{ __('messages.sale_pdf') }}</title>
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon.ico') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <!-- General CSS Files -->
    <!-- <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/> -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <style>
        body {
            font-family: 'pyidaungSu', sans-serif;
        }

    .table td,
      .table th {
        border: none;
        background-color: transparent !important;
      }
      .table tr {
        border: none;
        background-color: transparent !important;
      }
      .table thead th {
        color: black !important;
        font-weight: bold; /* Ensures the header text is bold */
      }

      .bb {
        border-bottom: 2px solid black !important
      }

        @if(getLoginUserLanguage() !='ar')
            .fw-bold {
            font-weight: 500;
            color: #333;
        }

        @else
        .fw-bold {
            /*font-weight: 500;*/
            color: #333;
        }

        @endif

        @if(getLoginUserLanguage() =='vi')
            .vi-bold-text {
                font-size: 14px;
                font-weight: bolder;
                color: #333;
            }

            .vi-light-text {
                font-size: 16px;
            }
        @endif

        .fw-light {
            font-weight: 500;
            color: grey;
        }
    </style>

</head>
<body>
    <div class="container mt-5">
      <div class="text-center">
        <span class="me-3">{{ $sale->reference_code }}</span>
        <img src="{{$companyLogo}}" alt="Company Logo" width="80px">
        <p class="me-3">{{ getSettingValue('address') }}</p>
        <p class="me-3">Phone Number: {{ getSettingValue('phone') }}</p>
      </div>
      <hr
        style="
          height: 6px;
          background-color: black !important;
          border: none;
          opacity: 1;
        "
      />

      <hr
        style="
          height: 2px;
          background-color: black !important;
          border: none;
          opacity: 1;
        "
      />
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-between">
            <p><strong>Invoice No:</strong></p>
            <p>{{ $sale->reference_code }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p><strong>Date:</strong></p>
            <p>{{ \Carbon\Carbon::parse($sale->created_at)->format('Y-m-d') }}</p>
          </div>
          <p><strong>Customer:</strong>     {{ isset($sale->customer->address) ? $sale->customer->address : '' }}
                                {{ isset($sale->customer->city) ? $sale->customer->city : '' }}
                                {{ isset($sale->customer->country) ? $sale->customer->country : '' }}</p>
          <p><strong>Phone No:</strong> {{ isset($sale->customer->phone) ? $sale->customer->phone : 'N/A' }}</p>
        </div>
      </div>
      <table class="table table-bordered mt-3">
        <thead class="table-dark">
          <tr class="bb">
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
        @foreach($sale->saleItems  as $saleItem)
          <tr>
            <td>1</td>
            <td>{{$saleItem->product->name}}</td>
            <td>{{$saleItem->quantity}}</td>
            <td>{{ currencyAlignment(number_format((float)$saleItem->net_unit_price, 2))}}</td>
            <td>{{ currencyAlignment(number_format((float)$saleItem->sub_total, 2))}}</td>
          </tr>
          @endforeach
        </tbody>
      </table>
      <hr
        style="
          height: 2px;
          background-color: black !important;
          border: none;
          opacity: 1;
        "
      />
      <div class="row mt-3">
        <div class="col-md-6 offset-md-6">
          <table class="table table-bordered">
            <tr>
              <th>Total:</th>
              <td class="float-end">{{ currencyAlignment(number_format((float) ($sale->grand_total + $sale->discount), 2)) }}</td>
            </tr>
            <tr>
              <th>Discount:</th>
              <td class="float-end">{{ currencyAlignment(number_format((float)$sale->discount, 2))}}</td>
            </tr>
            <tr>
              <th>Net Amount:</th>
              <td style="font-size: 14px !important" class="float-end">
              {{currencyAlignment(number_format((float)$sale->grand_total, 2))}}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <hr
        style="
          height: 2px;
          background-color: black !important;
          border: none;
          opacity: 1;
        "
      />
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h5 class="me-3">မိမိဝယ်ယူသည့်ပစ္စည်းများကို သေချာစစ်ဆေးပေးပါရန် .... </h5>
        <h6 class="me-3">ဝယ်ယူမှုအတွက်ကျေးဇူးတင်ပါသည်</h6>
      </div>
    </div>
  </body>
</html>
