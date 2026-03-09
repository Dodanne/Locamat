
export default function ServerError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">500</h1>
      <p className="text-xl mt-4">Oups… une erreur serveur est survenue.</p>
    </div>
  );
}