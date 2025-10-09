import { useCart } from "../Context/CardContext";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg mb-4 shadow-sm bg-white">
      {/* Item Details */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded"
        />
        <div>
          <h3 className="font-bold text-lg">{item.name}</h3>
          <p className="text-gray-600">Unit Price: ₹{item.price}</p>
          <p className="text-black font-semibold">
            Total: ₹{item.price * item.quantity}
          </p>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center gap-2 mt-3 sm:mt-0">
        <button
          onClick={() => dispatch({ type: "DECREASE", payload: item.id })}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          −
        </button>
        <span className="px-3">{item.quantity}</span>
        <button
          onClick={() => dispatch({ type: "INCREASE", payload: item.id })}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
          className="ml-4 text-red-500 hover:text-red-700 text-lg"
          title="Remove Item"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
