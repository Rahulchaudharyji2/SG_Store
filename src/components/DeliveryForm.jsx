// // import React from 'react';

// // export default function DeliveryForm({ value, onChange }) {
// //   const onField = (k) => (e) => onChange({ ...value, [k]: e.target.value });

// //   return (
// //     <div className="delivery-form">
// //       <label>
// //         Full name
// //         <input value={value.name || ''} onChange={onField('name')} required />
// //       </label>

// //       <label>
// //         Phone (with country code, e.g. +91xxxxxxxxxx)
// //         <input value={value.phone || ''} onChange={onField('phone')} required />
// //       </label>

// //       <label>
// //         Email (optional, we will send confirmation here)
// //         <input value={value.email || ''} onChange={onField('email')} type="email" />
// //       </label>

// //       <label>
// //         Address line 1
// //         <input value={value.addressLine1 || ''} onChange={onField('addressLine1')} required />
// //       </label>

// //       <label>
// //         Address line 2
// //         <input value={value.addressLine2 || ''} onChange={onField('addressLine2')} />
// //       </label>

// //       <label>
// //         City
// //         <input value={value.city || ''} onChange={onField('city')} required />
// //       </label>

// //       <label>
// //         State
// //         <input value={value.state || ''} onChange={onField('state')} />
// //       </label>

// //       <label>
// //         Pincode
// //         <input value={value.pincode || ''} onChange={onField('pincode')} required />
// //       </label>

// //       <label>
// //         Country
// //         <input value={value.country || 'India'} onChange={onField('country')} />
// //       </label>
// //     </div>
// //   );
// // }
// import React from "react";

// /**
//  * Controlled Delivery form.
//  * - value: object with fields
//  * - onChange: function(nextValue)
//  */
// export default function DeliveryForm({ value = {}, onChange }) {
//   const onField = (key) => (e) => onChange({ ...value, [key]: e.target.value });

//   return (
//     <div className="space-y-3" style={{ padding:"90px"}}>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Full name *</label>
//         <input required value={value.name || ""} onChange={onField("name")} className="mt-1 block w-full border rounded px-3 py-2" />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Phone (with country code) *</label>
//         <input required value={value.phone || ""} onChange={onField("phone")} placeholder="+91xxxxxxxxxx" className="mt-1 block w-full border rounded px-3 py-2" />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Email (optional)</label>
//         <input type="email" value={value.email || ""} onChange={onField("email")} className="mt-1 block w-full border rounded px-3 py-2" />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Address line 1 *</label>
//         <input required value={value.addressLine1 || ""} onChange={onField("addressLine1")} className="mt-1 block w-full border rounded px-3 py-2" />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Address line 2</label>
//         <input value={value.addressLine2 || ""} onChange={onField("addressLine2")} className="mt-1 block w-full border rounded px-3 py-2" />
//       </div>

//       <div className="grid grid-cols-2 gap-3">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">City *</label>
//           <input required value={value.city || ""} onChange={onField("city")} className="mt-1 block w-full border rounded px-3 py-2" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Pincode *</label>
//           <input required value={value.pincode || ""} onChange={onField("pincode")} className="mt-1 block w-full border rounded px-3 py-2" />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-3">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">State</label>
//           <input value={value.state || ""} onChange={onField("state")} className="mt-1 block w-full border rounded px-3 py-2" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Country</label>
//           <input value={value.country || "India"} onChange={onField("country")} className="mt-1 block w-full border rounded px-3 py-2" />
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";

/**
 * Controlled Delivery form.
 * - value: object with fields
 * - onChange: function(nextValue)
 *
 * Tailwind-based, responsive and accessible layout.
 */
export default function DeliveryForm({ value = {}, onChange }) {
  const onField = (key) => (e) => onChange({ ...value, [key]: e.target.value });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={value.name || ""}
            onChange={onField("name")}
            placeholder="John Doe"
            className="mt-2 block w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone (with country code) <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={value.phone || ""}
            onChange={onField("phone")}
            placeholder="+91 98765 43210"
            className="mt-2 block w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Phone"
            inputMode="tel"
          />
          <p className="text-xs text-gray-400 mt-1">Include country code (e.g. +91)</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email (optional)</label>
        <input
          type="email"
          value={value.email || ""}
          onChange={onField("email")}
          placeholder="you@example.com"
          className="mt-2 block w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address line 1 <span className="text-red-500">*</span>
        </label>
        <input
          required
          value={value.addressLine1 || ""}
          onChange={onField("addressLine1")}
          placeholder="Street address, P.O. box, company name"
          className="mt-2 block w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Address line 1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address line 2</label>
        <input
          value={value.addressLine2 || ""}
          onChange={onField("addressLine2")}
          placeholder="Apartment, suite, unit, building, floor, etc."
          className="mt-2 block w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Address line 2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
          <input
            required
            value={value.city || ""}
            onChange={onField("city")}
            className="mt-2 block w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="City"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">State / Province</label>
          <input
            value={value.state || ""}
            onChange={onField("state")}
            className="mt-2 block w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="State"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Pincode / ZIP <span className="text-red-500">*</span></label>
          <input
            required
            value={value.pincode || ""}
            onChange={onField("pincode")}
            placeholder="400001"
            className="mt-2 block w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Pincode"
            inputMode="numeric"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <input
          value={value.country || "India"}
          onChange={onField("country")}
          className="mt-2 block w-full border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Country"
        />
      </div>
    </div>
  );
}