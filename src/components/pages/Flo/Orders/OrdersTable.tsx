import React from 'react';
import { Clock, DollarSign, Users } from 'lucide-react';

interface Order {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'draft';
  budget: string;
  applicants: number;
  approved: number;
  total: number;
  deadline: string;
  image: string;
}

interface OrdersTableProps {
  orders: Order[];
  view: 'creator' | 'brand';
}

export function OrdersTable({ orders, view }: OrdersTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
          <div className="col-span-4">NAME</div>
          <div className="col-span-2">STATUS</div>
          <div className="col-span-2">BUDGET</div>
          <div className="col-span-1">{view === 'brand' ? 'APPLICANTS' : 'APPROVED'}</div>
          <div className="col-span-2">DEADLINE</div>
          <div className="col-span-1">ACTIONS</div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {orders.map((order) => (
          <div key={order.id} className="px-4 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50">
            <div className="col-span-4 flex items-center gap-3">
              <img
                src={order.image}
                alt={order.title}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{order.title}</h3>
                <p className="text-sm text-gray-500">{order.description}</p>
              </div>
            </div>
            <div className="col-span-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${
                    order.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-1 text-gray-900">
              <DollarSign className="w-4 h-4 text-gray-400" />
              {order.budget}
            </div>
            <div className="col-span-1 flex items-center gap-1 text-gray-900">
              <Users className="w-4 h-4 text-gray-400" />
              {view === 'brand' ? order.applicants : `${order.approved}/${order.total}`}
            </div>
            <div className="col-span-2 flex items-center gap-1 text-gray-900">
              <Clock className="w-4 h-4 text-gray-400" />
              {order.deadline}
            </div>
            <div className="col-span-1">
              <button className="text-blue-600 hover:text-blue-800">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}