<?php

namespace App\Exports;

use App\Models\Purchase;
use App\Models\PurchaseItem;
use Maatwebsite\Excel\Concerns\FromView;

class PurchaseReportExport implements FromView
{
    public function view(): \Illuminate\Contracts\View\View
    {
        $startDate = request()->get('start_date');
        $endDate = request()->get('end_date');

        if ($startDate != 'null' && $endDate != 'null' && $startDate && $endDate) {
            $purchases = PurchaseItem::with(['purchase','product', 'purchase.warehouse', 'purchase.supplier'])->whereDate('created_at', '>=',
                $startDate)
                ->whereDate('created_at', '<=', $endDate)
                ->get();
        } else {
            $purchases = PurchaseItem::with(['purchase','product', 'purchase.warehouse', 'purchase.supplier'])->get();
        }

        return view('excel.all-purchase-report-excel', ['purchases' => $purchases]);
    }
}
