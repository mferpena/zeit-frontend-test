import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Bienvenido a la App</h1>
        <p className="text-lg text-gray-600 mb-4">
          Gestiona tus tareas y mantente organizado con nuestra plataforma.
        </p>
        <Link href="/sign-in">
          <button className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300">
            Iniciar Sesión
          </button>
        </Link>
        <p className="text-sm text-gray-500 mt-6">
          ¿No tienes cuenta? <Link href="/sign-up" className="text-blue-600 hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
