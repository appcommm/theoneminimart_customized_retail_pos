<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "//www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title> Sale report pdf</title>
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon.ico') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <!-- General CSS Files -->
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
</head>
<body>
<table width="100%" cellspacing="0" cellpadding="10" style="margin-top: 40px;">
<thead>
    <tr style="background-color: dodgerblue;">
        <th style="width: 200%">{{ __('messages.pdf.reference') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.client') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.warehouse') }}</th>
        <th style="width: 200%">Product Name</th>
        <th style="width: 200%">Product Code</th>
        <th style="width: 200%">Piece Quantity</th>
        <th style="width: 200%">Box Quantity</th>
        <th style="width: 200%">Piece Per Box</th>
        <th style="width: 200%">Total Quantity</th>
        <th style="width: 200%">Net Price</th>
        <th style="width: 200%">Price Per Box</th>
        <th style="width: 200%">Total</th>
        <th style="width: 300%">{{ __('messages.pdf.payment_status') }}</th>
    </tr>
    </thead>
    <tbody>
    @foreach($sales  as $item)
        <tr align="center">
        <td>{{ $item->sale->reference_code ?? 'N/A' }}</td>
        <td>{{ $item->sale->customer->name ?? 'N/A' }}</td>
        <td>{{ $item->sale->warehouse->name ?? 'N/A' }}</td>
        <td>{{ $item->product->name ?? 'N/A' }}</td>
        <td>{{ $item->product->code ?? 'N/A' }}</td>
            <td style="float: left">
                @if($item->unit == 1)
                    {{ $item->quantity }}
                @elseif($item->unit == 2)
                    0
                @endif
            </td>
            <td style="float: left">
                @if($item->unit == 1)
                   0
                @elseif($item->unit == 2)
                {{ $item->quantity }}
                @endif
            </td>
            <td style="float: left">{{$item->box_per_qty ?? 0}}</td>
            <td style="float: left">
                @if($item->unit == 1)
                    {{ $item->quantity }}
                @elseif($item->unit == 2)
                    {{ $item->quantity * $item->box_per_qty }}
                @endif
            </td>

            <td style="float: left">{{number_format((float)$item->product_price, 2)}}</td>
            <td style="float: left">{{number_format((float)$item->box_per_price ?? 0, 2)}}</td>
            <td style="float: left">{{number_format($item->sub_total,2)}}</td>
            @if($item->sale->status == \App\Models\Sale::PAID)
                <td>paid</td>
            @elseif($item->sale->status == \App\Models\Sale::UNPAID)
                <td>unpaid</td>
            @elseif($item->sale->status == \App\Models\Sale::PARTIAL_PAID)
                <td>partial</td>
            @endif
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
