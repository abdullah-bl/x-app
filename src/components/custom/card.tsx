export default function CustomCard({
  title,
  value,
}: {
  title: string
  value: string | number
}) {
  return (
    <div className="border grid gap-1 rounded-lg p-4 shadow-sm">
      <h3 className="text-base font-base">{title}</h3>
      <span className="text-lg font-medium">{value}</span>
    </div>
  )
}
