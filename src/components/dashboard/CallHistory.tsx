
export function CallHistory() {
  // Weekday abbreviations
  const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-medium">Anrufverlauf</h3>
      </div>

      <div className="flex items-end justify-between h-40 mb-4">
        {/* This would normally be generated from real data */}
        <div className="flex flex-col items-center">
          <div className="w-10 bg-gray-100 rounded-t-md" style={{ height: '70px' }}></div>
          <span className="text-xs text-gray-500 mt-2">{weekdays[0]}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 bg-gray-100 rounded-t-md" style={{ height: '50px' }}></div>
          <span className="text-xs text-gray-500 mt-2">{weekdays[1]}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 bg-gray-100 rounded-t-md" style={{ height: '90px' }}></div>
          <span className="text-xs text-gray-500 mt-2">{weekdays[2]}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 bg-gray-100 rounded-t-md" style={{ height: '60px' }}></div>
          <span className="text-xs text-gray-500 mt-2">{weekdays[3]}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 bg-gray-100 rounded-t-md" style={{ height: '40px' }}></div>
          <span className="text-xs text-gray-500 mt-2">{weekdays[4]}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 bg-gray-100 rounded-t-md" style={{ height: '20px' }}></div>
          <span className="text-xs text-gray-500 mt-2">{weekdays[5]}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 bg-gray-100 rounded-t-md" style={{ height: '30px' }}></div>
          <span className="text-xs text-gray-500 mt-2">{weekdays[6]}</span>
        </div>
      </div>
    </div>
  );
}
