export default function DeleteModal({
  onClose,
  onConfirm,
  content,
}: {
  onClose: () => void;
  onConfirm: () => void;
  content?: string;
}) {
  const contentText =
    content ?? 'Êtes-vous sûr de vouloir supprimer ? Cette action est irréversible.';
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 text-center ">
        <h2 className="text-xl font-semibold mb-4">Confirmer la suppression</h2>
        <p className="mb-6">{contentText}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
