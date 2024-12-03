import React from 'react';
import { Clock, DollarSign, Users, Video, Image as ImageIcon } from 'lucide-react';
import { Order } from '../types/order';
import { StatusBadge } from './StatusBadge';

interface OrderCardProps {
  order: Order;
  view: 'creator' | 'brand';
}

export function OrderCard({ order, view }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src={order.image}
            alt={order.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{order.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <img
                src={order.brand.logo}
                alt={order.brand.name}
                className="w-5 h-5 rounded-full"
              />
              <span className="text-sm text-gray-600">{order.brand.name}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>
      
      <p className="text-gray-600 mb-4">{order.description}</p>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <span className="text-gray-900 font-medium">{order.budget}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-400" />
          <span className="text-gray-900 font-medium">
            {view === 'brand' ? `${order.applicants} applicants` : `${order.approved}/${order.total} approved`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-gray-900 font-medium">{order.deadline}</span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Deliverables:</h4>
        <div className="flex gap-3">
          {order.deliverables.map((deliverable, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-sm text-gray-600"
            >
              {deliverable.type === 'video' ? (
                <Video className="w-4 h-4" />
              ) : (
                <ImageIcon className="w-4 h-4" />
              )}
              <span>
                {deliverable.quantity}x {deliverable.type}
                {deliverable.duration && ` (${deliverable.duration})`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          {view === 'brand' ? 'View Applications' : 'View Details'}
        </button>
      </div>
    </div>
  );
}