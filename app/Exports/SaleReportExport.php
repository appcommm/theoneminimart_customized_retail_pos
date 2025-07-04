<?php

namespace App\Exports;

use App\Models\Sale;
use App\Models\SaleItem;
use Maatwebsite\Excel\Concerns\FromView;

class SaleReportExport implements FromView
{
    public function view(): \Illuminate\Contracts\View\View
    {
        // $startDate = request()->get('start_date');
        // $endDate = request()->get('end_date');
        // if ($startDate != 'null' && $endDate != 'null' && $startDate && $endDate) {
        //     $sales = SaleItem::with(['sale', 'sale.warehouse', 'sale.customer', 'sale.payments','product'])->whereDate('created_at', '>=',
        //         $startDate)
        //         ->whereDate('created_at', '<=', $endDate)
        //         ->get();
        // } else {
        //     $sales = SaleItem::with(['sale', 'sale.warehouse', 'sale.customer', 'sale.payments','product'])->get();
        // }
        // // dd($sales);

        // return view('excel.all-sale-report-excel', ['sales' => $sales]);
        $startDate = request()->get('start_date');
        $endDate = request()->get('end_date');
        $userId = request()->get('user_id');
        $openedAt = request()->get('opened_at');
        $closedAt = request()->get('closed_at');
    
        $query = SaleItem::with(['sale', 'sale.warehouse', 'sale.customer', 'sale.payments', 'product']);

    
        if ($startDate != 'null' && $endDate != 'null' && $startDate && $endDate) {
            $query->whereDate('created_at', '>=', $startDate)
                  ->whereDate('created_at', '<=', $endDate);
        }


    
        if ($userId != "null" && $userId) {
            $query->whereHas('sale', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            });
        }
    
        if ($openedAt != "null" && $openedAt && $closedAt != "null" && $closedAt) {
            $query->whereBetween('created_at', [$openedAt, $closedAt]);
        }
    
        $sales = $query->get();

        // dd($sales);
    
        return view('excel.all-sale-report-excel', ['sales' => $sales]);
    }
}
