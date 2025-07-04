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
        <th style="width: 300%">{{ __('messages.pdf.supplier') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.warehouse') }}</th>
        <th style="width: 200%">Product Name</th>
        <th style="width: 200%">Product Code</th>
        <th style="width: 200%">Product Cost</th>
        <th style="width: 200%">Quantity</th>
        <th style="width: 200%">{{ __('messages.pdf.total') }}</th>
        <th style="width: 200%">{{ __('messages.pdf.status') }}</th>
    </tr>
    </thead>
    <tbody>
    @foreach($purchases  as $item)
        <tr align="center">
            <td>{{$item->purchase->reference_code}}</td>
            <td>{{$item->purchase->supplier->name}}</td>
            <td>{{$item->purchase->warehouse->name}}</td>
            <td>{{$item->product->name}}</td>
            <td>{{$item->product->code}}</td>
            <td style="float: left">{{number_format($item->product_cost,2)}}</td>
            <td style="float: left">{{$item->quantity}}</td>
            <td style="float: left">{{number_format($item->sub_total,2)}}</td>
            @if($item->purchase->status == \App\Models\Purchase::RECEIVED)
                <td>Received</td>
            @elseif($item->purchase->status == \App\Models\Purchase::PENDING)
                <td>Pending</td>
            @elseif($item->purchase->status == \App\Models\Purchase::ORDERED)
                <td>Ordered</td>
            @endif
            <td></td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
