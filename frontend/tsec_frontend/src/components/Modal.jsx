import React from 'react';

const Modal = ({ isOpen, onClose, imageUrl, coordinates }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1001]">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Snipped Image</h2>
        {imageUrl && <img src={imageUrl} alt="Snipped" className="w-full h-auto mb-4" />}
        {coordinates && (
          <div className="text-gray-700">
            <h3 className="font-semibold">Coordinates:</h3>
            <p>Top-left: {coordinates.topLeft.lat.toFixed(6)}, {coordinates.topLeft.lng.toFixed(6)}</p>
            <p>Bottom-right: {coordinates.bottomRight.lat.toFixed(6)}, {coordinates.bottomRight.lng.toFixed(6)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
