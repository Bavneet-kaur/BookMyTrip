import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type ConfirmationModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel?: string;
  colorType: "safe" | "delete";
  onConfirm: () => void;
  onCancel: () => void;
};

const colorMap = {
  safe: "bg-blue-600 hover:bg-blue-700 text-white",
  delete: "bg-red-600 hover:bg-red-700 text-white",
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  colorType,
  onConfirm,
  onCancel,
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg p-4 max-w-xs w-full flex flex-col"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <h3 className="font-bold text-xl mb-1 text-gray-800">{title}</h3>
          {description && <p className="text-gray-500 mb-4">{description}</p>}
          <div className="flex justify-center items-center flex-row gap-3 mt-2">
            <button
              className={`rounded px-4 py-2 font-semibold text-sm ${colorMap[colorType]}`}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
            <button
              className="rounded px-4 py-2 font-semibold shadow-xl text-sm bg-gray-400 hover:bg-white hover:text-black text-white"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ConfirmationModal;
