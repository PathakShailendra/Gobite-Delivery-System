import React from 'react';
import { useSelector } from 'react-redux';
import NoData from '../components/NoData';

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order);

  console.log("order Items", orders);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md p-4 mb-6 rounded-md">
        <h1 className="font-semibold text-gray-800">My Orders</h1>
      </div>

      {/* No Orders Fallback */}
      {!orders[0] && <NoData />}

      {/* Orders List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {orders.map((order, index) => {
          const product = order.product_details;
          return (
            <div
              key={order._id + index + "order"}
              className="bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-gray-100"
            >
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-700">Order No:</span> {order?.orderId}
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <p className="font-medium text-gray-800 text-base">{product.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
