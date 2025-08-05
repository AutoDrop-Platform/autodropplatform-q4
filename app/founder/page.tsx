'use client';

export default function FounderPage() {
  const fixCode = async () => {
    const res = await fetch('/api/guardian/fix', {
      method: 'POST',
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">🛡️ Guardian Fixer</h1>
      <button
        onClick={fixCode}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        🔧 إصلاح المشروع تلقائيًا
      </button>
    </div>
  );
}
