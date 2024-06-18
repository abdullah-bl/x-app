export default function Reports() {
  return (
    <div className="grid gap-4 h-full flex-1 place-items-center place-content-center">
      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 grid gap-1 shadow-md">
          <h3 className="font-medium text-2xl">اسبوعي</h3>
        </div>
        <div className="border rounded-lg p-6 grid gap-1 shadow-md">
          <h3 className="font-medium text-2xl">شهري</h3>
        </div>
        <div className="border rounded-lg p-6 grid gap-1 shadow-md">
          <h3 className="font-medium text-2xl">نصف سنوي</h3>
        </div>
        <div className="border rounded-lg p-6 grid gap-1 shadow-md">
          <h3 className="font-medium text-2xl">سنوي</h3>
        </div>
      </div>
    </div>
  )
}
