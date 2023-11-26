import React, { useState } from "react";
import ProofData from "./ProofData";

const ProofPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [proofDataArray, setProofDataArray] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && title && description) {
      // Create an object representing the submitted data
      const proofData = {
        image: URL.createObjectURL(file),
        title,
        description,
      };
      // Update the state with the new data
      setProofDataArray([...proofDataArray, proofData]);
      // Reset the form
      setFile(null);
      setTitle("");
      setDescription("");
      // Close the form
      closeForm();
    }
  };

  return (
    <div className="p-4 bg-gray-200">
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded block mx-auto mb-4"
        onClick={openForm}
      >
        Upload Proof
      </button>
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Description"
              className="border p-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            onClick={closeForm}
          >
            Close
          </button>
        </form>
      )}
      <ProofData data={proofDataArray} />
    </div>
  );
};

export default ProofPage;
