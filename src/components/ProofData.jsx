import React from "react";

const ProofData = ({ data }) => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((proof, index) => (
        <div key={index} className="bg-gray-300 p-4 rounded-lg shadow-md border border-gray-400">
          <h3 className="text-xl font-semibold mb-2">{proof.title}</h3>
          <img src={proof.image} alt={proof.title} className="w-full h-40 object-cover mb-2" />
          <div className="h-24 overflow-y-auto text-gray-600">
            {proof.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProofData;
