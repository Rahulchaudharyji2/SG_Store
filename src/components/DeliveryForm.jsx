// import React from 'react';

// export default function DeliveryForm({ value, onChange }) {
//   const onField = (k) => (e) => onChange({ ...value, [k]: e.target.value });

//   return (
//     <div className="delivery-form">
//       <label>
//         Full name
//         <input value={value.name || ''} onChange={onField('name')} required />
//       </label>

//       <label>
//         Phone (with country code, e.g. +91xxxxxxxxxx)
//         <input value={value.phone || ''} onChange={onField('phone')} required />
//       </label>

//       <label>
//         Email (optional, we will send confirmation here)
//         <input value={value.email || ''} onChange={onField('email')} type="email" />
//       </label>

//       <label>
//         Address line 1
//         <input value={value.addressLine1 || ''} onChange={onField('addressLine1')} required />
//       </label>

//       <label>
//         Address line 2
//         <input value={value.addressLine2 || ''} onChange={onField('addressLine2')} />
//       </label>

//       <label>
//         City
//         <input value={value.city || ''} onChange={onField('city')} required />
//       </label>

//       <label>
//         State
//         <input value={value.state || ''} onChange={onField('state')} />
//       </label>

//       <label>
//         Pincode
//         <input value={value.pincode || ''} onChange={onField('pincode')} required />
//       </label>

//       <label>
//         Country
//         <input value={value.country || 'India'} onChange={onField('country')} />
//       </label>
//     </div>
//   );
// }
import React from "react";

/**
 * Controlled Delivery form.
 * - value: object with fields
 * - onChange: function(nextValue)
 */
export default function DeliveryForm({ value = {}, onChange }) {
  const onField = (key) => (e) => onChange({ ...value, [key]: e.target.value });

  return (
    <div className="space-y-3" style={{ padding:"90px"}}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full name *</label>
        <input required value={value.name || ""} onChange={onField("name")} className="mt-1 block w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone (with country code) *</label>
        <input required value={value.phone || ""} onChange={onField("phone")} placeholder="+91xxxxxxxxxx" className="mt-1 block w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email (optional)</label>
        <input type="email" value={value.email || ""} onChange={onField("email")} className="mt-1 block w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address line 1 *</label>
        <input required value={value.addressLine1 || ""} onChange={onField("addressLine1")} className="mt-1 block w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address line 2</label>
        <input value={value.addressLine2 || ""} onChange={onField("addressLine2")} className="mt-1 block w-full border rounded px-3 py-2" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">City *</label>
          <input required value={value.city || ""} onChange={onField("city")} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode *</label>
          <input required value={value.pincode || ""} onChange={onField("pincode")} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input value={value.state || ""} onChange={onField("state")} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input value={value.country || "India"} onChange={onField("country")} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
      </div>
    </div>
  );
}