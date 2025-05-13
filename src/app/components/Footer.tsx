'use client';

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} Hospital Universitário da UFPI. Todos os direitos reservados.
      </div>
    </footer>
  );
}