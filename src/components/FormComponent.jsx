import React, { useState } from "react";
import { ethers } from 'ethers';

function FormComponent({ state }) {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    description: "",
    ethRequired: 0, // Initialize ETH required with 0
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    if (!state.contract) {
      console.error("Contract not available.");
      return;
    }

    try {
      const { contract } = state;

      const tx = await contract.createCampaign(
        formData.title,
        formData.name,
        formData.description,
        ethers.utils.parseEther(formData.ethRequired)
      );

      await tx.wait();
      console.log("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating the campaign:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5  rounded p-4 ">
      <form onSubmit={handleSubmit} className="shadow-md rounded border border-gray-300 px-8 pt-6 pb-8 mb-4 bg-blue-100">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title of Research
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white border border-gray-700"
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name if Researcher
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white border border-gray-700"
            placeholder="Name of Scientist"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description of Research
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white border border-gray-700"
            placeholder="Research Information"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ethRequired">
            ETH Required
          </label>
          <input
            id="ethRequired"
            type="number"
            value={formData.ethRequired}
            onChange={handleChange}
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white border border-gray-700"
            placeholder="ETH Required"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
